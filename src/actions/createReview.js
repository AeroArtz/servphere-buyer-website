'use server'
import { auth } from '@/auth';
import { connectDB } from "../utils/connect";
import { Store } from '../../models/storeModel';
import mongoose from 'mongoose';

export async function createBooking(formData) {
    const session = await auth();

    const store_id = formData.get("store_id")
    const service_id = formData.get("service_id")
    const content = formData.get("content")


    await connectDB();

    try{
      
        await Store.updateOne(
            { 
                _id: new mongoose.Types.ObjectId(store_id),
                "services._id": new mongoose.Types.ObjectId(service_id)
            },
            {
              $push: {
                "services.$.reviews": {
                  clientName: session?.user?.name,
                  clientEmail: session?.user?.email,
                  content: content
                }
              }
            }
          );
      
    
    
    
    } catch(error){
        return 'An unexpected error occurred.'
    }
     


}
