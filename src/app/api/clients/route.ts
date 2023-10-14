import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/database/models/User";

export async function PATCH(req: NextRequest) {
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
          error: "Not Allowed to Access this resource",
        },
        {
          status: 401,
        }
      );
    }

    const { firstName, lastName, email, id } = await req.json();

    // Validate user details before proceeding
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !email.includes("@")
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
    const client = await User.findById(id);

    // check if client whose details are being updated exists
    if (!client) {
      return NextResponse.json(
        {
          error: "Something went wrong",
        },
        {
          status: 401,
        }
      );
    }

    // update user details in the database
    client.firstName = firstName;
    client.lastName = lastName;
    client.email = email;
    await client.save();

    return NextResponse.json(
      {
        message: "Client detais updated successfully",
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    return NextResponse.json({
      error: (e as Error).message,
    });
  }
}
