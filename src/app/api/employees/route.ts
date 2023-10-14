import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/database/models/User";
import { hashPassword } from "@/database/auth";

// Add new employee in the database
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

// Change employee details in the database
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
    //   check if user who has active session exists
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

    const { firstName, lastName, email, id, role } = await req.json();

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
    const employee = await User.findById(id);

    // check if employee whose details are being updated exists
    if (!employee) {
      return NextResponse.json(
        {
          error: "Something went wrong",
        },
        {
          status: 401,
        }
      );
    }

    // update employee details in the database
    employee.firstName = firstName;
    employee.lastName = lastName;
    employee.email = email;
    employee.role = role;
    await employee.save();

    return NextResponse.json(
      {
        message: "Employee details updated successfully",
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

// Delete employee from database
export async function DELETE(req: NextRequest) {
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

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        {
          error: "Provide a valid employee id",
        },
        {
          status: 401,
        }
      );
    }

    await User.findByIdAndDelete(id);

    return NextResponse.json(
      {
        message: "Employee deleted successfully",
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
