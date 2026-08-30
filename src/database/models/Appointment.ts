import {
  Schema,
  Model,
  Types,
  model,
  models,
  HydratedDocument,
} from "mongoose";

export type AppointmentStatus =
  | "scheduled"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "no_show";

export interface AppointmentProps {
  _id: Types.ObjectId;
  title: string;
  patientName: string;
  clientId: Types.ObjectId;
  veterinarianId: Types.ObjectId;
  reason: string;
  notes: string;
  start: Date;
  end: Date;
  allDay: boolean;
  status: AppointmentStatus;
  createdAt: Date;
  updatedAt: Date;
}

const appointmentSchema = new Schema<AppointmentProps>(
  {
    title: {
      type: String,
      required: [true, "Appointment title is required"],
      trim: true,
      maxlength: 120,
    },

    patientName: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
      maxlength: 100,
    },

    clientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Client is required"],
      index: true,
    },

    veterinarianId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Veterinarian is required"],
      index: true,
    },

    reason: {
      type: String,
      required: [true, "Appointment reason is required"],
      trim: true,
      maxlength: 300,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
      maxlength: 2000,
    },

    start: {
      type: Date,
      required: [true, "Start date is required"],
      index: true,
    },

    end: {
      type: Date,
      required: [true, "End date is required"],
    },

    allDay: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: [
        "scheduled",
        "confirmed",
        "completed",
        "cancelled",
        "no_show",
      ],
      default: "scheduled",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

appointmentSchema.index({
  veterinarianId: 1,
  start: 1,
  end: 1,
});

appointmentSchema.index({
  clientId: 1,
  start: -1,
});

const Appointment =
  (models.Appointment as Model<AppointmentProps>) ||
  model<AppointmentProps>("Appointment", appointmentSchema);

export default Appointment;

