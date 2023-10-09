"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import Link from "next/link";
import { FormEvent, useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // handle login logic
  };
  return (
    <Card
      color="transparent"
      className="px-4 pb-2 max-w-sm w-full shadow-blue-300"
    >
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Sign In
        </Typography>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardBody className="flex flex-col gap-4">
          <Input
            crossOrigin={true}
            label="Email"
            size="lg"
            color="blue"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            crossOrigin={true}
            label="Password"
            size="lg"
            color="blue"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="-ml-2.5">
            <Checkbox crossOrigin={true} label="Remember Me" color="blue" />
          </div>
        </CardBody>

        <CardFooter className="pt-0">
          <Button
            type="submit"
            variant="gradient"
            fullWidth
            color="blue"
            disabled={loading}
          >
            Sign In
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Typography
              as={Link}
              href="/signup"
              variant="small"
              color="blue"
              className="ml-1 font-bold"
            >
              Sign up
            </Typography>
          </Typography>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
