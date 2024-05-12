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
import { generalSchema } from "../../lib/schema";
import { userCV } from "@/lib/interface";
import CVWrapper from "./CVwrapper";
import DialogWrapper from "./DialogWrapper";
import { Input } from "../ui/input";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const CVgeneral = ({ userCv, onSubmit }: { userCv: userCV; onSubmit: any }) => {
  const form = useForm<z.infer<typeof generalSchema>>({
    resolver: zodResolver(generalSchema),
    defaultValues: {
      about: userCv?.about || "",
      firstName: userCv?.firstName || "",
      lastName: userCv?.lastName || "",
      registerID: userCv?.registerID || "",
      gender: userCv?.gender || "",
    },
  });


  return (
    <CVWrapper label={"General"}>
      <DialogWrapper>
        <Form {...form}>
          <form
            className="space-y-6 relative w-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="gap-4 w-full flex flex-col text-white ">
              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem className="flex flex-col text-black">
                    <FormLabel>About me</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex flex-col text-black">
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex flex-col text-black">
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="registerID"
                render={({ field }) => (
                  <FormItem className="flex flex-col text-black">
                    <FormLabel>Register ID</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="flex flex-col text-black">
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>

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
      <div>
        <h1 className="font-medium">About me</h1>
        <h1 className="text-black/50">{userCv?.about}</h1>
      </div>
      <div className="flex">
        <div className="w-1/2 space-y-2">
          <div className="space-y-0">
            <h1 className="font-medium">First name</h1>
            <h1 className="text-black/50">{userCv?.firstName}</h1>
          </div>
          <div className="space-y-0">
            <h1 className="font-medium">Last name</h1>
            <h1 className="text-black/50">{userCv?.lastName}</h1>
          </div>
        </div>
        <div className="w-1/2 space-y-2">
          <div className="space-y-0">
            <h1 className="font-medium">ID number</h1>
            <h1 className="text-black/50">{userCv?.registerID}</h1>
          </div>
          <div className="space-y-0">
            <h1 className="font-medium">Gender</h1>
            <h1 className="text-black/50">{userCv?.gender}</h1>
          </div>
        </div>
      </div>
    </CVWrapper>
  );
};

export default CVgeneral;
