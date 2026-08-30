import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/database/connection";
import Appointment, {
  AppointmentStatus,
} from "@/database/models/Appointment";
import User from "@/database/models/User";

const ALLOWED_STATUSES: AppointmentStatus[] = [
  "scheduled",
  "confirmed",
  "completed",
  "cancelled",
  "no_show",
];

function isValidDate(value: unknown): value is string {
  if (typeof value !== "string" || !value.trim()) {
    return false;
  }

  return !Number.isNaN(new Date(value).getTime());
}

function isValidObjectId(value: unknown): boolean {
  return (
    typeof value === "string" && mongoose.Types.ObjectId.isValid(value)
  );
}

async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  await connectDB();

  return User.findOne({
    email: session.user.email,
  });
}

/**
 * GET /api/appointments
 *
 * Doctor:
 *   - puede consultar todas las citas
 *
 * Nurse:
 *   - puede consultar todas las citas
 *
 * Client:
 *   - solo consulta sus propias citas
 */
export async function GET(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);

    const status = searchParams.get("status");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const query: Record<string, unknown> = {};

    if (currentUser.role === "client") {
      query.clientId = currentUser._id;
    }

    if (
      status &&
      ALLOWED_STATUSES.includes(status as AppointmentStatus)
    ) {
      query.status = status;
    }

    if (from || to) {
      query.start = {};

      if (from && isValidDate(from)) {
        (query.start as Record<string, Date>).$gte = new Date(from);
      }

      if (to && isValidDate(to)) {
        (query.start as Record<string, Date>).$lte = new Date(to);
      }
    }

    const appointments = await Appointment.find(query)
      .populate("clientId", "firstName lastName email")
      .populate("veterinarianId", "firstName lastName email role")
      .sort({ start: 1 })
      .lean();

    return NextResponse.json(
      {
        data: appointments,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/appointments:", error);

    return NextResponse.json(
      {
        error: "Unable to retrieve appointments",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/appointments
 *
 * Solo doctors pueden crear citas desde este módulo.
 */
export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    if (currentUser.role !== "doctor") {
      return NextResponse.json(
        {
          error: "You do not have permission to create appointments",
        },
        { status: 403 }
      );
    }

    const body = await req.json();

    const {
      title,
      patientName,
      clientId,
      veterinarianId,
      reason,
      notes = "",
      start,
      end,
      allDay = false,
      status = "scheduled",
    } = body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof patientName !== "string" ||
      !patientName.trim() ||
      typeof reason !== "string" ||
      !reason.trim()
    ) {
      return NextResponse.json(
        {
          error:
            "Title, patient name and appointment reason are required",
        },
        { status: 400 }
      );
    }

    if (!isValidObjectId(clientId)) {
      return NextResponse.json(
        { error: "Invalid client id" },
        { status: 400 }
      );
    }

    if (!isValidObjectId(veterinarianId)) {
      return NextResponse.json(
        { error: "Invalid veterinarian id" },
        { status: 400 }
      );
    }

    if (!isValidDate(start) || !isValidDate(end)) {
      return NextResponse.json(
        { error: "Invalid appointment dates" },
        { status: 400 }
      );
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (endDate <= startDate) {
      return NextResponse.json(
        {
          error: "Appointment end time must be after start time",
        },
        { status: 400 }
      );
    }

    if (!ALLOWED_STATUSES.includes(status as AppointmentStatus)) {
      return NextResponse.json(
        { error: "Invalid appointment status" },
        { status: 400 }
      );
    }

    const [client, veterinarian] = await Promise.all([
      User.findOne({
        _id: clientId,
        role: "client",
      }),
      User.findOne({
        _id: veterinarianId,
        role: "doctor",
      }),
    ]);

    if (!client) {
      return NextResponse.json(
        { error: "The selected client does not exist" },
        { status: 404 }
      );
    }

    if (!veterinarian) {
      return NextResponse.json(
        {
          error: "The selected veterinarian does not exist",
        },
        { status: 404 }
      );
    }

    /**
     * Detect overlapping appointments for the same veterinarian.
     *
     * Overlap condition:
     * existing.start < new.end
     * AND
     * existing.end > new.start
     *
     * Cancelled appointments are ignored.
     */
    const overlappingAppointment = await Appointment.findOne({
      veterinarianId,
      status: { $ne: "cancelled" },
      start: { $lt: endDate },
      end: { $gt: startDate },
    });

    if (overlappingAppointment) {
      return NextResponse.json(
        {
          error:
            "The selected veterinarian already has another appointment during this period",
        },
        { status: 409 }
      );
    }

    const appointment = await Appointment.create({
      title: title.trim(),
      patientName: patientName.trim(),
      clientId,
      veterinarianId,
      reason: reason.trim(),
      notes:
        typeof notes === "string" ? notes.trim() : "",
      start: startDate,
      end: endDate,
      allDay: Boolean(allDay),
      status,
    });

    const populatedAppointment = await Appointment.findById(
      appointment._id
    )
      .populate("clientId", "firstName lastName email")
      .populate("veterinarianId", "firstName lastName email role")
      .lean();

    return NextResponse.json(
      {
        message: "Appointment created successfully",
        data: populatedAppointment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/appointments:", error);

    return NextResponse.json(
      {
        error: "Unable to create appointment",
      },
      { status: 500 }
    );
  }
}

