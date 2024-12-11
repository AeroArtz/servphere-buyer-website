'use server'
import { auth } from '@/auth';
import { db } from '@/db';
import { bookings } from '@/db/schema/bookings';

export async function createDigitalBooking(data) {
    const session = await auth();

    try{
            
      console.log(data)
   
    await db.insert(bookings).values({
      serviceId :  data.service_id, 
      clientId : session?.user?.id,
      type: data.type,
      status: "unpaid"
    })

         
    
  } catch(error){
    return 'An unexpected error occurred.'
  }
     
}
