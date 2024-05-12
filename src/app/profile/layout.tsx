import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
// import { userFetch } from "@/lib/fetch";
import { UserInterface } from "@/lib/interface";
import LayoutProfile from "@/components/profile/LayoutProfile";
import { getUserFromCookie } from "@/lib/fetch";

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
    <div className="w-[1440px] flex gap-8 ">
      <LayoutProfile user={JSON.parse(JSON.stringify(user)) as UserInterface} />
      <div className="flex items-start py-4 w-full justify-center min-h-screen">
        {children}
      </div>
    </div>
  );
}
