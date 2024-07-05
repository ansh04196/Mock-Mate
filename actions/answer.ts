"use server"

import { db } from "@/utils/db"
import { UserAnswer } from "@/utils/schema"

export const updateAnswer = async(rawdata: any)=>{
   try {
     const data = JSON.parse(rawdata)
     const result = await db.insert(UserAnswer).values(data)
     console.log(result)
     return {result : result}
   } catch (error) {
    throw new Error
   }
}