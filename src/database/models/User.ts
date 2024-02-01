import mongoose, { Schema, model, models, Model, Types } from "mongoose";
import { compare } from "bcrypt";

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

interface UserModel extends Model<UserProps> {
  findByCredentials(email: string, password: string): UserProps;
}

const userSchema = new Schema<UserProps, UserModel>(
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
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["doctor", "client", "nurse"],
      default: "client",
    },
  },
  { timestamps: true }
);

// Hide private and sensitive data
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  const { password, ...rest } = userObject;

  return rest;
};

// Create a custom functin for verifying user credentials
userSchema.statics.findByCredentials = async function (email, pass) {
  const user = await this.findOne({ email });

  // If user doesn't exist, throw an error
  if (!user) {
    throw new Error("Invalid Credentials!");
  }

  // compare the password with the one in the DB
  const isMatch = await compare(pass, user.password);

  // If passwords don't match, throw an error
  if (!isMatch) {
    throw new Error("Invalid Credentials!");
  }

  const { password, ...userInfo } = user.toObject();

  return userInfo;
};

userSchema.post("save", { errorHandler: true }, function (error, doc, next) {
  if (error.name === "MongoServerError" && (error as any).code === 11000) {
    next(new Error("Email already exists!"));
  } else {
    next();
  }
});

userSchema.post(
  "updateOne",
  { errorHandler: true },
  function (error, doc, next) {
    if (error.name === "MongoServerError" && (error as any).code === 11000) {
      next(new Error("Email already exists!"));
    } else {
      next();
    }
  }
);

const User =
  (models.User as unknown as UserModel) ||
  model<UserProps, UserModel>("User", userSchema);

export default User;
