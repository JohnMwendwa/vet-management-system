"use client";

import { useState, FormEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Option,
  Select,
} from "@/components/Material";

type size = "sm" | "md" | "lg";
type color =
  | "white"
  | "blue-gray"
  | "gray"
  | "brown"
  | "deep-orange"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "light-green"
  | "green"
  | "teal"
  | "cyan"
  | "light-blue"
  | "blue"
  | "indigo"
  | "deep-purple"
  | "purple"
  | "pink"
  | "red";

interface AddDialogProps {
  title: string;
  color?: color;
  size?: size;
  url: string;
  userRole?: boolean;
  className: string;
  children: ReactNode;
}

const AddDialog = ({
  title,
  url,
  userRole,
  children,
  className,
  ...rest
}: AddDialogProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string | undefined>("nurse");
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setOpen(false);

    if (password !== confirmPassword) {
      toast.error("passwords don't match!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        role,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();

    if (data.message) {
      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      router.refresh();
      return;
    } else {
      toast.error(data.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
  };

  const handleOpen = () => setOpen((prev) => !prev);
  return (
    <>
      <Button className={className} onClick={handleOpen} {...rest}>
        {children}
      </Button>

      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="bg-white shadow-none"
      >
        <DialogHeader className="flex justify-center text-white bg-blue-500 text-center rounded-t">
          Add New {title}
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <DialogBody divider>
            <div className="flex flex-col items-center gap-4 p-4">
              <Input
                crossOrigin={""}
                color="blue"
                label="First Name"
                required
                containerProps={{ className: "min-w-[72px]" }}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                crossOrigin={""}
                color="blue"
                label="Last Name"
                required
                containerProps={{ className: "min-w-[72px]" }}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Input
                crossOrigin={""}
                color="blue"
                size="lg"
                label="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                crossOrigin={""}
                color="blue"
                type="password"
                size="lg"
                label="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                color="blue"
                crossOrigin={""}
                type="password"
                size="lg"
                label="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {userRole && (
                <Select
                  value={role}
                  onChange={(el) => setRole(el)}
                  color="blue"
                  label="Role"
                  name="role"
                >
                  <Option value="nurse">Nurse</Option>
                  <Option value="doctor">Doctor</Option>
                </Select>
              )}
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button color="red" type="button" onClick={handleOpen}>
              cancel
            </Button>
            <Button variant="gradient" color="blue" type="submit">
              Add
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
};

export default AddDialog;
