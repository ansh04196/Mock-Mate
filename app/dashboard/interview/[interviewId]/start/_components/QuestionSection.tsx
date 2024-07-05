"use client";
import { InterviewContext } from "@/app/dashboard/InterviewProvider";
import { Lightbulb, Volume2 } from "lucide-react";
import React, { useContext, useState } from "react";



interface MockInterviewQuestion {
  id: string;
  question: string;
}
const QuestionSection: React.FC = () => {
  const {mockInterviewQuestion,activeQuestionIndex} = useContext(InterviewContext)
  console.log(mockInterviewQuestion)
  const textToSpeech = (text: string) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, Your browser does not support text to speech.");
    }
  };

  return (
    mockInterviewQuestion && (
      <div className="p-5 border rounded-lg my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestion.map((question, index) => (
            <h2
              key={index}
              className={`p-2 bg-gray-200 rounded-full text-xs md:text-sm text-center cursor-pointer  ${
                activeQuestionIndex == index && "bg-blue-500 text-white"
              }`}
            >
              Question #{index + 1}
            </h2>
          ))}
        </div>
        <h2 className="my-5 text-sm md:text-l g">
          {mockInterviewQuestion[activeQuestionIndex]?.question}
        </h2>

        <Volume2
          className="cursor-pointer"
          onClick={() =>
            textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
          }
        />
        <div className="border rounded-lg p-5 bg-blue-200 mt-20">
          <h2 className="flex gap-2 items-center text-blue-400">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm my-2">
            {process.env.NEXT_PUBLIC_NOTE}
          </h2>
        </div>
      </div>
    )
  );
};

export default QuestionSection;
