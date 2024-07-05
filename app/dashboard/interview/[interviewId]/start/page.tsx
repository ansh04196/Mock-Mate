"use client";
import { MockInterview } from "@/utils/schema";
import React, { useContext, useEffect, useState } from "react";
import { eq } from "drizzle-orm";
import QuestionSection from "./_components/QuestionSection";
import RecordSection from "./_components/RecordSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getInterviewDetails } from "@/actions/dashboard";
import { InterviewContext } from "@/app/dashboard/InterviewProvider";

export interface InterviewProps {
  params: any;
}

export interface InterviewData {
  id: number;
  jsonMockResp: string;
  jobPosition: string;
  jobDesc: string;
  jobExperience: string;
  createdBy: string;
  createdAt: string;
  mockId: string;
}

export interface MockInterviewQuestion {
  id: string;
  question: string;
  answer: string;
}

const StartInterview: React.FC<InterviewProps> = ({ params }) => {
  const {activeQuestionIndex,interviewData,mockInterviewQuestion,setActiveQuestionIndex,setInterviewData,setMockInterviewQuestion} = useContext(InterviewContext)

  useEffect(() => {
    GetInterViewDetails();
  }, []);

  const GetInterViewDetails = async () => {
    try {
      const { result } = await getInterviewDetails(params.interviewId);
    
      const jsonMockResp = JSON.parse(result[0].jsonMockResp);
      setMockInterviewQuestion(jsonMockResp);
      setInterviewData(result[0]);
      console.log(jsonMockResp);
    } catch (error) {
      console.log("something went wrong")
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionSection />

        <RecordSection />
      </div>

      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>Previous Question</Button>}
        {activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>Next Question</Button>
        )}
        {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
          <Link href={'/dashboard/interview/' + interviewData?.mockId + "/feedback"}>
            <Button >End Interview</Button></Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
