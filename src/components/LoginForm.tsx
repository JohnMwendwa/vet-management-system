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
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { FormEvent, useState, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const query = params?.get("callbackUrl");

  useEffect(() => {
    if (session) {
      router.replace(query ? query.toString() : "/dashboard");
    }
  }, [router, query, session]);

  const handleOpen = () => setOpen((prev) => !prev);

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
        autoClose: 5000,
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
    return (
      <div className="flex flex-col justify-center items-center flex-1 text-2xl">
        Redirecting...
      </div>
    );
  } else {
    return (
      <Card color="white" className="px-4 pb-2 max-w-sm w-full shadow-blue-300">
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
            <Accordion
              open={open}
              className="px-4 border border-blue-500 rounded-lg"
              icon={
                open ? (
                  <ChevronDownIcon className="h-6 w-6 text-blue-900" />
                ) : (
                  <ChevronUpIcon className="h-6 w-6 text-blue-900" />
                )
              }
            >
              <AccordionHeader onClick={handleOpen} className={`border-b-0`}>
                Demo Account
              </AccordionHeader>
              <AccordionBody className="flex flex-col justify-center pt-0">
                <Typography variant="small">
                  <b className="font-extrabold text-blue-500">Email: </b>
                  example@gmail.com
                </Typography>
                <Typography variant="small">
                  <b className="font-extrabold text-blue-500">Password: </b>
                  12345678
                </Typography>
              </AccordionBody>
            </Accordion>

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
