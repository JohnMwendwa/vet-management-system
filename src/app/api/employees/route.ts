import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/database/models/User";
import { hashPassword } from "@/database/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // check if user session exists
    if (!session) {
      return NextResponse.json(
        {
          error: "Not Allowed to Access this resource",
        },
        {
          status: 401,
        }
      );
    }

    const user = await User.findOne({ email: session.user?.email });
    //   check if uses who has active session exists
    if (!user || user.role !== "doctor") {
      return NextResponse.json(
        {
          error: "Something went wrong",
        },
        {
          status: 401,
        }
      );
    }

    const { firstName, lastName, email, password, role } = await req.json();

    // Validate user details before proceeding
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !email.includes("@") ||
      !role.trim()
    ) {
      return NextResponse.json(
        {
          error: "Please provide valid details",
        },
        {
          status: 400,
        }
      );
    }

    // check if password has 7 or more characters
    if (password.trim() === "" || password.trim().length < 7) {
      return NextResponse.json(
        {
          error: "password should not have less than 7 characters",
        },
        {
          status: 400,
        }
      );
    }

    // hash user password
    const hashedPassword = await hashPassword(password);
    const newEmployee = await User.create({
      firstName,
      lastName,
      email,
      role,
      password: hashedPassword,
    });

    await newEmployee.save();

    return NextResponse.json(
      {
        message: "New employee added successfully",
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    return NextResponse.json(
      {
        error: (e as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}
