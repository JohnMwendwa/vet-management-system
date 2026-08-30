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

async function getDoctor() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  await connectDB();

  const user = await User.findOne({
    email: session.user.email,
  });

  if (!user || user.role !== "doctor") {
    return null;
  }

  return user;
}

/**
 * PATCH /api/appointments/:id
 */
export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  try {
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: "Invalid appointment id" },
        { status: 400 }
      );
    }

    const currentUser = await getDoctor();

    if (!currentUser) {
      return NextResponse.json(
        {
          error:
            "Only authorized doctors can modify appointments",
        },
        { status: 403 }
      );
    }

    const appointment = await Appointment.findById(params.id);

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    const body = await req.json();

    const {
      title,
      patientName,
      clientId,
      veterinarianId,
      reason,
      notes,
      start,
      end,
      allDay,
      status,
    } = body;

    if (
      title !== undefined &&
      (typeof title !== "string" || !title.trim())
    ) {
      return NextResponse.json(
        { error: "Invalid title" },
        { status: 400 }
      );
    }

    if (
      patientName !== undefined &&
      (typeof patientName !== "string" ||
        !patientName.trim())
    ) {
      return NextResponse.json(
        { error: "Invalid patient name" },
        { status: 400 }
      );
    }

    const nextStart =
      start !== undefined
        ? new Date(start)
        : new Date(appointment.start);

    const nextEnd =
      end !== undefined
        ? new Date(end)
        : new Date(appointment.end);

    if (
      Number.isNaN(nextStart.getTime()) ||
      Number.isNaN(nextEnd.getTime())
    ) {
      return NextResponse.json(
        { error: "Invalid appointment dates" },
        { status: 400 }
      );
    }

    if (nextEnd <= nextStart) {
      return NextResponse.json(
        {
          error:
            "Appointment end time must be after start time",
        },
        { status: 400 }
      );
    }

    const nextVeterinarianId =
      veterinarianId !== undefined
        ? veterinarianId
        : appointment.veterinarianId.toString();

    if (
      !mongoose.Types.ObjectId.isValid(
        nextVeterinarianId
      )
    ) {
      return NextResponse.json(
        { error: "Invalid veterinarian id" },
        { status: 400 }
      );
    }

    const veterinarian = await User.findOne({
      _id: nextVeterinarianId,
      role: "doctor",
    });

    if (!veterinarian) {
      return NextResponse.json(
        {
          error: "Veterinarian not found",
        },
        { status: 404 }
      );
    }

    if (
      clientId !== undefined &&
      !mongoose.Types.ObjectId.isValid(clientId)
    ) {
      return NextResponse.json(
        { error: "Invalid client id" },
        { status: 400 }
      );
    }

    if (clientId !== undefined) {
      const client = await User.findOne({
        _id: clientId,
        role: "client",
      });

      if (!client) {
        return NextResponse.json(
          { error: "Client not found" },
          { status: 404 }
        );
      }
    }

    if (
      status !== undefined &&
      !ALLOWED_STATUSES.includes(
        status as AppointmentStatus
      )
    ) {
      return NextResponse.json(
        { error: "Invalid appointment status" },
        { status: 400 }
      );
    }

    /**
     * Do not check collision for cancelled appointments.
     */
    const nextStatus =
      status !== undefined
        ? status
        : appointment.status;

    if (nextStatus !== "cancelled") {
      const overlappingAppointment =
        await Appointment.findOne({
          _id: { $ne: appointment._id },
          veterinarianId: nextVeterinarianId,
          status: { $ne: "cancelled" },
          start: { $lt: nextEnd },
          end: { $gt: nextStart },
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
    }

    if (title !== undefined) {
      appointment.title = title.trim();
    }

    if (patientName !== undefined) {
      appointment.patientName = patientName.trim();
    }

    if (clientId !== undefined) {
      appointment.clientId =
        clientId as mongoose.Types.ObjectId;
    }

    if (veterinarianId !== undefined) {
      appointment.veterinarianId =
        veterinarianId as mongoose.Types.ObjectId;
    }

    if (reason !== undefined) {
      if (
        typeof reason !== "string" ||
        !reason.trim()
      ) {
        return NextResponse.json(
          { error: "Invalid reason" },
          { status: 400 }
        );
      }

      appointment.reason = reason.trim();
    }

    if (notes !== undefined) {
      appointment.notes =
        typeof notes === "string"
          ? notes.trim()
          : "";
    }

    if (start !== undefined) {
      appointment.start = nextStart;
    }

    if (end !== undefined) {
      appointment.end = nextEnd;
    }

    if (allDay !== undefined) {
      appointment.allDay = Boolean(allDay);
    }

    if (status !== undefined) {
      appointment.status =
        status as AppointmentStatus;
    }

    await appointment.save();

    const updatedAppointment =
      await Appointment.findById(appointment._id)
        .populate(
          "clientId",
          "firstName lastName email"
        )
        .populate(
          "veterinarianId",
          "firstName lastName email role"
        )
        .lean();

    return NextResponse.json(
      {
        message: "Appointment updated successfully",
        data: updatedAppointment,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "PATCH /api/appointments/:id:",
      error
    );

    return NextResponse.json(
      {
        error: "Unable to update appointment",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/appointments/:id
 */
export async function DELETE(
  _req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  try {
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: "Invalid appointment id" },
        { status: 400 }
      );
    }

    const currentUser = await getDoctor();

    if (!currentUser) {
      return NextResponse.json(
        {
          error:
            "Only authorized doctors can delete appointments",
        },
        { status: 403 }
      );
    }

    const appointment = await Appointment.findById(
      params.id
    );

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    await appointment.deleteOne();

    return NextResponse.json(
      {
        message: "Appointment deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "DELETE /api/appointments/:id:",
      error
    );

    return NextResponse.json(
      {
        error: "Unable to delete appointment",
      },
      { status: 500 }
    );
  }
}

