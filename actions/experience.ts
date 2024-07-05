"use server"

import { db } from "@/utils/db";
import { interviewExperience } from "@/utils/schema";
import { or, ilike, desc } from "drizzle-orm";

export const getExperiences = async(searchPattern: string)=>{
  try {
    console.log(searchPattern)
    // if(searchPattern?.trim() === ""){
        const result = await db
        .select()
        .from(interviewExperience)
        .orderBy(desc(interviewExperience.createdAt));
        console.log(result)
        return {result  : result}
    // }
    // else{
    //     const result = await db
    //     .select()
    //     .from(interviewExperience)
    //     .where(or(
    //         ilike(interviewExperience.title, searchPattern),
    //         ilike(interviewExperience.content, searchPattern)
    //     ))
    //     .orderBy(desc(interviewExperience.createdAt));
    //     console.log(result)
    //     return {result  : result}
    // }
  } catch (error) {
    console.error(error)
  }

}


export const createExperience = async(
    userName: string,
    userEmail: string,
    title: string,
    content: string
)=>{
    try {
        const result = await db.insert(interviewExperience).values({
            title,
            content,
            createdAt: new Date(),
            userName,
            userEmail
        })

        return result
    } catch (error) {
      console.error(error)
    }
  
  }

