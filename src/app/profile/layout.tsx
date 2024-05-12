import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
// import { userFetch } from "@/lib/fetch";
import { UserInterface } from "@/lib/interface";
import LayoutProfile from "@/components/profile/LayoutProfile";
import { getUserFromCookie } from "@/lib/fetch";
import Header from "@/components/header/Header";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My profile ",
  description: "Your cv section",
  icons: "/favicon.ico",
};

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserFromCookie({ withCV: false });

  return (
    <div className="flex flex-col w-full items-center">
      <Header />
      <div className="2xl:w-[1440px] w-full flex  flex-col lg:flex-row 2xl:flex-row gap-8 ">
        <LayoutProfile
          user={JSON.parse(JSON.stringify(user)) as UserInterface}
        />
        <div className="flex items-start py-4 w-full justify-center min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
}
