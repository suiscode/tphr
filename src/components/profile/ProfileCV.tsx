"use client";
import { userCV } from "@/lib/interface";
import React, { useState } from "react";
import CVgeneral from "./CVgeneral";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import CVcontact from "./CVcontact";
import CVworkex from "./CVworkex";
import CVeducation from "./CVeducation";

const ProfileCV = ({ user }: any) => {
  const toast = useToast();

  const [userCv, setUserCv] = useState<any>(user.cv);

  const onSubmit = async (values: any) => {

    try {
      setUserCv((prev: any) => ({ ...prev, ...values }));
      const res = await axios.put("/api/user", { values, _id: user.cv._id });
      // toast({
      //   variant: "default",
      //   title: "CV Updated",
      //   description: "Your CV has been updated successfully ",
      // });
    } catch (e: any) {
      // toast({
      //   variant: "destructive",
      //   title: "Error Occured",
      //   description: e.response.data.error,
      // });
    }
  };
  return (
    <div className="flex flex-col w-full gap-4">
      <div>
        <h1 className="text-3xl font-semibold ">My CV</h1>
      </div>

      <CVgeneral
        userCv={JSON.parse(JSON.stringify(userCv)) as userCV}
        onSubmit={onSubmit}
      />
      <CVcontact
        userCv={JSON.parse(JSON.stringify(userCv)) as userCV}
        onSubmit={onSubmit}
      />
      <CVworkex
        userCv={JSON.parse(JSON.stringify(userCv)) as userCV}
        onSubmit={onSubmit}
      />
      <CVeducation
        userCv={JSON.parse(JSON.stringify(userCv)) as userCV}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default ProfileCV;
