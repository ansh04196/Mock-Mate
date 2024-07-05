"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-white font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>The Best AI Tool for</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          <TypewriterComponent
            options={{
              strings: [
                "Mock Interview.",
                "Mock Test.",
                "Job Search.",
                "Resume ATS Checker.",
                "Job Apply.",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        Ace Your Next Interview with AI-Powered Mock Sessions!
      </div>
      <div className="">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            variant="secondary"
            className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
          >
            Get Started
          </Button>
        </Link>
      </div>
      <p className="mx-auto mt-6 max-w-xl text-lg text-gray-500 dark:text-slate-400 sm:mt-5 md:mt-[50px]">
        Harness the Power of AI for Your Interview Preparation. Experience
        Realistic Simulations and Personalized Feedback. Comprehensive
        AI-Powered Tests. Prepare, Practice, and Excel in Every Aspect.
      </p>
    </div>
  );
};
