"use client";

import {
  FormEvent,
  useMemo,
  useState,
} from "react";

import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
  EventClickArg,
  DateSelectArg,
  EventDropArg,
  EventInput,
} from "@fullcalendar/core";

import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Input,
  Select,
  Option,
  Textarea,
} from "@/components/Material";

import { toast } from "react-toastify";

export interface AppointmentView {
  _id: string;
  title: string;
  patientName: string;
  reason: string;
  notes: string;
  start: string;
  end: string;
  allDay: boolean;
  status:
    | "scheduled"
    | "confirmed"
    | "completed"
    | "cancelled"
    | "no_show";

  clientId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };

  veterinarianId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}

interface CalendarProps {
  appointments: AppointmentView[];
  clients: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  }[];
  veterinarians: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  }[];
  canManage: boolean;
}

interface AppointmentForm {
  id?: string;
  title: string;
  patientName: string;
  clientId: string;
  veterinarianId: string;
  reason: string;
  notes: string;
  start: string;
  end: string;
  status:
    | "scheduled"
    | "confirmed"
    | "completed"
    | "cancelled"
    | "no_show";
}

const EMPTY_FORM: AppointmentForm = {
  title: "",
  patientName: "",
  clientId: "",
  veterinarianId: "",
  reason: "",
  notes: "",
  start: "",
  end: "",
  status: "scheduled",
};

function formatDateForInput(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(
    2,
    "0"
  );
  const day = `${date.getDate()}`.padStart(2, "0");
  const hours = `${date.getHours()}`.padStart(
    2,
    "0"
  );
  const minutes = `${date.getMinutes()}`.padStart(
    2,
    "0"
  );

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const STATUS_LABELS: Record<
  AppointmentForm["status"],
  string
> = {
  scheduled: "Programada",
  confirmed: "Confirmada",
  completed: "Completada",
  cancelled: "Cancelada",
  no_show: "No asistió",
};

const Calendar = ({
  appointments,
  clients,
  veterinarians,
  canManage,
}: CalendarProps) => {
  const [form, setForm] =
    useState<AppointmentForm>(EMPTY_FORM);

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentView | null>(null);

  const events = useMemo<EventInput[]>(() => {
    return appointments.map((appointment) => ({
      id: appointment._id,
      title: `${appointment.patientName} · ${appointment.title}`,
      start: appointment.start,
      end: appointment.end,
      allDay: appointment.allDay,
      extendedProps: {
        status: appointment.status,
        patientName: appointment.patientName,
        reason: appointment.reason,
      },
    }));
  }, [appointments]);

  const upcomingAppointments = useMemo(() => {
    return [...appointments]
      .filter(
        (appointment) =>
          appointment.status !== "cancelled"
      )
      .sort(
        (a, b) =>
          new Date(a.start).getTime() -
          new Date(b.start).getTime()
      )
      .slice(0, 6);
  }, [appointments]);

  const openCreateForm = (
    startDate?: Date,
    endDate?: Date
  ) => {
    setSelectedAppointment(null);

    const defaultStart =
      startDate || new Date();

    const defaultEnd =
      endDate ||
      new Date(
        defaultStart.getTime() + 30 * 60 * 1000
      );

    setForm({
      ...EMPTY_FORM,
      start: formatDateForInput(defaultStart),
      end: formatDateForInput(defaultEnd),
      veterinarianId:
        veterinarians.length === 1
          ? veterinarians[0]._id
          : "",
      clientId:
        clients.length === 1
          ? clients[0]._id
          : "",
    });

    setShowForm(true);
  };

  const openEditForm = (
    appointment: AppointmentView
  ) => {
    setSelectedAppointment(appointment);

    setForm({
      id: appointment._id,
      title: appointment.title,
      patientName: appointment.patientName,
      clientId: appointment.clientId._id,
      veterinarianId:
        appointment.veterinarianId._id,
      reason: appointment.reason,
      notes: appointment.notes || "",
      start: formatDateForInput(
        new Date(appointment.start)
      ),
      end: formatDateForInput(
        new Date(appointment.end)
      ),
      status: appointment.status,
    });

    setShowForm(true);
  };

  const handleSelect = (selection: DateSelectArg) => {
    if (!canManage) {
      return;
    }

    openCreateForm(
      selection.start,
      selection.end
    );
  };

  const handleEventClick = (
    info: EventClickArg
  ) => {
    const appointment = appointments.find(
      (item) => item._id === info.event.id
    );

    if (!appointment) {
      return;
    }

    openEditForm(appointment);
  };

  const handleEventDrop = async (
    info: EventDropArg
  ) => {
    if (!canManage) {
      info.revert();
      return;
    }

    const start = info.event.start;

    const end =
      info.event.end ||
      new Date(
        (start?.getTime() || Date.now()) +
          30 * 60 * 1000
      );

    try {
      const response = await fetch(
        `/api/appointments/${info.event.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            start:
              start?.toISOString(),
            end: end.toISOString(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        info.revert();
        toast.error(
          data.error ||
            "No se pudo mover la cita"
        );
        return;
      }

      toast.success(
        "Cita actualizada correctamente"
      );
    } catch (error) {
      console.error(error);
      info.revert();

      toast.error(
        "No se pudo actualizar la cita"
      );
    }
  };

  const handleSubmit = async (
    event: FormEvent
  ) => {
    event.preventDefault();

    if (!canManage) {
      toast.error(
        "No tienes permisos para administrar citas"
      );
      return;
    }

    if (
      !form.title.trim() ||
      !form.patientName.trim() ||
      !form.clientId ||
      !form.veterinarianId ||
      !form.reason.trim() ||
      !form.start ||
      !form.end
    ) {
      toast.error(
        "Completa todos los campos obligatorios"
      );
      return;
    }

    setLoading(true);

    try {
      const url = form.id
        ? `/api/appointments/${form.id}`
        : "/api/appointments";

      const method = form.id
        ? "PATCH"
        : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title,
          patientName: form.patientName,
          clientId: form.clientId,
          veterinarianId:
            form.veterinarianId,
          reason: form.reason,
          notes: form.notes,
          start: new Date(
            form.start
          ).toISOString(),
          end: new Date(
            form.end
          ).toISOString(),
          status: form.status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(
          data.error ||
            "No se pudo guardar la cita"
        );
        return;
      }

      toast.success(
        form.id
          ? "Cita actualizada correctamente"
          : "Cita creada correctamente"
      );

      setShowForm(false);
      setForm(EMPTY_FORM);

      window.location.reload();
    } catch (error) {
      console.error(error);

      toast.error(
        "Ocurrió un error al guardar la cita"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!form.id || !canManage) {
      return;
    }

    const confirmed = window.confirm(
      "¿Seguro que deseas eliminar esta cita?"
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `/api/appointments/${form.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(
          data.error ||
            "No se pudo eliminar la cita"
        );
        return;
      }

      toast.success(
        "Cita eliminada correctamente"
      );

      setShowForm(false);
      setSelectedAppointment(null);
      setForm(EMPTY_FORM);

      window.location.reload();
    } catch (error) {
      console.error(error);

      toast.error(
        "No se pudo eliminar la cita"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <Card className="w-full">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none p-6"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Typography
                variant="h4"
                color="blue-gray"
              >
                Agenda veterinaria
              </Typography>

              <Typography
                color="gray"
                className="mt-1 font-normal"
              >
                Gestiona las citas de la clínica desde
                una única agenda.
              </Typography>
            </div>

            {canManage && (
              <Button
                color="blue"
                onClick={() =>
                  openCreateForm()
                }
              >
                Nueva cita
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_350px]">
        <Card className="w-full">
          <CardBody className="overflow-x-auto p-4 md:p-6">
            <div className="min-w-[760px]">
              <FullCalendar
                plugins={[
                  dayGridPlugin,
                  timeGridPlugin,
                  interactionPlugin,
                ]}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right:
                    "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                initialView="dayGridMonth"
                selectable={canManage}
                selectMirror={true}
                editable={canManage}
                eventResizableFromStart={canManage}
                nowIndicator={true}
                weekends={true}
                dayMaxEvents={true}
                events={events}
                select={handleSelect}
                eventClick={handleEventClick}
                eventDrop={handleEventDrop}
                height="auto"
                aspectRatio={1.55}
                locale="es"
                buttonText={{
                  today: "Hoy",
                  month: "Mes",
                  week: "Semana",
                  day: "Día",
                }}
              />
            </div>
          </CardBody>
        </Card>

        <Card className="w-full">
          <CardHeader
            floated={false}
            shadow={false}
            className="rounded-none p-6"
          >
            <Typography
              variant="h6"
              color="blue-gray"
            >
              Próximas citas
            </Typography>

            <Typography
              color="gray"
              className="mt-1 text-sm"
            >
              Vista rápida de la agenda.
            </Typography>
          </CardHeader>

          <CardBody className="space-y-3 pt-0">
            {upcomingAppointments.length === 0 ? (
              <div className="rounded-lg border border-dashed p-6 text-center">
                <Typography color="gray">
                  No hay citas próximas.
                </Typography>
              </div>
            ) : (
              upcomingAppointments.map(
                (appointment) => (
                  <button
                    key={appointment._id}
                    type="button"
                    className="w-full rounded-xl border p-4 text-left transition hover:bg-blue-gray-50"
                    onClick={() =>
                      openEditForm(
                        appointment
                      )
                    }
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {appointment.patientName}
                        </Typography>

                        <Typography
                          variant="small"
                          color="gray"
                        >
                          {appointment.title}
                        </Typography>
                      </div>

                      <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">
                        {
                          STATUS_LABELS[
                            appointment.status
                          ]
                        }
                      </span>
                    </div>

                    <div className="mt-3 space-y-1 text-sm text-blue-gray-700">
                      <p>
                        {new Date(
                          appointment.start
                        ).toLocaleString(
                          "es-PE",
                          {
                            dateStyle:
                              "medium",
                            timeStyle:
                              "short",
                          }
                        )}
                      </p>

                      <p>
                        Dr.{" "}
                        {
                          appointment
                            .veterinarianId
                            .firstName
                        }{" "}
                        {
                          appointment
                            .veterinarianId
                            .lastName
                        }
                      </p>
                    </div>
                  </button>
                )
              )
            )}
          </CardBody>
        </Card>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="border-b p-6">
              <Typography
                variant="h5"
                color="blue-gray"
              >
                {form.id
                  ? "Editar cita"
                  : "Nueva cita"}
              </Typography>

              <Typography
                color="gray"
                className="mt-1"
              >
                Registra la información principal de la
                atención.
              </Typography>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Input
                  crossOrigin=""
                  label="Título de la cita"
                  required
                  value={form.title}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      title:
                        event.target
                          .value,
                    }))
                  }
                />

                <Input
                  crossOrigin=""
                  label="Paciente / mascota"
                  required
                  value={form.patientName}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      patientName:
                        event.target
                          .value,
                    }))
                  }
                />

                <Select
                  label="Cliente"
                  value={form.clientId}
                  onChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      clientId:
                        value || "",
                    }))
                  }
                >
                  {clients.map((client) => (
                    <Option
                      key={client._id}
                      value={client._id}
                    >
                      {client.firstName}{" "}
                      {client.lastName}
                    </Option>
                  ))}
                </Select>

                <Select
                  label="Veterinario"
                  value={
                    form.veterinarianId
                  }
                  onChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      veterinarianId:
                        value || "",
                    }))
                  }
                >
                  {veterinarians.map(
                    (doctor) => (
                      <Option
                        key={doctor._id}
                        value={
                          doctor._id
                        }
                      >
                        Dr.{" "}
                        {doctor.firstName}{" "}
                        {doctor.lastName}
                      </Option>
                    )
                  )}
                </Select>

                <Input
                  crossOrigin=""
                  type="datetime-local"
                  label="Inicio"
                  required
                  value={form.start}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      start:
                        event.target
                          .value,
                    }))
                  }
                />

                <Input
                  crossOrigin=""
                  type="datetime-local"
                  label="Fin"
                  required
                  value={form.end}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      end:
                        event.target
                          .value,
                    }))
                  }
                />

                <Select
                  label="Estado"
                  value={form.status}
                  onChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      status:
                        (value ||
                          "scheduled") as AppointmentForm["status"],
                    }))
                  }
                >
                  {Object.entries(
                    STATUS_LABELS
                  ).map(
                    ([
                      status,
                      label,
                    ]) => (
                      <Option
                        key={status}
                        value={
                          status
                        }
                      >
                        {label}
                      </Option>
                    )
                  )}
                </Select>

                <Input
                  crossOrigin=""
                  label="Motivo de consulta"
                  required
                  value={form.reason}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      reason:
                        event.target
                          .value,
                    }))
                  }
                />
              </div>

              <Textarea
                label="Notas"
                value={form.notes}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    notes:
                      event.target.value,
                  }))
                }
              />

              <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  {form.id && (
                    <Button
                      type="button"
                      color="red"
                      variant="text"
                      onClick={
                        handleDelete
                      }
                      disabled={
                        loading
                      }
                    >
                      Eliminar cita
                    </Button>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    color="blue-gray"
                    variant="text"
                    onClick={() => {
                      setShowForm(false);
                      setSelectedAppointment(
                        null
                      );
                    }}
                    disabled={loading}
                  >
                    Cancelar
                  </Button>

                  <Button
                    type="submit"
                    color="blue"
                    disabled={loading}
                  >
                    {loading
                      ? "Guardando..."
                      : form.id
                      ? "Guardar cambios"
                      : "Crear cita"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
