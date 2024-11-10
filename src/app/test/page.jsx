"use client"
import { Calendar } from '@/components/ui/calendar';
import { DateTime } from 'luxon'
import React, { useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"

import {
    Dialog,
    DialogContent,
  
    DialogTrigger,
  } from "@/components/ui/dialog";
import Navbar from '@/components/Navbar';

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
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
    <div className='flex w-full h-full'>

                <Navbar/>
                <div className='bg-white px-10 w-full flex flex-col space-x-10 mt-16'>
           
                    <h1 className='text-3xl ml-10 text-gray-600 font-bold'>1:1 Coaching Session</h1>

                    <p className='text-sm text-gray-400 mt-3'>In this 1:1 training you will learn how to take your skills to the next level withe Andrew Tate</p>

                    <div className='flex w-3/4 p-10 mt-10 justify-center space-x-6 rounded-lg border border-gray-300'>

                      <div className=''>
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            width={20}                        
                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}

                            className="rounded-md border mt-5"
                        />  
                      </div>

                      <div className=''>
                        <div className='grid grid-cols-3 mt-5 gap-3'>
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


                        <Dialog>
                          <DialogTrigger asChild>
                          <button className='bg-red-400 w-full p-2.5 rounded-md text-md font-semibold text-white mt-8' type='submit'>Book Appointment</button>

                          </DialogTrigger>
                      
                          <DialogContent className="sm:max-w-[475px]">
                              <form>
                                <textarea className='' type='text' placeholder='Additional note'>

                                </textarea>
                              </form>
                            
                      
                          </DialogContent>
                        </Dialog>
                      </div>

                    </div>

                    <div className='mt-10 pb-16 w-3/4'>
                      <div className="grid gap-4">
                    <h2 className="text-2xl font-bold">Customer Reviews</h2>
                    <div className="grid gap-6">
                      <div className="flex gap-4">
                        <Avatar className="w-10 h-10 border">
                          <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">Sarah Johnson</h3>
                            <div className="flex items-center gap-0.5">
                              <StarIcon className="w-5 h-5 fill-primary" />
                              <StarIcon className="w-5 h-5 fill-primary" />
                              <StarIcon className="w-5 h-5 fill-primary" />
                              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            I've been experimenting with my LuminaCook Multi-Function Air Fryer for a few weeks now, and it's been
                            a versatile addition to my kitchen. It's great for making crispy fries, chicken wings, and even some
                            healthier options.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <Avatar className="w-10 h-10 border">
                          <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">Alex Smith</h3>
                            <div className="flex items-center gap-0.5">
                              <StarIcon className="w-5 h-5 fill-primary" />
                              <StarIcon className="w-5 h-5 fill-primary" />
                              <StarIcon className="w-5 h-5 fill-primary" />
                              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            I recently purchased the SparkleShine Home Cleaning Robot, and it has been a game-changer in my life.
                            I used to spend hours every weekend cleaning my house, but now I can simply turn on this little robot
                            and let it do the work. It's incredibly efficient, navigating around obstacles with ease. The only
                            reason I didn't give it a perfect 5-star rating is that it occasionally gets stuck under low
                            furniture. Overall, it's been a great addition to my home, saving me time and effort.
                          </p>
                        </div>
                      </div>
                    </div>
                      </div>
                      
                    
                    </div>
                </div>

         
        
      
    </div>
  )
}
