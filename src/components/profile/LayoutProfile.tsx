"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BsPencil } from "react-icons/bs";
import axios from "axios";
import { UserInterface } from "@/lib/interface";
import { RiPagesLine } from "react-icons/ri";
import { usePathname, useRouter } from "next/navigation";
import { IoIosLogOut } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";

const LayoutProfile = ({ user }: { user: UserInterface }) => {
  const pathname = usePathname();
  const [image, setImage] = useState<string | null>();
  useEffect(() => {
    console.log(user.image);
    setImage(user.image);
  }, []);
  const { push } = useRouter();

  const handleSignOut = async () => {
    try {
      await axios.put("/api/auth/login");
      push("/");
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const res = await axios(`/api/r2?id=${user._id}`);
    const uploadUrl = res.data.uploadUrl;
    const img = event.target.files?.[0];
    try {
      await axios.put(uploadUrl, img, {
        headers: {
          "Content-Type": img?.type,
        },
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(URL.createObjectURL(file));
      handleUpload(event);
    }
  };

  const noAvatar =
    "https://pub-9e4a462638ff4a6e89664b9e0dd86ca5.r2.dev/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg";

  const links = [
    { label: "My CV", href: "/profile" },
    { label: "Change password", href: "/profile/changepassword" },
  ];
  return (
    <div className="flex flex-col items-center border-black/20 border-r-[2px] p-2 pr-6 pt-4 min-w-[280px] space-y-4">
      <div className="relative flex">
        <Avatar className="w-40 h-40">
          <AvatarImage
            className="object-cover w-full h-full"
            src={image || undefined}
          />
          <AvatarFallback>
            <Image src={noAvatar} fill alt="no avatar" />
          </AvatarFallback>
        </Avatar>
        <label className="absolute bottom-2 right-2 w-10 h-10 hover:bg-black hover:text-white transition-all duration-200 ease-in items-center justify-center flex cursor-pointer  z-10 bg-white bg-opacity-50 rounded-full">
          <input type="file" onChange={(e) => onImageChange(e)} />
          <BsPencil className="w-6 h-6 text-inherit" />
        </label>
      </div>
      <h1 className="text-sm">{user?.email}</h1>
      <ul className="flex gap-2 text-sm flex-col w-full px-4 ">
        {links.map((link) => {
          return (
            <Link href={link.href} key={link.href}>
              <li
                className={`w-full flex gap-2  items-center cursor-pointer px-4 rounded-2xl py-2 ${
                  pathname === link.href
                    ? "bg-white text-[#AB0E66] font-semibold"
                    : "text-black hover:bg-black/5 hover:text-[#AB0E66]/70"
                }`}
              >
                <RiPagesLine className="w-5 h-5" />
                <h1>{link.label}</h1>
              </li>
            </Link>
          );
        })}
        <button
          type="submit"
          onClick={() => handleSignOut()}
          className="w-full flex gap-2 hover:bg- items-center cursor-pointer px-4 rounded-2xl py-2 text-black hover:bg-black/5 hover:text-[#AB0E66]/70"
        >
          <IoIosLogOut className="w-5 h-5" />
          <h1>Log out</h1>
        </button>
      </ul>
    </div>
  );
};

export default LayoutProfile;
