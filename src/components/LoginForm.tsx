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
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { FormEvent, useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const query = params?.get("callbackUrl");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // handle login logic
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: `${query ? query.toString() : "/dashboard"}`,
    });
    setLoading(false);

    if (res?.error) {
      toast.error(res.error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    } else {
      router.replace("/dashboard");
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
              crossOrigin={""}
              label="Email"
              size="lg"
              color="blue"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              crossOrigin={""}
              label="Password"
              size="lg"
              color="blue"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="-ml-2.5">
              <Checkbox crossOrigin={""} label="Remember Me" color="blue" />
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
  }
};

export default LoginForm;
