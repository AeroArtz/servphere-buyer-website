import { NextResponse } from "next/server";
import { db } from "@/db";
import { sql } from "drizzle-orm";
import { services } from "@/db/schema/services";

export async function POST(req){

    const {store_id, service_id} = await req.json();

    try{

        let servicesData = await db.execute(sql`select ${services.availability} from ${services} where ${services.store_id}=${store_id} and ${services.id}=${service_id}`);        
      
        let availabilityData = servicesData?.rows[0]?.availability;
       
        const slots = availabilityData?.timings?.map((elm,index) =>
            getTimeSlots(
                `${elm.opening_hour}:${elm.opening_minute} ${elm.opening_AM_or_PM}`,
                `${elm.closing_hour}:${elm.closing_minute} ${elm.closing_AM_or_PM}`,
                availabilityData?.duration,
                availabilityData?.breakBefore,
                availabilityData?.breakAfter,
            )

        )


        
        return NextResponse.json(slots, {status: 200});

    } catch(err){
        return NextResponse.json({error: err.message})
    }
} 

function getTimeSlots(openingTime, closingTime, meetingDuration, breakBefore, breakAfter) {
    const parseTime = (time) => {
      const [timePart, period] = time.split(' ');
      let [hours, minutes] = timePart.split(':').map(Number);
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      return { hours, minutes };
    };
  
    const formatTime = ({ hours, minutes }) => {
      const period = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
    };
  
    const addMinutes = (time, minutesToAdd) => {
      let { hours, minutes } = time;
      minutes += minutesToAdd;
      while (minutes >= 60) {
        minutes -= 60;
        hours += 1;
      }
      return { hours, minutes };
    };
  
    const opening = parseTime(openingTime);
    const closing = parseTime(closingTime);
    const slots = [];
  
    let currentTime = opening;
  
    while (true) {
      const startSlot = addMinutes(currentTime, breakBefore);
      const endSlot = addMinutes(startSlot, meetingDuration);
      const nextStartTime = addMinutes(endSlot, breakAfter);
  
      if (endSlot.hours > closing.hours || (endSlot.hours === closing.hours && endSlot.minutes > closing.minutes)) {
        break;
      }
  
      slots.push({ start: formatTime(startSlot), end: formatTime(endSlot) });
      currentTime = nextStartTime;
    }
  
    return slots;
}