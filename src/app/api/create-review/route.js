import { NextResponse } from "next/server";
import { auth } from '@/auth';
import { db } from "@/db";
import { reviews } from "@/db/schema/reviews";

export async function POST(req){

    const session = await auth();

    const { store_id, service_id, content, rating} = await req.json();

    console.log(rating)
    console.log(typeof(rating))
    try {

        await db.insert(reviews).values({
            serviceId : service_id,
            clientId : session?.user?.id,
            content: content,
            ratings : rating
        })

          
      
        return NextResponse.json("Success", {status : 200});


    } catch(error){
        return NextResponse.json("Unexpected error occurred", {status : 500});
    }

}