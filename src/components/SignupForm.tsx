"use client";

import { FormEvent, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { toast } from "react-toastify";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import Link from "next/link";

async function createUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong!");
  }
  return data;
}

const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const query = params?.get("callbackUrl");
  const { data: session } = useSession();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // handle signup logic
    setLoading(true);

    if (firstName.trim().length < 2 || lastName.trim().length < 2) {
      setLoading(false);
      toast.error("A name should have more than two characters", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    if (password !== confirmPassword) {
      setLoading(false);
      toast.error("Passwords don't match!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    try {
      await createUser(firstName, lastName, email, password, confirmPassword);

      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/dashboard",
      });
    } catch (e) {
      setLoading(false);
      toast.error((e as Error).message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  if (session) {
    router.replace(query ? query.toString() : "/dashboard");
    return (
      <div className="flex flex-col justify-center items-center flex-1 text-2xl">
        Redirecting...
      </div>
    );
  } else {
    return (
      <Card
        color="transparent"
        shadow={true}
        className="px-4 pb-2 max-w-sm w-full shadow-blue-300"
      >
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-2 grid h-24 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign Up
          </Typography>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Input
                crossOrigin={""}
                color="blue"
                label="First Name"
                containerProps={{ className: "min-w-[72px]" }}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                crossOrigin={""}
                color="blue"
                label="Last Name"
                containerProps={{ className: "min-w-[72px]" }}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <Input
              crossOrigin={""}
              color="blue"
              size="lg"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              crossOrigin={""}
              color="blue"
              type="password"
              size="lg"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              color="blue"
              crossOrigin={""}
              type="password"
              size="lg"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Checkbox
              crossOrigin={""}
              color="blue"
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree the
                  <Link
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </Link>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
          </CardBody>

          <CardFooter className="pt-0 -mt-2.5">
            <Button
              type="submit"
              variant="gradient"
              fullWidth
              color="blue"
              disabled={loading}
            >
              Register
            </Button>
            <Typography
              color="gray"
              className="mt-4 font-normal flex justify-center"
            >
              Already have an account?{" "}
              <Typography
                as={Link}
                href="/"
                variant="small"
                color="blue"
                className="ml-1 font-bold"
              >
                Sign In
              </Typography>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    );
  }
};

export default SignupForm;
