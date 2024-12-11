
import { NextResponse } from "next/server";

import { db } from "@/db";
import { bookings } from "@/db/schema/bookings";
import { sql } from "drizzle-orm";

export async function POST(req){
    //const session = await auth();
    //const email = session?.user?.email;

    const { service_id, date} = await req.json();

    try{

        const data = await db.select().from(bookings).where(sql`${bookings.type}= ${'coaching'} and ${bookings.serviceId}=${service_id} and ${bookings.date_of_booking}=${date}`)

        return NextResponse.json(data , { status: 200 });    

    } catch(err){
        return NextResponse.json("error", { status: 500})
    }


} 