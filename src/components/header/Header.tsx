import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = async () => {
  const token = cookies().get("cookie");

  return (
    <div className="w-full px-8 lg:px-0 2xl:px-0  bg-[#F7F7F7] drop-shadow-md border-b text-primary flex items-center justify-center">
      <div className="w-[1440px] flex  justify-between items-center">
        <Link href="/">
          <Image
            src="https://pub-9e4a462638ff4a6e89664b9e0dd86ca5.r2.dev/EV-UCNILCD-W12PIPQ-TRE7QOQ-0K-removebg-preview.png"
            width={120}
            height={120}
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
