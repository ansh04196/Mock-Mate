import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface InterviewItem {
  id: number;
  jsonMockResp: string;
  jobPosition: string;
  jobDesc: string;
  jobExperience: string;
  createdBy: string;
  createdAt: string;
  mockId: string;
}

interface InterviewItemCardProps {
  interview: InterviewItem;
}

const InterviewItemCard: React.FC<InterviewItemCardProps> = ({ interview }) => {
  const router = useRouter();
  const onStart = () => {
    router.push('/dashboard/interview/'+interview?.mockId)
  }
  const onFeedback = () => {
    router.push('/dashboard/interview/'+interview?.mockId+"/feedback");
  }

  return (
    <div className="border p-4 mb-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-blue-500">
        Position / Role : {interview.jobPosition}
      </h3>
      {/* <p className="text-sm text-gray-600">Experience: {interview.jobExperience}</p> */}
      <p className="mt-2">Interview Description: {interview.jobDesc}</p>
      <p className="text-xs text-gray-500 mt-2">
        Created at: {interview.createdAt}
      </p>

      <div className="flex justify-between mt-4 gap-5">
        <Button size="sm" variant="outline" className="w-full" onClick={onFeedback}>
          Feedback
        </Button>

        <Button size="sm" className="w-full" onClick={onStart}>
          Start
        </Button>
      </div>
    </div>
  );
};

export default InterviewItemCard;
