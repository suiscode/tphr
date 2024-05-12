"use client";
import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema } from "../../../lib/schema";
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
import Wrapper from "../Wrapper";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

export default function ResetForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    startTransition(async () => {
      try {
        const response = await axios.get(
          "/api/auth/reset?email=" + values.email
        );
        toast({
          variant: "default",
          title: response.data.success,
          description: "Verification email sent",
        });
      } catch (e: any) {
        toast({
          variant: "destructive",
          title: e.response.data.error,
          description: "Please enter valid email",
        });
      }
    });
  };

  return (
    <Wrapper label={"Get reset token"}>
      <Form {...form}>
        <form
          className="space-y-6 w-[450px] h-[450px] px-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="john.doe@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link href="/auth/signin">
              <Button size={"sm"} className="py-0 px-2 -mt-4" variant={"link"}>
                Back to login
              </Button>
            </Link>
          </div>
          <Button className="w-full" type="submit" disabled={isPending}>
            Send reset email
          </Button>
        </form>
      </Form>
    </Wrapper>
  );
}
