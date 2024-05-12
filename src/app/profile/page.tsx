import React from "react";
import { UserInterface, userCV } from "@/lib/interface";
import ProfileCV from "@/components/profile/ProfileCV";
import { getUserFromCookie } from "@/lib/fetch";

const ProfilePage = async () => {
  async function fetchData(user: string) {
    const res = await fetch(`/api/user?state=${user}`, {
      cache: "no-cache",
    });
    return res;
  }

  const user = await fetchData("user");

  return (
    <>
      <ProfileCV user={JSON.parse(JSON.stringify(user)) as UserInterface} />
    </>
  );
};

export default ProfilePage;
