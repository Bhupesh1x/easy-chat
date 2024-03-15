import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import AuthContext from "@/context/AuthContext";
import ActiveStatus from "@/components/ActiveStatus";
import ToasterProvider from "@/providers/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Easy Chat",
  description: "Easy Chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ActiveStatus />
          <ToasterProvider />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
