"use client";
import { getInterviewDetails } from "@/actions/dashboard";
import { Button } from "@/components/ui/button";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import webcam from "react-webcam";

interface InterviewProps {
  params: any;
}

interface InterviewData {
  id: number;
  jsonMockResp: string;
  jobPosition: string;
  jobDesc: string;
  jobExperience: string;
  createdBy: string;
  createdAt: string;
  mockId: string;
}

const Interview: React.FC<InterviewProps> = ({ params }) => {
  const [interviewData, setInterviewData] = useState<InterviewData | null>(
    null
  );
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  useEffect(() => {
    console.log(params.interviewId);
    GetInterViewDetails();
  }, []);

  const GetInterViewDetails = async () => {
    try {
      const {result} = await getInterviewDetails(params.interviewId)
      setInterviewData(result[0]);
    } catch (error) {
      console.log(error)
    }

    // console.log(result);
  };

  return (
    <div className="my-10">
      <h2 className="font-semibold text-2xl">Let's Get Started</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2 className="text-lg">
              {" "}
              <strong>Job Role / Job Position :</strong>
              {interviewData?.jobPosition}
            </h2>
            <h2 className="text-lg">
              {" "}
              <strong>Job Description :</strong>
              {interviewData?.jobDesc}
            </h2>
            <h2 className="text-lg">
              {" "}
              <strong>Years of Experience :</strong>
              {interviewData?.jobExperience}
            </h2>
          </div>

          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3">{process.env.NEXT_PUBLIC_INFO}</h2>
          </div>
        </div>

        <div className="">
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-gray-200 rounded-lg border " />
              <Button onClick={() => setWebCamEnabled(true)} variant="ghost">
                Enable Web Cam and Audio
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end items-end">
        <Link href={"/dashboard/interview/" + params.interviewId + "/start"}>
          <Button>Start</Button>
        </Link>
      </div>
    </div>
  );
};

export default Interview;
