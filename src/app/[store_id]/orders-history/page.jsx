import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog";

import ReviewCard from '@/components/review/ReviewCard';
import Navbar from '@/components/Navbar';
import { db } from '@/db';
import { bookings } from '@/db/schema/bookings';
import { eq, sql } from 'drizzle-orm';
import { auth } from '@/auth';
import { services } from '@/db/schema/services';
import { DialogTitle } from '@radix-ui/react-dialog';

export default async function Page({ params }) {
  //const params = useParams();

  const session = await auth();

  // store_id = 6697f1b4b2ca30ac98fc4aac
  const { store_id } = params;

 
  let data ;
  let result
  try{

    //data = await db.select().from(bookings).where(eq(bookings.clientId,session?.user?.id))

    data = await db.select().from(bookings).innerJoin(services, eq(bookings.serviceId, services.id))
   
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
                          {elm.service.thumbnail.title}
                        </h4>

                       
                        <span className='text-sm opacity-80 text-blue-500 underline mt-9'>Add Review</span>
                     
                      
                    </div>
                  </DialogTrigger>
              
                  <DialogContent className="sm:max-w-[475px]">
                    
                      <DialogTitle>
                        
                      </DialogTitle>
                      
                      <ReviewCard service_id={elm.booking.serviceId}/>
              
                  </DialogContent>
                </Dialog>

              )}

          </div>
      </div>
    </div>

  )
}