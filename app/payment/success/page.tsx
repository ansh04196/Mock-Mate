"use client"
import { UpdatePayment } from "@/actions/payment";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Success = () => {
  const {user} = useUser()
  console.log(user)
  const router = useRouter();
  useEffect(()=>{
    console.log("This is the ", user)
    if(user)
    UpdatePayment(user.primaryEmailAddress?.emailAddress!).then(()=>{
      router.push('/dashboard')
    })
  },[user])
  return (
    <div>
        <h2 className="font-bold text-2xl">Processing Payment</h2>
    </div>
  )
}

export default Success;