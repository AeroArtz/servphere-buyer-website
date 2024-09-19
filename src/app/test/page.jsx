"use client"
import { Calendar } from '@/components/ui/calendar';
import { DateTime } from 'luxon'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
  
    DialogTrigger,
  } from "@/components/ui/dialog";

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
    <div className='bg-zinc-50 w-full h-full'>

        <Dialog>
            <DialogTrigger asChild>
                <button>
                    CLICK THIS
                </button>
            </DialogTrigger>
        
            <DialogContent className="sm:max-w-[425px]">
                <form >
                    <h1 className='text-2xl font-semibold text-gray-600/75'>1:1 Boxing Session</h1>
                    <div className='w-[16rem]'>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        width={20}                        
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}

                        className="rounded-md border mt-5"
                    />  
                    </div>

                    <h2 className='text-md font-semibold mt-9 text-gray-600'>
                        Select time Slots
                    </h2>

                    <div className='grid grid-cols-3 mt-5 gap-y-3'>
                        {   
                            timeSlots.map((slot, index_) =>
                            
                            <div 
                                    onClick={()=> setIndex(index_)}
                                    className={`flex items-center text-center justify-center rounded-md hover:opacity-60 ${(index >= 0 &&  index===index_) ?"bg-sky-400/75" : "bg-gray-200/75" } bg-gray-200/75 h-10 w-28 text-[9px] text-gray-500`}>
                                        {`${slot.start}-${slot.end}`}
                                </div>
                            
                            )    
                        }
                    </div>
                </form>

            </DialogContent>
        </Dialog>
        
      
    </div>
  )
}
