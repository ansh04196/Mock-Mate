"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import QuestionForm from "./questionForm.ts/page";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

export default function Component() {
  const [data,setData] = useState<any>(null);
  const {user} = useUser()
  useEffect(()=>{
    async function fetchData(){
      if(!user){
        return;
      }
      const data = await axios.post('/api/quiz/fetch/all',{
        userId: user.primaryEmailAddress?.emailAddress!
      });
      setData(data.data.data)
      console.log(data)
    }
    fetchData()
  },[user])
  return (
    <>
      <QuestionForm />
      <div className="mx-auto">
        <div className=" text-2xl mt-8 font-bold">Attempted Quizes</div>
        <table className="mt-8">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    QuizId
                </th>
                <th scope="col" className="px-6 py-3">
                    Topic
                </th>
                <th scope="col" className="px-6 py-3">
                    Difficulty
                </th>
                <th scope="col" className="px-6 py-3">
                    Points
                </th>
            </tr>
        </thead>
        <tbody className="mt-4">

        { data && data.map((elem: any)=>(
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={elem.quizId}>
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {elem.quizId}
                      </th>
                      <td className="px-6 py-4">
                          {elem.Topic}
                      </td>
                      <td className="px-6 py-4">
                          {elem.difficulty}
                      </td>
                      <td className="px-6 py-4">
                          {elem.points}
                      </td>
                  </tr>
      
        
        ))
      }
      </tbody>
      </table>
      </div>
    </>
  );
}
