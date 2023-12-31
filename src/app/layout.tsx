import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./context/AuthProvider";
import { DefaultSession, getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar user={session?.user} />
          <ToastContainer />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
