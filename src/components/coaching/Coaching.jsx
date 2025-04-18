"use client"
import { Calendar } from '@/components/ui/calendar';
import { DateTime } from 'luxon'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';


import {
    Dialog,
    DialogContent,
  
    DialogDescription,
  
    DialogHeader,
  
    DialogTitle,
  
    DialogTrigger,
  } from "@/components/ui/dialog";
import { toast } from 'sonner';
import { createBooking } from '@/actions/createBooking';
import { useRouter } from 'next/navigation';

const fetcher = ([ url, service_id, date ]) => fetch(url, {
  method: "POST",
  body: JSON.stringify({
      service_id: service_id,
      date : date
  },
  {cache: 'no-store'}
  )
}).then(res => res.json())
export default function Coaching({store_id, service_id}) {

    const router = useRouter();
    const [date, setDate] = useState(new Date());

    const [timeSlots, setTimeSlots] = useState([]);
    const [message , setMessage] = useState('')
  
    const [index, setIndex] = useState(-1);
  
    // SET STATE VARIALBLE CHECKOUT DATA ON MOUNT AND THEME COLOR
    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            let res = await fetch("/api/get-time-slots",
            {   
                method: 'POST',
                body: JSON.stringify({
                    store_id: store_id,
                    service_id : service_id
                }),
                cache : "no-store"
            });

            res = await res.json()

            setTimeSlots(res)

        }
    
        // call the function
        fetchData()
        // make sure to catch any error
        .catch(console.error);
    }, [])

    const { data, error, isLoading } = useSWR(
          
      [
          '/api/getAllBookings',
          "dd1ca28c-5cb2-429a-8619-8003822e20bf",
          DateTime.fromJSDate(date).toFormat('yyyy-MM-dd'),   
      ],
  
      fetcher,
      { 
          refreshInterval: 5000
      })
  
      console.log(data)

      const handleChange = (e) => {
        setMessage(e.target.value)
    }
  
      let newData = []

  return (
    <>
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

        <div>
            <div className='grid grid-cols-3 mt-5 gap-3'>
                {   
                
                    (timeSlots.length <= 0) ? null : 
                    
                    timeSlots[date.getDay()]?.map((slot, index_) =>
                    
                    <>
                        {
                            (data?.find((booking) => (booking.startTime === slot.start || booking.endTime === slot.end)) )
                            ? null 
                            :  <div 
                                onClick={()=> setIndex(index_)}
                                className={`flex font-medium items-center text-center justify-center rounded-md hover:opacity-60 ${(index >= 0 &&  index===index_) ?`bg-red-400/75` : "bg-gray-200/75" } bg-gray-200/75 h-10 w-32 text-[9px] ${(index >= 0 &&  index===index_) ?"text-white" : "text-gray-500" } text-gray-500`}>
                                    {`${slot.start}-${slot.end}`}
                            </div>

                        }    
                    </> 
                        
                    )    

                }
            </div>

            <Dialog>
                <DialogTrigger asChild>
                <button className='bg-red-400 w-full p-2.5 rounded-md text-md font-semibold text-white mt-8' type='submit'>Book Appointment</button>

                </DialogTrigger>
            
                <DialogContent className="sm:max-w-[475px]">

                    <DialogHeader>
                        <DialogTitle>Book Your Appointment</DialogTitle>
                        <DialogDescription>
                            Any additional message you may want to leave
                        </DialogDescription>
                    </DialogHeader>
                    <form  action= { async () => {
                        if (index >=0){
                            const toastID = toast.loading("Creating Booking");

                            const error = await createBooking({
                                store_id: store_id,
                                service_id : service_id,
                                date : DateTime.fromJSDate(date).toFormat('yyyy-MM-dd'),
                                message : message,
                                timeData :timeSlots[date.getDay()][index]

                            })

                            if(!error){
                
                                // REFRESH PAGE AFTER LOGIN
                                toast.success("Booking successful", {
                                    id: toastID
                                });
                                router.refresh();
                            }
                
                            else{
                                toast.error(error, {
                                    id: toastID
                                })
                            }
                        }
                    }}>
                    <textarea className='w-full h-16 p-5' onChange={handleChange} type='text' name='additional' placeholder='Additional note'/>
                    <button className='bg-red-400 w-full p-2.5 rounded-md text-md font-semibold text-white mt-8' type='submit'>Book Appointment</button>

                    </form>
                
            
                </DialogContent>
            </Dialog>
        </div>

    </>
  )
}

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
