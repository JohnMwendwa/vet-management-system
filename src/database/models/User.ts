import { Schema, model, models, Model, Types } from "mongoose";

export interface UserProps {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
}

const userSchema = new Schema<UserProps>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["doctor", "client"],
    },
  },
  { timestamps: true }
);

const User =
  (models.User as Model<UserProps>) || model<UserProps>("User", userSchema);

export default User;
