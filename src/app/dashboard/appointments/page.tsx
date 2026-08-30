import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/database/connection";
import Appointment from "@/database/models/Appointment";
import User from "@/database/models/User";
import Calendar from "@/components/Calendar";

export const dynamic = "force-dynamic";

const AppointmentsPage = async () => {
  const session =
    await getServerSession(authOptions);

  if (!session?.user?.email) {
    return (
      <div className="p-8">
        <div className="rounded-xl border bg-white p-6">
          No estás autenticado.
        </div>
      </div>
    );
  }

  await connectDB();

  const currentUser = await User.findOne({
    email: session.user.email,
  }).lean();

  if (!currentUser) {
    return (
      <div className="p-8">
        <div className="rounded-xl border bg-white p-6">
          No se encontró el usuario actual.
        </div>
      </div>
    );
  }

  const appointmentQuery =
    currentUser.role === "client"
      ? { clientId: currentUser._id }
      : {};

  const [
    appointments,
    clients,
    veterinarians,
  ] = await Promise.all([
    Appointment.find(appointmentQuery)
      .populate(
        "clientId",
        "firstName lastName email"
      )
      .populate(
        "veterinarianId",
        "firstName lastName email role"
      )
      .sort({ start: 1 })
      .lean(),

    currentUser.role === "doctor"
      ? User.find({
          role: "client",
        })
          .select(
            "_id firstName lastName email"
          )
          .sort({
            firstName: 1,
            lastName: 1,
          })
          .lean()
      : [],

    User.find({
      role: "doctor",
    })
      .select(
        "_id firstName lastName email"
      )
      .sort({
        firstName: 1,
        lastName: 1,
      })
      .lean(),
  ]);

  const serializedAppointments =
    appointments.map((appointment) => ({
      _id: appointment._id.toString(),
      title: appointment.title,
      patientName:
        appointment.patientName,
      reason: appointment.reason,
      notes: appointment.notes,
      start: appointment.start.toISOString(),
      end: appointment.end.toISOString(),
      allDay: appointment.allDay,
      status: appointment.status,

      clientId: {
        _id: appointment.clientId._id.toString(),
        firstName:
          appointment.clientId.firstName,
        lastName:
          appointment.clientId.lastName,
        email: appointment.clientId.email,
      },

      veterinarianId: {
        _id:
          appointment.veterinarianId._id.toString(),
        firstName:
          appointment.veterinarianId.firstName,
        lastName:
          appointment.veterinarianId.lastName,
        email:
          appointment.veterinarianId.email,
        role: appointment.veterinarianId.role,
      },
    }));

  return (
    <div className="w-full px-4 py-6 md:px-6">
      <Calendar
        appointments={
          serializedAppointments
        }
        clients={clients.map((client) => ({
          _id: client._id.toString(),
          firstName:
            client.firstName,
          lastName:
            client.lastName,
          email: client.email,
        }))}
        veterinarians={veterinarians.map(
          (doctor) => ({
            _id: doctor._id.toString(),
            firstName:
              doctor.firstName,
            lastName:
              doctor.lastName,
            email: doctor.email,
          })
        )}
        canManage={
          currentUser.role === "doctor"
        }
      />
    </div>
  );
};

export default AppointmentsPage;

