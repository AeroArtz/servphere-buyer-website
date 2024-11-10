"use client"
import { Calendar } from '@/components/ui/calendar';
import { DateTime } from 'luxon'
import React, { useState } from 'react'

export default function Page() {

  const [index, setIndex] = useState(-1);
  const [date, setDate] = useState(new Date());

  const timeSlots = [
    {start: "01:00 AM", end: "03:00 AM"},
    {start: "01:00 AM", end: "03:00 AM"},
    {start: "01:00 AM", end: "03:00 AM"},
    {start: "01:00 AM", end: "03:00 AM"},
    {start: "01:00 AM", end: "03:00 AM"},
    {start: "01:00 AM", end: "03:00 AM"},
    {start: "01:00 AM", end: "03:00 AM"},
    {start: "01:00 AM", end: "03:00 AM"},
    {start: "01:00 AM", end: "03:00 AM"},
    {start: "01:00 AM", end: "03:00 AM"},
    {start: "01:00 AM", end: "03:00 AM"},

  ]

  return (
    <div>
        <form>
            <h1>1:1 Boxing Session</h1>
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}

                className="rounded-md border"
            />  

            <h2 className='text-md font-semibold text-gray-600'>
                Select time Slots
            </h2>

            <div className='grid grid-cols-2 gap-3'>
                {   
                    timeSlots.map((slot, index_) =>
                    <>
                            {
                        (data.find((booking) => (booking.startTime === slot.start || booking.endTime === slot.end)) )
                        ? null 
                        :  <div 
                            onClick={()=> setIndex(index_)}
                            className={`flex items-center text-center justify-center rounded-md hover:opacity-60 ${(index >= 0 &&  index===index_) ?"bg-sky-400/75" : "bg-gray-200/75" } bg-gray-200/75 h-10 w-28 text-[9px] text-gray-500`}>
                                {`${slot.start}-${slot.end}`}
                        </div>
                    }    
                    </>   
                    )    
                }
            </div>
        </form>
    </div>
  )
}
