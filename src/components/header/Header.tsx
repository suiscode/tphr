import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = async () => {
  const token = cookies().get("cookie");

  return (
    <div className="w-screen bg-[#F7F7F7] drop-shadow-md border-b text-primary flex items-center justify-center">
      <div className="w-[1440px] flex  justify-between items-center">
        <Link href="/">
          <Image
            src="/icon.png"
            width={48}
            height={48}
            alt="icon"
            className=""
          />
        </Link>
        {token !== undefined ? (
          <Link href="/profile" className="flex items-center gap-2">
            My profile
          </Link>
        ) : (
          <Link href="/auth/signin">Sign in</Link>
        )}
      </div>
    </div>
  );
};

export default Header;
