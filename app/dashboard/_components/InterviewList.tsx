"use client";

import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard';
import { getInterviewListT } from '@/actions/dashboard';


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


const InterviewList = () => {

    const {user} = useUser();
    const [interviewList, setInterviewList] = useState<InterviewItem[]>([]);

    useEffect(() => {
        user&&GetInterviewList();
    }, [user])

    const GetInterviewList = async () => {
        if(user?.primaryEmailAddress?.emailAddress) {
            const {result} = await getInterviewListT(user.primaryEmailAddress.emailAddress)

        console.log(result);
        setInterviewList(result);
        }
    }
    
  return (
    <div>
        <h2 className="font-medium text-xl">Previous Mock Interview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {interviewList.map((interview, index) => (
                    <InterviewItemCard key={index} interview={interview} />
                ))}
        </div>
    </div>
  )
}

export default InterviewList