"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Tooltip,
} from "@/components/Material";
import { PencilIcon } from "@heroicons/react/24/solid";

interface EditDialogProps {
  first: string;
  last: string;
  userEmail: string;
  url: string;
  id: string;
}

const EditDialog = ({ first, last, userEmail, url, id }: EditDialogProps) => {
  const [firstName, setFirstName] = useState(first);
  const [lastName, setLastName] = useState(last);
  const [email, setEmail] = useState(userEmail);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setOpen(false);

    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        id,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();

    if (data.message) {
      toast.success(data.message, {
        position: "top-center",
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
  };

  const handleOpen = () => setOpen((prev) => !prev);
  return (
    <>
      <Tooltip content="Edit User">
        <IconButton onClick={handleOpen} variant="text" color="blue">
          <PencilIcon className="h-4 w-4" />
        </IconButton>
      </Tooltip>
      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="bg-white shadow-none"
      >
        <DialogHeader className="flex justify-center text-white bg-blue-500 text-center rounded-t">
          Edit Details
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
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button color="red" type="button" onClick={handleOpen}>
              cancel
            </Button>
            <Button variant="gradient" color="blue" type="submit">
              update
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
};

export default EditDialog;
