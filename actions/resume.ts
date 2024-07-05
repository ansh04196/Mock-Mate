"use server"

import { chatSession } from "@/utils/GeminiAi";


export const resumeAnalyse = async(resume: string, jobdesc: string)=>{
    try {
        
        if (!resume || !jobdesc) {
          return { message: "Missing required parameters" };
        }
    
        const InputPrompt = `You are InterviewBOT from now. Prompt for InterviewBOT: You are assigned a task to review the resume of me and match it with the provided job description. 
        
        Job Description: ${jobdesc}

        Resume: ${resume}

        The answer will be given in JSON format:
        {
            score: "rating of resume"
            comment: "comment on the resume"
        }

        Guidelines:
        1. Must stick to the given JSON format for output
        2. rating of resume with respect to the job description in a scale of 0 to 10
        3. comment on the resume of me based on job description, suggest me if improvement needed and what to improve. If resume is fit for the job description state it. Highlight the strong points if there is. Highlight the improvements if it needed.
        `;
    
        const result = await chatSession.sendMessage(InputPrompt);
        console.log(result.response.text())
    
        const jsonResult = JSON.parse(
          result.response.text().replace("```json", "").replace("```", "")
        );
    
        const score = jsonResult?.score;
        const comment = jsonResult?.comment;

        console.log({score, comment});
    
         
        return {score, comment};
      } catch (error) {
        console.error("API request failed:", error);
        return { message: "Error occurred" };
      }
}

