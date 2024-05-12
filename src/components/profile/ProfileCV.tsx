import { UserInterface } from "@/lib/interface";
import React from "react";
import CVgeneral from "./CVgeneral";



const ProfileCV = ({ user }: { user: UserInterface }) => {
  console.log(user, "dasdsdas");

  return (
    <div className="flex flex-col w-full gap-4">
      <div>
        <h1 className="text-3xl font-semibold ">My CV</h1>
      </div>

      <CVgeneral user={user as UserInterface} />
      <CVgeneral user={user as UserInterface} />
      <CVgeneral user={user as UserInterface} />
    </div>
  );
};

export default ProfileCV;
