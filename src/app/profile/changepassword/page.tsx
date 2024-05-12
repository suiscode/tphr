"use client";

import React from "react";
import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePasswordSchema } from "../../../lib/schema";
import { Input } from "../../../components/ui/input";
import { useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Button } from "../../../components/ui/button";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { log } from "console";

const ChangePasswordPage = () => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ChangePasswordSchema>) => {
    startTransition(async () => {
      try {
        const res = await axios.post("/api/auth/reset", values);
        toast({
          variant: "default",
          title: res.data.success,
          description: "Password has successfully changed ",
        });
        form.reset();
      } catch (e: any) {
        toast({
          variant: "destructive",
          title: e.response.data.error,
          description: "Please check your current password",
        });
      }
    });
  };

  return (
    <div className="w-[360px]">
      <Form {...form}>
        <form
          className="gap-6 w-full flex flex-col items-center"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="gap-8 flex flex-col w-full text-primary ">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="Current password"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>

                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="Password"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm new password</FormLabel>

                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="Confirm password"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full" type="submit" disabled={isPending}>
            Change password
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChangePasswordPage;
