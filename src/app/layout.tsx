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
      <body className={`${inter.className} bg-[#F7F7F7]`}>
        <GlobalContextProvider>
          <Header />
          <main className="container ">
            <div className="flex items-start  justify-center min-h-screen">
              <div className="">{children}</div>
            </div>
          </main>
        </GlobalContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
