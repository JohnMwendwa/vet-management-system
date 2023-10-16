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
import { TrashIcon } from "@heroicons/react/24/solid";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface DeleteDialogProps {
  name: string;
  email: string;
  id: string;
  url: string;
}

const DeleteDialog = ({ name, email, url, id }: DeleteDialogProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleOpen = () => setOpen((prev) => !prev);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setOpen(false);

    const res = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
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
  };

  return (
    <>
      <Tooltip content="Delete User">
        <IconButton onClick={handleOpen} variant="text" color="red">
          <TrashIcon className="h-5 w-5" />
        </IconButton>
      </Tooltip>
      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="bg-white shadow-none"
      >
        <DialogHeader className="flex justify-center text-white bg-red-500 text-center rounded-t">
          <ExclamationTriangleIcon className="h-6 w-6 mr-2" /> Delete User
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <DialogBody divider>
            <div className="flex flex-col items-center gap-4 p-4">
              <Input
                crossOrigin={""}
                color="blue"
                label="Name"
                containerProps={{ className: "min-w-[72px]" }}
                value={name}
                disabled
              />
              <Input
                crossOrigin={""}
                color="blue"
                label="Email"
                containerProps={{ className: "min-w-[72px]" }}
                value={email}
                disabled
              />
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button color="blue" type="button" onClick={handleOpen}>
              cancel
            </Button>
            <Button variant="gradient" color="red" type="submit">
              delete
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
