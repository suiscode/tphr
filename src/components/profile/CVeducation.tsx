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
import { educationSchema } from "../../lib/schema";
import { userCV } from "@/lib/interface";
import CVWrapper from "./CVwrapper";
import DialogWrapper from "./DialogWrapper";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { countries, degree } from "@/lib/model";
import { Input } from "../ui/input";

const CVeducation = ({
  userCv,
  onSubmit,
}: {
  userCv: userCV;
  onSubmit: any;
}) => {
  const form = useForm<z.infer<typeof educationSchema>>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      GPA: userCv?.GPA || "",
      schoolName: userCv?.schoolName || "",
      schoolCountry: userCv?.schoolCountry || "",
      degree: userCv?.degree || "",
    },
  });

  return (
    <CVWrapper label={"Education"}>
      <DialogWrapper>
        <Form {...form}>
          <form
            className="space-y-6 relative w-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="gap-4 w-full flex flex-col text-white ">
              <FormField
                control={form.control}
                name="schoolCountry"
                render={({ field }) => (
                  <FormItem className="flex flex-col text-black">
                    <FormLabel>School country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries.map((item: string) => {
                          return (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="degree"
                render={({ field }) => (
                  <FormItem className="flex flex-col text-black">
                    <FormLabel>Degree</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Degree" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {degree.map((item: string) => {
                          return (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="schoolName"
                render={({ field }) => (
                  <FormItem className="flex flex-col text-black">
                    <FormLabel>School name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={form.control}
                name="GPA"
                render={({ field }) => (
                  <FormItem className="flex flex-col text-black">
                    <FormLabel>GPA</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
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
          <h1 className="font-medium">School country</h1>
          <h1 className="text-black/50">{userCv?.schoolCountry}</h1>
        </div>
        <div className="w-1/2 space-y-2">
          <h1 className="font-medium">Degree</h1>
          <h1 className="text-black/50">{userCv?.degree}</h1>
        </div>
      </div>
      <div className="flex justify-between ">
        <div className="w-1/2 space-y-2">
          <h1 className="font-medium">School name</h1>
          <h1 className="text-black/50">{userCv?.schoolName}</h1>
        </div>
        <div className="w-1/2 space-y-2">
          <h1 className="font-medium">GPA</h1>
          <h1 className="text-black/50">{userCv?.GPA}</h1>
        </div>
      </div>
    </CVWrapper>
  );
};

export default CVeducation;
