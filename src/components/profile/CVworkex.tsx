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
import { careerPathSchema } from "../../lib/schema";
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
import { careers, salary, timeshift } from "@/lib/model";

const CVworkex = ({ userCv, onSubmit }: { userCv: userCV; onSubmit: any }) => {
  const form = useForm<z.infer<typeof careerPathSchema>>({
    resolver: zodResolver(careerPathSchema),
    defaultValues: {
      career: userCv?.career || "",
      salaryExpectency: userCv?.salaryExpectency || "",
      workDuration: userCv?.workDuration || "",
    },
  });

  return (
    <CVWrapper label={"Career path"}>
      <DialogWrapper label={"Career path"}>
        <Form {...form}>
          <form
            className="space-y-6 relative w-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="gap-4 w-full flex flex-col text-white ">
              <FormField
                control={form.control}
                name="workDuration"
                render={({ field }) => (
                  <FormItem className="flex flex-col text-black">
                    <FormLabel>Work shift</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Work shift" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeshift.map((item: string) => {
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
                name="salaryExpectency"
                render={({ field }) => (
                  <FormItem className="flex flex-col text-black">
                    <FormLabel>Salary Expectency</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Work shift" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {salary.map((item: string) => {
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
                name="career"
                render={({ field }) => (
                  <FormItem className="flex flex-col text-black">
                    <FormLabel>Career path</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Career path" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {careers.map((item: string) => {
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
          <h1 className="font-medium">Work shift</h1>
          <h1 className="text-black/50">{userCv?.workDuration}</h1>
        </div>
        <div className="w-1/2 space-y-2">
          <h1 className="font-medium">Salary expectency</h1>
          <h1 className="text-black/50">{userCv?.salaryExpectency}</h1>
        </div>
      </div>
      <div className="w-1/2 space-y-2">
        <h1 className="font-medium">Career path</h1>
        <h1 className="text-black/50">{userCv?.career}</h1>
      </div>
    </CVWrapper>
  );
};

export default CVworkex;
