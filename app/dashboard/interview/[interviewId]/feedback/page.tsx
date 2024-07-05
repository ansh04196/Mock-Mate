"use client";

import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useMemo, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getFeedback } from "@/actions/feedback";

interface FeedbackProps {
  params: {
    interviewId: string;
  };
}

interface FeedbackItem {
  id: number;
  createdAt: string | null;
  mockIdref: string;
  question: string;
  correctAns: string | null;
  userAns: string | null;
  feedback: string | null;
  rating: string | null;
  userEmail: string | null;
}

const Feedback: React.FC<FeedbackProps> = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);

  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
   try {
     const {result} = await getFeedback(params.interviewId)
 
     console.log(result);
     setFeedbackList(result);
   } catch (error) {
    alert("something went wrong")
   }
  };
  const data = useMemo(()=>{
    let rating = 0;
    for(let i of feedbackList){
      rating = rating + Number.parseInt(i.rating!)
    }
    return rating/(feedbackList.length ?? 1)
  },[feedbackList])

  return (
    <div className="p-10">
      {feedbackList?.length == 0 ? (
        <h2 className="font-bold text-xl text-gray-500">No interview feedback</h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">
            Congratulations!
          </h2>
          <h2 className="font-semibold text-2xl">
            Here is your interview feedback.
          </h2>
          <h2 className="text-blue-300 text-lg my-3">
            Your overall interview rating: <strong>{data}/10</strong>
          </h2>

          <h2 className="text-sm text-gray-500">
            Find below interview questions with correct answer, Your answer and
            feedback for improvement.
          </h2>
          {feedbackList &&
            feedbackList.map((item, index) => (
              <Collapsible key={index} className="mt-7">
                <CollapsibleTrigger className="p-2 bg-gray-200 rounded-lg my-2 text-left flex justify-between gap-7 w-full">
                  {item.question} <ChevronsUpDown className="h-5 w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2 ">
                    <h2 className="text-red p-2 border rounded-lg">
                      <strong>Rating:</strong>
                      {item.rating}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-red-200 text-sm">
                      <strong>Your Answer : </strong>
                      {item.userAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-green-200 text-sm">
                      <strong>Correct Answer : </strong>
                      {item.correctAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-blue-200 text-sm">
                      <strong>Feedback : </strong>
                      {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}

      <Button onClick={() => router.replace("/dashboard")}>Go Home</Button>
    </div>
  );
};

export default Feedback;
