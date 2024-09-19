'use server'
import { auth } from '@/auth';
import { connectDB } from "../utils/connect";
import { Booking } from '../../models/bookingModel';
import { User } from 'lucide-react';

export async function createBooking(data) {
    const session = await auth();

    console.log(data)
    await connectDB();

    try{
      
    
    // Check if the slot is available based on ServiceID, startime and date
    const existingBooking = await Booking.find({
        
        store_id: data.store_id,
        service_id: data.service_id,
        startTime: data.timeData.start,
        endTime: data.timeData.end,
        date: data.date
    });

    console.log(existingBooking)
 
    if (existingBooking.length > 0) 
      console.log("FAILURE")
      return "Sorry for the inconvenience! This slot is no longer available. Please try again"
  
   
   /*
      await Booking.create({
        store_id: data.store_id,
        service_id: data.service_id,
        startTime: data.timeData.start,
        endTime: data.timeData.end,
        date : data.date,
        clientEmail : session?.user?.email,
        clientName: session?.user?.name,
        serviceName: data.title,
        status: "pending"
    })

      */
    
    
    
  } catch(error){
    return 'An unexpected error occurred.'
  }
     


}
