import React from 'react'
import { connectDB } from '@/utils/connect';
import { Store } from '../../../models/storeModel'
import { colors } from '@/utils/colors';
import { Link as Link_, MapPin } from 'lucide-react';

import {
  Dialog,
  DialogContent,

  DialogTrigger,
} from "@/components/ui/dialog";
import Coaching from '@/components/coaching/Coaching';
import Digital from '@/components/digital/Digital';

export default async function Page({ params }) {
  //const params = useParams();

  // store_id = 6697f1b4b2ca30ac98fc4aac
  const { store_id } = params;
 
  await connectDB();

  let data ;
  try{
    data = await Store.findById(store_id);      
  } catch(err){
      console.log(err)
  }

//console.log(data)  


  return (
    <div className="flex justify-center w-full h-full bg-zinc-50 " >

        <div className='w-2/3 h-screen px-3 mt-12'>
          <div style={{backgroundImage: `url(${data?.img})`}} className='flex bg-cover h-[10rem] w-[10rem] rounded-full'>
          </div>

          <div className='flex flex-col mt-5'>
            <h3 className='text-gray-500 text-[18px] font-semibold'>{data?.username}</h3>
            <h3 className='text-gray-500/85 text-[12px]'>{data?.bio}</h3>

            <div className='flex justify-between w-full mt-3'>

              <div className='flex text-gray-400 text-[10px] space-x-1'>
                <Link_ size={12} color={colors.lightGrey}/>
                <h6 className=''>{data?.location}</h6>
              </div>

              <div className='flex space-x-1'>
                <MapPin size={12} color={colors.lightGrey}/>
                <h6 className='text-sky-700/75 text-[10px]'>{data?.link}</h6>
              </div>

            </div>

          </div>

          <hr className='mt-2'/>

          

          <div className='grid grid-cols-1 md:grid-cols-2 md:gap-3 mt-3 w-full'>

            {data?.services?.map((elm,index) =>
              <Dialog>
                <DialogTrigger asChild>
                  <div className='flex justify-between h-[6rem] hover:opacity-60 active:opacity-60 bg-white rounded-lg shadow-sm p-3'>
            
                    <div className='w-[65%]'>
                      <h4 className='text-[15px] text-gray-600 font-semibold'>
                        {elm.thumbnail.title}
                      </h4>
            
                      <h5 className='text-[13px] text-gray-400'>
                        {elm.thumbnail.subtitle}
                      </h5>
                    </div>
            
                    <div className='flex space-x-2'>
                      <h4 className='text-[14px] text-gray-600'>{`$${elm.thumbnail.price}`}</h4>
            
                      <button className={`bg-[${colors.airbnb_red}] h-5 px-2 text-[14px] text-white font-medium rounded-md`}>
                        Book
                      </button>
                    </div>
            
                  </div>
                </DialogTrigger>
            
                <DialogContent className="sm:max-w-[475px]">
                    {
                      (elm.label === 'coaching')
                        ? <Coaching
                            store_id = {params.store_id}
                            service_id = {elm._id.toString()}
                            title={elm.thumbnail.title}
                          /> 
                      : <Digital
                          store_id = {params.store_id}
                          service_id = {elm._id.toString()}
                        />
                    }
                  
            
                </DialogContent>
              </Dialog>

            )}
          </div>

        </div>

      </div>

 
  )
}
