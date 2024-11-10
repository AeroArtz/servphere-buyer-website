'use client'

import React from 'react'
import { toast } from 'sonner';
import { createDigitalBooking } from '@/actions/createDigitalBooking';
import { useRouter } from 'next/navigation';

export default function Digital({
  store_id,
  service_id,
  title, 
  subtitle, 
  price, 
  buttonCTA
 }) {
  const router = useRouter();


  return (
    <form  action= { async () => {
   
          const toastID = toast.loading("Creating Booking");

          const error = await createDigitalBooking({
              service_id: service_id,
              store_id: store_id,
              title:title,

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
        <h1 className='text-2xl font-semibold text-gray-600/75'>
          {title}
        </h1>

        <h3 className='text-md text-gray-500'>
          {subtitle}
        </h3>

        <h4 className='text-md font-semibold text-gray-600/75'>{price}</h4>

        <button type='submit' className='bg-red-400 hover:opacity-60 active:opacity-60 py-2 w-full rounded focus:outline-none focus:shadow-outline mt-8 mb-10'>
          <h4 className='text-sm text-white'>{buttonCTA}</h4>            
        </button>
    </form>
  )
}
