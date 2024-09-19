
import { NextResponse } from "next/server";
import { connectDB } from "@/utils/connect";
import { auth } from '@/auth';
import { Booking } from "../../../../models/bookingModel";

export async function POST(req){
    //const session = await auth();
    //const email = session?.user?.email;

    const { store_id, service_id, date} = await req.json();

    try{
        await connectDB();

        const bookings = await Booking.find({
            store_id : store_id,
            service_id : service_id,
            date : date            
        }).select('startTime endTime date');; 

        //console.log(bookings)

        return NextResponse.json(bookings);
    
    } catch(err){
        return NextResponse.json("error", { status: 500})
    }


} 