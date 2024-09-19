
import { NextResponse } from "next/server";
import { connectDB } from "@/utils/connect";
import { auth } from '@/auth';
import { Store } from "../../../../models/storeModel";

export async function GET(req){
 
    // GET USER INPUT
    const { user_input} = await req.json();

    try{
        await connectDB();

        // GET SPECIFIC FIELDS
        const bookings = await Store.find({
            username: user_input          
        }).select('img bio username');; 

        //console.log(bookings)

        return NextResponse.json(bookings);
    
    } catch(err){
        return NextResponse.json("error", { status: 500})
    }


} 