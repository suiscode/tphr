import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BsPencil } from "react-icons/bs";
import { Button } from "../ui/button";

const DialogWrapper = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="absolute top-3 right-3 w-10 h-10 hover:bg-[#AB0E66] hover:text-white transition-all duration-200 ease-in items-center justify-center flex cursor-pointer bg-[#AB0E66]/10 text-[#AB0E66]/80 bg-opacity-50 rounded-full">
          <BsPencil className="w-6 h-6 text-inherit" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md items-center flex flex-col">
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogWrapper;
