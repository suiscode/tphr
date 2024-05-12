import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My profile ",
  description: "Your cv section",
  icons: "/favicon.ico",
};

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-screen h-screen justify-end bg-[url('/bg-shape.jpg')] bg-cover">
      <div className="flex items-center bg-white w-[760px] justify-center h-full">
        {children}
      </div>
    </div>
  );
}
