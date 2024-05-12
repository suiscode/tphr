"use client";
import React, { useState } from "react";
import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../../lib/schema";
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
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function LoginForm() {
  const router = useRouter();
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setSuccess("");
    setError("");
    startTransition(async () => {
      try {
        const res = await axios.post("/api/auth/login", values);
        console.log(res.data);
        if (
          res.data.success === "Email is not verified, verification email sent"
        ) {
          setSuccess(res.data.success);

          return;
        }

        router.push("/profile");
        if (res.data.twoFactor) {
          setShowTwoFactor(true);
          toast({
            variant: "destructive",
            title: "Successfully ",
            description: "Logged In",
          });
        }
      } catch (e: any) {
        if (e.response.data.error) {
          form.reset();
        }
        toast({
          variant: "destructive",
          title: "Error Occured",
          description: "Email or password wrong",
        });
      }
    });
  };

  return (
    <Wrapper label={"Нэвтрэх"}>
      <Form {...form}>
        <form
          className="space-y-6 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="Enter your email"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col items-start w-full">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
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
              <div className="flex justify-between w-full">
                <Button
                  variant="link"
                  size="sm"
                  className="text-primary p-0"
                  type="button"
                >
                  <Link href="/auth/reset">Forgot password?</Link>
                </Button>
                <Button
                  variant="link"
                  size="sm"
                  className="text-primary p-0"
                  type="button"
                >
                  <Link href="/auth/signup">Don't have an account?</Link>
                </Button>
              </div>
            </div>
          </div>
          <Button className="w-full border" type="submit" disabled={isPending}>
            Sign in
          </Button>
        </form>
      </Form>
    </Wrapper>
  );
}
