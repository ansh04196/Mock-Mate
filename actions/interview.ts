"use server";

import { chatSession } from "@/utils/GeminiAi";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { isPaid } from "./payment";

export const createInterview = async (rawdata: any,user: any) => {
  console.log(rawdata,user)
  try {
    user = JSON.parse(user)
    const data = JSON.parse(rawdata);
    const InputPrompt =
      "Job position: " +
      data.jobPosition +
      ", Job Description :" +
      data.jobDesc +
      ", Years of Experience : " +
      data.jobExperience +
      ", Depends on Job Position, Job Description, and Year of experience give us " +
      10 +
      " most asked interview questions along with answer in json format. Give the question and answer field in json format.";

      const havePaid = await isPaid(JSON.stringify(user));
  
      if(!havePaid.possible){
        return {apiUsed: false,msg: "Your Api Key is exhausted"}
      }
    console.log(InputPrompt)
    const resp = await chatSession.sendMessage(InputPrompt);
    const MockJsonResp = resp.response
      .text()
      .replace("```json", "")
      .replace("```", "");
      console.log(resp)
    if (MockJsonResp) {
      const datawithGemini = {
        ...data,
        jsonMockResp: MockJsonResp,
        mockId: uuidv4(),
      };
      const result = await db
        .insert(MockInterview)
        .values(datawithGemini)
        .returning({ mockId: MockInterview.mockId });
      return { result: result,apiUsed: true,msg: "Success" };
    }
  } catch (error) {
    // throw new Error();
    console.log(error);
  }
};
