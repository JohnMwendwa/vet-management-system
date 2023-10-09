"use client";

import { FormEvent, useState } from "react";
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

const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // handle signup logic
  };
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
              crossOrigin={true}
              color="blue"
              label="First Name"
              containerProps={{ className: "min-w-[72px]" }}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              crossOrigin={true}
              color="blue"
              label="Last Name"
              containerProps={{ className: "min-w-[72px]" }}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <Input
            crossOrigin={true}
            color="blue"
            size="lg"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            crossOrigin={true}
            color="blue"
            type="password"
            size="lg"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            color="blue"
            crossOrigin={true}
            type="password"
            size="lg"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Checkbox
            crossOrigin={true}
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
};

export default SignupForm;
