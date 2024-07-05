// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "../../globals.css";
import Header from "@/app/dashboard/_components/Header";

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export default function Layout({ children }) {
  return (
    <div
      className={
        cn("antialiased", fontHeading.variable, fontBody.variable) +
        " flex flex-col h-svh"
      }
    >
      <Header />
      <div className=" flex-1 grid items-center">{children}</div>
    </div>
  );
}
