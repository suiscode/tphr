"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "../../lib/schema";
import { userCV } from "@/lib/interface";
import CVWrapper from "./CVwrapper";
import DialogWrapper from "./DialogWrapper";
import { Input } from "../ui/input";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTumblrSquare } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const CVcontact = ({ userCv, onSubmit }: { userCv: userCV; onSubmit: any }) => {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      phoneNumber: userCv?.phoneNumber || "",
      address: userCv?.address || "",
      instagram: userCv?.instagram || "",
      facebook: userCv?.facebook || "",
      linkedin: userCv?.linkedin || "",
    },
  });

  return (
    <CVWrapper label={"Contact"}>
      <DialogWrapper label={"Contact"}>
        <Form {...form}>
          <form
            className="space-y-6 relative w-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="gap-4 w-full flex flex-col text-white ">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="flex flex-col text-black">
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="flex flex-col text-black">
                    <FormLabel>Home address</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem className="flex flex-col text-black">
                    <FormLabel>Instagram account</FormLabel>
                    <FormControl>
                      <div className="flex relative items-center">
                        <h1 className="left-[10px] absolute">
                          https://www.Instagram.com/
                        </h1>
                        <Input className="pl-[236px]" {...field} type="text" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="facebook"
                render={({ field }) => (
                  <FormItem className="flex flex-col text-black">
                    <FormLabel>Facebook account</FormLabel>
                    <FormControl>
                      <div className="flex relative items-center">
                        <h1 className="left-[10px] absolute">
                          https://www.facebook.com/
                        </h1>
                        <Input className="pl-[230px]" {...field} type="text" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem className="flex flex-col text-black">
                    <FormLabel>Linkedin account</FormLabel>
                    <FormControl>
                      <div className="flex relative items-center">
                        <h1 className="left-[10px] absolute">
                          https://www.Linkedin.com/
                        </h1>
                        <Input className="pl-[226px]" {...field} type="text" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {!form.formState.isValid ? (
              <Button type="submit" variant="secondary">
                Save
              </Button>
            ) : (
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="submit" variant="secondary">
                    Save
                  </Button>
                </DialogClose>
              </DialogFooter>
            )}
          </form>
        </Form>
      </DialogWrapper>
      <div className="flex justify-between ">
        <div className="w-1/2 space-y-2">
          <h1 className="font-medium">Phone number</h1>
          <h1 className="text-black/50">{userCv?.phoneNumber}</h1>
        </div>
        <div className="w-1/2 space-y-2">
          <h1 className="font-medium">Address</h1>
          <h1 className="text-black/50">{userCv?.address}</h1>
        </div>
      </div>
      <div className="flex flex-col ">
        <h1 className="font-medium">Socials</h1>
        <div className="flex flex-col gap-2">
          {userCv?.instagram && (
            <div className="w-1/2 gap-2 flex items-center">
              <FaInstagram className="w-6 h-6" />
              <a
                href={`https://www.instagram.com/${userCv?.instagram}`}
                target="_blank"
                className="text-black/50"
              >
                https://www.instagram.com/{userCv?.instagram}
              </a>
            </div>
          )}
          {userCv?.facebook && (
            <div className="w-1/2 gap-2 flex items-center">
              <FaFacebook className="w-6 h-6" />
              <a
                href={`https://www.facebook.com/${userCv?.facebook}`}
                target="_blank"
                className="text-black/50"
              >
                https://www.facebook.com/{userCv?.facebook}
              </a>
            </div>
          )}
          {userCv?.linkedin && (
            <div className="w-1/2 gap-2 flex items-center">
              <FaTumblrSquare className="w-6 h-6" />
              <a
                href={`https://www.linkedin.com/${userCv?.linkedin}`}
                target="_blank"
                className="text-black/50"
              >
                https://www.linkedin.com/{userCv?.linkedin}
              </a>
            </div>
          )}
        </div>
      </div>
    </CVWrapper>
  );
};

export default CVcontact;
