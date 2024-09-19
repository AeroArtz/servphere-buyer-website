'use client'
import { createBooking } from '@/actions/createBooking';
import { Calendar } from '@/components/ui/calendar';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { cache, useEffect, useState } from 'react'
import { toast } from 'sonner';
import useSWR from 'swr';
import { DateTime } from 'luxon';


const fetcher = ([ url, store_id, service_id, date ]) => fetch(url, {
    method: "POST",
    body: JSON.stringify({
        store_id: store_id,
        service_id: service_id,
        date : date
    },
    {cache: 'no-store'}
    )
}).then(res => res.json())

export default function page() {

    // GET PARAMETERS FROM CURRENT URL 

    const router = useRouter();
    const params = useParams();

    const searchParams = useSearchParams()

    const title = searchParams.get('title')

    // STATE VARIABLE TO STORE AVAILABILITY DATA
    const [timeSlots, setTimeSlots] = useState([]);
    const [themeColor, setThemeColor] = useState('#000000');

    // INDEX OF CURRENTLY SELECTED TIME SLOT

    const [index, setIndex] = useState(-1);

    const [date, setDate] = useState(new Date());


    // SET STATE VARIALBLE CHECKOUT DATA ON MOUNT AND THEME COLOR
    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            let res = await fetch("/api/get-time-slots",
            {   
                method: 'POST',
                body: JSON.stringify({
                    store_id: params.store_id,
                    service_id : params.service_id
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


      /*
      const { dat, error, isLoading } = useSWR(
        
        [
            '/api/getAllBookings',
            params.store_id,
            params.service_id,
            (timeSlots?.length > 0) ? timeSlots[date.getDay()][index]?.start : "",
            (timeSlots?.length > 0) ? timeSlots[date.getDay()][index]?.end : "",
            `${DateTime.fromJSDate(date).toFormat('yyyy-MM-dd')}T00:00:00.000+00:00`,

        ],
        fetcher,
        { 
            refreshInterval: 5000
        })

     
    if (!isLoading) 
        console.log(dat)

        */

        const { data, error, isLoading } = useSWR(
        
            [
                '/api/getAllBookings',
                params.store_id,
                params.service_id,
                `${DateTime.fromJSDate(date).toFormat('yyyy-MM-dd')}T00:00:00.000+00:00`,    
            ],
    
        fetcher,
        { 
            refreshInterval: 3000
        })
    
        if (!isLoading) console.log(data)

   
  return (
    <div className='flex h-full w-full'>
    {/* CHECK WHETHER API FETCHED OR NOT */}
    {   (timeSlots.length <= 0) ? null : 
            <div>

                <form
                    action= { async () => {
                        if (index >=0){
                            const toastID = toast.loading("Logging in");

                            const error = await createBooking({
                                service_id: params.service_id,
                                store_id: params.store_id,
                                date : DateTime.fromJSDate(date).toFormat('yyyy-MM-dd'),
                                title:title,
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
                    }}
                >
                    <h1 className='text-black text-lg'>{title}</h1>


                    <div className='flex flex-col h-full w-full justify-center items-center'>
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}

                            className="rounded-md border"
                        />  

                        <div className='flex flex-col space-y-3 mt-6'>
                            <h2 className='text-md font-semibold text-gray-600'>
                                Select time Slots
                            </h2>

                            <div className='grid grid-cols-2 gap-3'>

                            {   (timeSlots.length <= 0) ? null : 
                                
                                timeSlots[date.getDay()]?.map((slot, index_) =>
                                
                               <>
                                     {
                                    (data?.find((booking) => (booking.startTime === slot.start || booking.endTime === slot.end)) )
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
   
                                <button type='submit' className='bg-teal-500/75 hover:bg-teal-300/75 py-2 w-full rounded focus:outline-none focus:shadow-outline mt-6 mb-10'>
                                        <h4 className='text-sm text-white'>Book Appointment</h4>            
                                </button>
                         
                            <div className='pb-16'>

                            </div>
                        </div>
                    </div> 
                </form>
            </div>
    }

</div>
  )
}
