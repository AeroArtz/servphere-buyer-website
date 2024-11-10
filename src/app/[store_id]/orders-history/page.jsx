import { connectDB } from '@/utils/connect';
import { Booking } from '../../../../models/bookingModel';
import mongoose from 'mongoose';
import {
    Dialog,
    DialogContent,
  
    DialogTrigger,
  } from "@/components/ui/dialog";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import ReviewCard from '@/components/review/ReviewCard';
import Navbar from '@/components/Navbar';

export default async function Page({ params }) {
  //const params = useParams();


  // store_id = 6697f1b4b2ca30ac98fc4aac
  const { store_id } = params;
 
  await connectDB();

 
  let data ;
  try{
    data = await Booking.find({store_id: new mongoose.Types.ObjectId(store_id), clientEmail: "abdulrehmanikram9710@gmail.com"  });   
    //console.log(data)   
  } catch(err){
      console.log(err)
  }

  return(
    <div className='flex w-full h-full'>
      <Navbar store_id={store_id}/>
      <div className="flex w-full h-full bg-zinc-50 " >

          <div className='flex flex-col w-1/3 h-screen space-y-2 ml-10 mt-10'>
        
          {data?.map((elm,index) =>
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <div className='flex justify-between h-[6rem] hover:opacity-60 active:opacity-60 bg-white rounded-lg shadow-sm p-3'>
              
                        <h4 className='text-[15px] text-gray-600 font-semibold'>
                          {elm.serviceName}
                        </h4>

                       
                        <span className='text-sm opacity-80 text-blue-500 underline mt-9'>Add Review</span>
                     
                      
                    </div>
                  </DialogTrigger>
              
                  <DialogContent className="sm:max-w-[475px]">
                    
                      <ReviewCard store_id={store_id} service_id={elm.service_id.toString()}/>
              
                  </DialogContent>
                </Dialog>

              )}

          </div>
      </div>
    </div>

  )
}