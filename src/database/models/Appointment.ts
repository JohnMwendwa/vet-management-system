import { Schema, Model, Types, model, models } from "mongoose";

interface AppointmentProps {
  _id: Types.ObjectId;
  title: string;
  start: Date | null;
  end: Date | null;
  allDay: boolean;
}

const appointmentSchema = new Schema<AppointmentProps>({
  title: {
    type: String,
    required: [true, "Please add appointment title"],
  },
  start: {
    type: Date,
    required: [true, "Add a valid date"],
  },
  end: {
    type: Date,
    default: null,
  },
  allDay: {
    type: Boolean,
    default: false,
  },
});

const Appointment =
  (models.Appointment as Model<AppointmentProps>) ||
  model<AppointmentProps>("Appointment", appointmentSchema);

export default Appointment;
