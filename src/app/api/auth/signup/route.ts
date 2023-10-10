import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/database/connection";
import User from "@/database/models/User";
import { hashPassword } from "@/database/auth";

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, password, confirmPassword } =
    await req.json();

  if (!email.trim() || !email.includes("@")) {
    return NextResponse.json(
      {
        error: "Invalid Email!",
      },
      { status: 400 }
    );
  }

  if (password !== confirmPassword) {
    return NextResponse.json(
      {
        error: "Passwords don't match!",
      },
      { status: 400 }
    );
  }

  if (!password || password.trim().length < 7) {
    return NextResponse.json(
      {
        error: "Password should not be less than 7 characters",
      },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "Account created successfully",
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        error: (err as Error).message,
      },
      { status: 500 }
    );
  }
}
