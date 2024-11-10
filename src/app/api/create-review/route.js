import { NextResponse } from "next/server";
import { connectDB } from "@/utils/connect";
import { auth } from '@/auth';
import { Store } from "../../../../models/storeModel";
import mongoose from "mongoose";

export async function POST(req){

    const session = await auth();

    const { store_id, service_id, content, rating} = await req.json();

    try {

        await connectDB();

        /*

        // PASS ID , DATA WHICH IS DATE AND START TIME , DATE WHICH IS  DATE.TOSTRING()
        await Booking.create({
            store_id: store_id,
            service_id: service_id,
            startTime: startTime,
            endTime: endTime,
            date : date,
            clientEmail : session?.user?.email,
            clientName: session?.user?.name,
            serviceName: title,
            status: "pending"
        })

        */

        await Store.updateOne(
            { 
                _id: new mongoose.Types.ObjectId(store_id),
                "services._id": new mongoose.Types.ObjectId(service_id)
            },
            {
              $push: {
                "services.$.reviews": {
                  clientName: session?.user?.name,
                  clientEmail: session?.user?.email,
                  content: content,
                  rating : rating
                }
              }
            }
          );

          
        
        
    
        return NextResponse.json("Success", {status : 200});


    } catch(error){
        return NextResponse.json("Unexpected error occurred", {status : 500});
    }

}