"use client";
import { Button } from "@/components/ui/button";
import { handleSignOut } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  { label: "Users", href: "/admin" },
  { label: "CV List", href: "/admin/cvlist" },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <div className="w-screen bg-[#F7F7F7] drop-shadow-md border-b text-primary flex items-center justify-center">
      <div className="w-[1440px] flex gap-4 items-center justify-between">
        <ul>
          {links.map((item) => {
            return (
              <Link key={item.label} href={item.href}>
                <Button
                  className={`${
                    pathname === item.href ? "text-[#AB0E66]" : ""
                  }`}
                  variant={"link"}
                >
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </ul>
        <Button variant={"link"} onClick={() => handleSignOut()}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Header;
