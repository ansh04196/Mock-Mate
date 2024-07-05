"use server"

import { db } from "@/utils/db"
import { UserData } from "@/utils/schema"
import { eq } from "drizzle-orm"
import { v4 as uuidv4 } from "uuid";


export async function isPaid(user: any){

    if(!user){
        throw new Error
    }
    user = JSON.parse(user)

    console.log(user)
    let data;
    console.log(user.id)
    const dataToInsert = {
        isPaidUser: false,
        apiUsed: 5,
        username: (user.firstName + user.lastName),
        email: user.primaryEmailAddress?.emailAddress
    }
    console.log(dataToInsert)
    const exist =  await db.select().from(UserData).where(eq(UserData.email,user.primaryEmailAddress?.emailAddress))
    console.log(exist)
    if(!exist || exist.length === 0){
        data = await db.insert(UserData).values(dataToInsert)
        console.log("The data is ", data)
        return {data: data, possible: true}

    }
    else{
        // if(exist.)
        if(exist[0] && exist[0].isPaidUser){
            return {data: exist, possible: true}
        }
        else if(exist[0] && exist[0].apiUsed! > 0){
            const dataFinal = db.update(UserData).set({apiUsed: exist[0].apiUsed! -1}).where(eq(UserData.id,exist[0].id))
            console.log("This is the updated data",dataFinal)
            return {data: dataFinal,possible: true}
        }else{
            return {data: exist,possible: false}
        }
    }

}

export async function UpdatePayment(email:string) {
    console.log(email)
    
    if(email !== null){
        const dbData = await db.select().from(UserData).where(eq(UserData.email,email))
        console.log(dbData)
    }
    const data = await db.update(UserData).set({isPaidUser: true}).where(eq(UserData.email,email)).returning({isPaid: UserData.isPaidUser})
    console.log(data)
    return {msg:"Successfully Paid"}
    
}