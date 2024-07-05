"use server"

import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";

export const getFeedback = async(interviewId: any)=>{
  try {
      const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdref, interviewId))
      .orderBy(UserAnswer.id);
      return {result  : result}
  } catch (error) {
    throw new Error
  }

}