"use client"
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React from 'react'

function Pricing() {
    const {user} = useUser()
    const router = useRouter()
    async function handlePay(){
        if(!user){
            router.push('/sign-in')
            return;
        }
        fetch("http://localhost:3000/api/payment", {
            method: "POST",
        })
        .then(res => {
            console.log(res);
            if (res.ok) return res.json()
                return res.json().then(json => Promise.reject(json))
        })
        .then(({ url, message }) => {
            if(message === "success") window.location = url
        })
        .catch(e => {
            console.error(e.error)
        })
    }
  return (<div className="">
    <div>
        <h2 className="text-3xl font-bold tracki text-center mt-12 sm:text-5xl ">Pricing</h2>
        <p className="max-w-3xl mx-auto mt-4 text-xl text-center ">Get started on our free plan and upgrade when you are
            ready.</p>
    </div>
    <div className="mt-16 container space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8">
        <div className="relative p-8  border border-gray-200 rounded-2xl shadow-sm flex flex-col">
            <div className="flex-1">
                <h3 className="text-xl font-semibold ">Free</h3>
                <p className="mt-4 flex items-baseline ">
                    <span className="text-5xl font-extrabold tracking-tight">$0</span><span className="ml-1 text-xl font-semibold">/month</span>
                </p>
                <p className="mt-6 ">You just want to discover</p>
                <ul role="list" className="mt-6 space-y-6">
                    <li className="flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg><span className="ml-3 ">5 Credits</span></li>
                    <li className="flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg><span className="ml-3 ">Resume Checker</span></li>
                    <li className="flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg><span className="ml-3 ">Mock Interview </span></li>
                        <li className="flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg><span className="ml-3 ">Online Assesment </span></li>
                        <li className="flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg><span className="ml-3 ">Job Search </span></li>
                </ul>
            </div><a
                className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
                href="/dashboard">Signup for free</a>
        </div>
        <div className="relative p-8  border border-gray-200 rounded-2xl shadow-sm flex flex-col">
            <div className="flex-1">
                <h3 className="text-xl font-semibold ">MockMate Pro</h3>
                <p
                    className="absolute top-0 py-1.5 px-4 bg-emerald-500 text-white rounded-full text-xs font-semibold uppercase tracking-wide  transform -translate-y-1/2">
                    Most popular</p>
                <p className="mt-4 flex items-baseline ">
                    <span className="text-5xl font-extrabold tracking-tight">$5</span><span className="ml-1 text-xl font-semibold">/month</span>
                </p>
                <p className="mt-6 ">You want to learn and practice more</p>
                <ul role="list" className="mt-6 space-y-6">
                    <li className="flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg><span className="ml-3 ">Unlimited credits</span></li>
                        <li className="flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg><span className="ml-3 ">Resume Checker</span></li>
                    <li className="flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg><span className="ml-3 ">Mock Interview </span></li>
                        <li className="flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg><span className="ml-3 ">Online Assesment </span></li>
                        <li className="flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg><span className="ml-3 ">Job Search </span></li>
                </ul>
            </div><a
                className="bg-emerald-500 text-white  hover:bg-emerald-600 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium" onClick={handlePay}>Signup for free</a>
        </div>
    </div>

</div>
  )
}

export default Pricing