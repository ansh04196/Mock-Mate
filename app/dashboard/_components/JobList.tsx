import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs';
import React, { useState } from 'react'
import moment from "moment";
import { createInterview } from '@/actions/interview';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';



function JobList({ job, role }: { job: any, role: any }) {
  
  
    const { user } = useUser()
    const [isLoading, setLoading] = useState(false)
  
    const router = useRouter()
    async function handleClick() {
      setLoading(true)
      const data = {
        jobPosition: job.job_title!,
        jobDesc: role!,
        jobExperience: (job.job_required_experience.required_experience_in_months / 12)!,
        createdBy: user?.primaryEmailAddress?.emailAddress || "",
        createdAt: moment().format("DD-MM-yyyy"),
      };
      try {
        console.log("here")
        const resp = await createInterview(JSON.stringify(data),JSON.stringify(user));
        if (resp) {
          if(!resp.apiUsed){
            toast(resp.msg)
          }else{
            console.log("Inserted id", resp.result);
            if (resp.result) {
              router.push("/dashboard/interview/" + resp.result[0]?.mockId);
            } else {
              toast("Something went wrong")
            }
          }
        }
      } catch (error) {
        console.log(error)
        toast("Something went wrong")
      } finally {
        setLoading(false)
      }
    }
  
    
  return (
    
  

    <main className="mx-4 mt-12 flex justify-center">
      <div className="shdow max-w-md bg-gray-50">
        <div className="rounded-lg border-2 border-gray-900">
          <div className="flex flex-col gap-x-4 p-4 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-gray-800 bg-green-50 p-2">
              <img
                className="h-auto w-full"
                src="https://www.freepnglogos.com/uploads/tut-wuri-handayani-png-logo/vector-wuri-handayani-warna-0.png"
                alt=""
              />
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900">
                {job.job_title}
              </h4>
            </div>
          </div>
          <div className="relative border-t-2 border-gray-800 p-4">
            <div className="mr-16">
              <p className="text-xl font-xs text-gray-900">
              Location: {job.job_city}, {job.job_state}
              </p>
              <p className="">
              Experience - {job.job_required_experience.required_experience_in_months / 12} years
              </p>
            </div>
            <div className='flex justify-between flex-row'>

            <div className="mt-8 gap-2 flex justify-between">
              <Button>
                <a href={job.job_apply_link} target="_blank" rel="noopener noreferrer">
                  Apply
                </a>
              </Button>
  <div>{
    !!isLoading ? <Button disabled>Loading</Button> : <Button onClick={handleClick}>Mock Interview</Button>
  }</div>
  </div>
            </div>
            <button className="absolute top-4 right-4 rounded-lg border-2 border-gray-800 bg-gray-100 p-2 text-gray-900 hover:bg-green-100 hover:text-green-700">
              <svg
                aria-label="hidden"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                />
              </svg>
              <span className="sr-only">Bookmark</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default JobList;
