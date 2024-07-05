"use client"

import { AboutUs } from "@/components/About";

import Footer from "@/components/Footer";
import { LandingHero } from "@/components/Hero";
import IconScroll from "@/components/IconScroll";
import { NavbarDemo } from "@/components/Navbar";
import { HeroScrollDemo } from "@/components/Scroll";
import Subscribe from "@/components/Subscribe";
import { InfiniteMovingCardsDemo } from "@/components/Testimonial";
import WhyChooseUs from "@/components/WhyChooseUs";


export default function Home() {
  return (
    <div>
    {/* <NavbarDemo /> */}
    <LandingHero />
    <AboutUs />
    <HeroScrollDemo />
    <IconScroll />
    <WhyChooseUs />
    <InfiniteMovingCardsDemo />
    <Subscribe />
    <Footer />
    </div>
  );
}
