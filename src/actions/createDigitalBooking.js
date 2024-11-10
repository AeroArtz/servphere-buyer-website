'use server'
import { auth } from '@/auth';
import { connectDB } from "../utils/connect";
import { Booking } from '../../models/bookingModel';
import { User } from 'lucide-react';

export async function createDigitalBooking(data) {
    const session = await auth();

    console.log('REACHED')
    await connectDB();

    try{
           
      await Booking.create({
        store_id: data.store_id,
        service_id: data.service_id,   
        clientEmail : session?.user?.email,
        clientName: session?.user?.name,
        serviceName: data.title,
        status: "unpaid"
    })

         
    
  } catch(error){
    return 'An unexpected error occurred.'
  }
     
}
