'use client'

import React from 'react'
import { toast } from "sonner"
import { createDigitalBooking } from '@/actions/createDigitalBooking';
import { useRouter } from 'next/navigation';

export default function DigitalFormSubmission({
  store_id,
  service_id,
  title, 
 }) {
  const router = useRouter();


  return (
    <form action= { async () => {
   
        const toastID = toast.loading("Creating Booking");

        const error = await createDigitalBooking({
            service_id: service_id,
            store_id: store_id,
            title: title,

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

      }}   

    className='space-y-4'>
        <button type='submit' className="w-full text-gray-50 font-medium bg-red-400 py-2">
            Buy Now
        </button>
    </form>
  )
}
