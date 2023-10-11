"use client";

import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventSourceInput } from "@fullcalendar/core/index.js";

import { AppointmentProps } from "@/database/models/Appointment";

interface CalendarProps {
  events: AppointmentProps[];
}

const Calendar = ({ events }: CalendarProps) => {
  return (
    <div className="grid gap-8 place-content-center place-items-center w-full h-full">
      <div className="relative p-8 overflow-y-auto">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          nowIndicator={true}
          editable={true}
          selectable={true}
          selectMirror={true}
          weekends={true}
          dayMaxEvents={true}
          events={events as EventSourceInput}
          aspectRatio={1.8}
        />
      </div>
    </div>
  );
};

export default Calendar;
