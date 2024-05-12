import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { GlobalContextProvider } from "./context/Context";
import Header from "@/components/header/Header";
import { Toaster } from "@/components/ui/toaster";
import { cookies } from "next/headers";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Human resource",
  description: "Human resource management system",
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} overflow-x-hidden w-screen bg-[#F7F7F7]`}
      >
        <GlobalContextProvider>
          <div className="flex items-start w-full justify-center min-h-screen">
            {children}
          </div>
        </GlobalContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
