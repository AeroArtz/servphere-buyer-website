
import React from 'react'
import Navbar from '@/components/Navbar';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { connectDB } from '@/utils/connect';
import { Store } from '../../../../../models/storeModel';
import mongoose from 'mongoose';
import Coaching from '@/components/coaching/Coaching';
 
export default async function Page({params}) {

    const { store_id, service_id } = params;

    await connectDB();

    let productData;
    let thumbnailData;

    try{
        productData = await Store.findOne(
        { _id: new mongoose.Types.ObjectId(store_id),
            'services._id': new mongoose.Types.ObjectId(service_id) },
        { _id: 0, 'services.$': 1 }
        );    

        thumbnailData = productData?.services[0]?.thumbnail
    } catch(err){
        console.log(err)
    }

  return (
    <div className='flex w-full h-full'>

        <Navbar/>
        <div className='bg-white px-10 w-full flex flex-col space-x-10 mt-16'>
    
            <h1 className='text-3xl ml-10 text-gray-600 font-bold'>
                {thumbnailData?.title}
            </h1>

            <p className='text-sm text-gray-400 mt-3'>
                {thumbnailData?.subtitle}
            </p>

            <div className='flex w-3/4 p-10 mt-10 justify-center space-x-6 rounded-lg border border-gray-300'>

              <Coaching
                store_id={store_id}
                service_id={service_id}
                title={thumbnailData?.title}
              />

            </div>

            <div className='mt-10 pb-16 w-3/4'>
                <div className="grid gap-4">
            <h2 className="text-2xl font-bold">Customer Reviews</h2>
            <div className="grid gap-6">
            {
              (JSON.stringify(productData) !== '{}' ) ? 

            
              productData?.services[0].reviews?.map((elm, index) =>  

              <div key={index} className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{elm.clientName}</h3>
                    <div className="flex items-center gap-0.5">

                      {
                        [1,2,3,4,5].map((star, index) => <StarIcon className={`w-5 h-5 ${(star < 4) ? "fill-primary": "fill-muted stroke-muted-foreground"}`} />)
                      }
                      
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {elm.content}
                  </p>
                </div>
              </div>
              )

              : null
            }
            </div>
                </div>
                
            
            </div>
        </div>

         
        
      
    </div>
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
