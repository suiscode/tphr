import React from "react";
import { UserInterface, userCV } from "@/lib/interface";
import ProfileCV from "@/components/profile/ProfileCV";
import { getUserFromCookie } from "@/lib/fetch";

const ProfilePage = async () => {
  const user = await getUserFromCookie({ withCV: true });

  return (
    <>
      <ProfileCV user={JSON.parse(JSON.stringify(user)) as UserInterface} />
    </>
  );
};

export default ProfilePage;
