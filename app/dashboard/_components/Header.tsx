"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Header = () => {
  const path = usePathname();
  useEffect(() => {}, []);

  return (
    <div className="flex p-4 w-[99vw] items-center justify-between bg-gray-200 shadow-md">
      <Image src={"/logo.svg"} width={40} height={40} alt="logo" />

      <ul className="hidden md:flex gap-6">
        <Link href="/dashboard">
          <li
            className={`hover:text-blue-500 hover:font-bold transition-all cursor-pointer 
            ${path == "/dashboard" && "text-blue-500 font-bold"}`}
          >
            Interview
          </li>
        </Link>
        <Link href="/dashboard/resume">
        <li
          className={`hover:text-blue-500 hover:font-bold transition-all cursor-pointer 
            ${path == "/dashboard/resume" && "text-blue-500 font-bold"}`}
            >
          CV Score
        </li>
          </Link>
        <Link href="/dashboard/questions">
          <li
            className={`hover:text-blue-500 hover:font-bold transition-all cursor-pointer 
            ${path == "/dashboard/questions" && "text-blue-500 font-bold"}`}
          >
            Questions
          </li>
        </Link>
        <Link href="/pricing">
        <li
          className={`hover:text-blue-500 hover:font-bold transition-all cursor-pointer 
            ${path == "/pricing" && "text-blue-500 font-bold"}`}
            >
          Pricing
        </li>
          </Link>
          <Link href='/job'>
        <li
          className={`hover:text-blue-500 hover:font-bold transition-all cursor-pointer 
            ${path == "/job" && "text-blue-500 font-bold"}`}
            >
          Jobs
        </li>
        </Link>
        <Link href="/interviewexperience">
        <li
          className={`hover:text-blue-500 hover:font-bold transition-all cursor-pointer 
            ${path == "/interviewexperience" && "text-blue-500 font-bold"}`}
            >
          Blogs
        </li>
          </Link>
      </ul>
      <UserButton />
    </div>
  );
};

export default Header;
