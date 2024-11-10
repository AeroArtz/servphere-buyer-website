
import { NextResponse } from "next/server";
import { connectDB } from "@/utils/connect";
import { auth } from '@/auth';
import { Booking } from "../../../../models/bookingModel";
import { Store } from "../../../../models/storeModel";
import mongoose from "mongoose";

export async function POST(req){
    const session = await auth();
    const email = session?.user?.email;

    const { store_id, service_id } = await req.json();

    try{
        await connectDB();

        const data = await Store.findOne(
        { _id: new mongoose.Types.ObjectId(store_id),
            'services._id': new mongoose.Types.ObjectId(service_id) },
        { _id: 0, 'services.$': 1 }
        );    

        //console.log(bookings)

        return NextResponse.json(data, { status: 200 });
    
    } catch(err){
        return NextResponse.json("error", { status: 500})
    }


} 