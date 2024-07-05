"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[30rem] rounded-md flex flex-col antialiased dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <h2 className="text-4xl mb-8 text-white font-bold">Customer Stories</h2>
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "Thanks to this app, I was able to practice for my interviews on my own schedule. The realistic interview simulations and instant feedback were incredibly helpful.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "I never knew how much I needed this tool until I started using it. The comprehensive question bank and detailed analytics gave me a clear picture of where I stood. The constant practice boosted my confidence, and I nailed my interview!",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "This mock interview app is a must-have for anyone looking to excel in their job search. It made all the difference in my preparation and I landed a great job offer.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "The AI-driven feedback helped me refine my answers and the flexibility allowed me to practice anytime. I felt completely prepared for my interviews and it paid off!",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "The app's expert resources and personalized interview simulations were invaluable. I felt like I was getting one-on-one coaching.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];
