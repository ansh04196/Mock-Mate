"use server"
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";

export const getInterviewDetails = async(interviewId: any) =>{
    const result = await db
    .select()
    .from(MockInterview)
    .where(eq(MockInterview.mockId, interviewId));
    if(!result){
        throw new Error('error nice')
    }
    return {
        result : result
    }
}

export const getInterviewListT = async (emailAddress: any,) => {
    if(emailAddress) {
        const result = await db.select()
    .from(MockInterview)
    .where(eq(MockInterview.createdBy, emailAddress))
    .orderBy(desc(MockInterview.id))
    return {result : result}
    }
    throw new Error
}