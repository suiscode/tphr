import { Button } from "@/components/ui/button";
import React from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "../../../routes";

export default function ButtonAuth({ isPending }: { isPending: boolean }) {
  const onClick = (provider: "google") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="gap-2 flex items-center flex-col w-full">
      <h1 className="text-lg">OR</h1>
      <div className="flex justify-between w-full">
        <Button
          disabled={isPending}
          className="w-full flex gap-2"
          onClick={() => onClick("google")}
        >
          <FaGoogle />
          Google
        </Button>
      </div>
    </div>
  );
}
