import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
// import { userFetch } from "@/lib/fetch";
import { UserInterface } from "@/lib/interface";
import LayoutProfile from "@/components/profile/LayoutProfile";
import { getUserFromCookie } from "@/lib/fetch";
import Header from "./Header";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin dashboard ",
  description: "Admin section",
  icons: "/favicon.ico",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-screen items-center">
      <Header />
      <div className="w-[1440px] flex  gap-8 ">
        <div className="flex items-start py-4 w-full justify-center min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
}
