'use server'
import { auth } from '@/auth';

import { bookings } from '@/db/schema/bookings';
import { db } from '@/db';
import { sql } from 'drizzle-orm';

export async function createBooking(data) {

    try{
      const session = await auth();
      
      const existingBooking = await db.select().from(bookings).where(sql`${bookings.type}=${'coaching'} and ${bookings.serviceId}=${data.service_id} and ${bookings.startTime}=${data.timeData.start} and ${bookings.endTime}=${data.timeData.end} and ${bookings.date_of_booking}=${data.date}`)
  
      if (existingBooking.length > 0) 
        return "Sorry for the inconvenience! This slot is no longer available. Please try again"

      await db.insert(bookings).values({
        serviceId: data.service_id,
        clientId : session?.user?.id,
        type: 'coaching',
        startTime: data.timeData.start,
        endTime: data.timeData.end,
        date_of_booking: data.date,
        status: "pending"

      })
    
  } catch(error){
    console.log(error)
    return 'An unexpected error occurred.'
  }
     


}
