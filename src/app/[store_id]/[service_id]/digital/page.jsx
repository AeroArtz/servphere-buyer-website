import React from 'react'
import { connectDB } from "@/utils/connect";
import mongoose from "mongoose";
import { Store } from '../../../../../models/storeModel';

export default async function page({params}) {
  const { store_id, service_id } = params;

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
    <div className='h-full w-full flex flex-col'>
        <h1>{thumbnailData?.title}</h1>

        <h3>{thumbnailData?.subtitle}</h3>

        <h4>{thumbnailData?.price}</h4>

        <button>{thumbnailData?.buttonCTA}</button>
    </div>
  )
}
