import React from 'react'
import { connectDB } from "@/utils/connect";
import mongoose from "mongoose";
import { Store } from '../../../models/storeModel';

export default async function Digital({store_id, service_id}) {

  await connectDB();
  let data ;
  let thumbnailData;
  try{
     data = await Store.findOne(
    { _id: new mongoose.Types.ObjectId(store_id),
        'services._id': new mongoose.Types.ObjectId(service_id) },
    { _id: 0, 'services.$': 1 }
    );    

    thumbnailData = data?.services[0]?.thumbnail
  } catch(err){
    console.log(err)
  }

  return (
    <form className='space-y-4'>
        <h1 className='text-2xl font-semibold text-gray-600/75'>
          {thumbnailData?.title}
        </h1>

        <h3 className='text-md text-gray-500'>
          {thumbnailData?.subtitle}
        </h3>

        <h4 className='text-md font-semibold text-gray-600/75'>{thumbnailData?.price}</h4>

        <button type='submit' className='bg-red-400 hover:opacity-60 active:opacity-60 py-2 w-full rounded focus:outline-none focus:shadow-outline mt-8 mb-10'>
          <h4 className='text-sm text-white'>{thumbnailData?.buttonCTA}</h4>            
        </button>
    </form>
  )
}
