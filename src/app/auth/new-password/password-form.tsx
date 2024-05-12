"use client";
import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "../../../lib/schema";
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
import { useRouter, useSearchParams } from "next/navigation";
import Wrapper from "../Wrapper";
import { useToast } from "@/components/ui/use-toast";

export default function NewPasswordForm() {
  const searchParam = useSearchParams();
  const token = searchParam.get("token");
  const { toast } = useToast();
  const { push } = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    startTransition(async () => {
      try {
        const res = await axios.put("/api/auth/reset", { values, token });
        toast({
          variant: "default",
          title: "Password reset successful",
        });
        push("/auth/signin");
        form.reset();
      } catch (e: any) {
        console.log(e);

        toast({
          variant: "destructive",
          title: "Password reset failed",
          description: e.response.data.error,
        });
      }
    });
  };

  return (
    <Wrapper
      label={"Email verification"}
      backbutton={"Back to log in"}
      backurl={"/auth/login"}
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
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
                      placeholder="********"
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
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="********"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full" type="submit" disabled={isPending}>
            Reset password
          </Button>
        </form>
      </Form>
    </Wrapper>
  );
}
