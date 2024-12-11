import { auth } from '@/auth';
import LoginPopover from '@/components/login/LoginPopover';
import SignupPopover from '@/components/register/SignupPopover';
import Link from 'next/link';
import SearchBar from '@/components/home/SearchBar';
import Navbar from '@/components/Navbar';
import { db } from '@/db';
import { sql } from 'drizzle-orm';
import { stores } from '@/db/schema/stores';


export default async function Home() {

  const session = await auth();
  const airbnb_red = "#f57575"

  let storesData ;
  try{
    storesData = await db.execute(sql`select * from ${stores}`);
    storesData = storesData.rows;   

    console.log(storesData)
  } catch(err){
      console.log(err)
  }

  console.log(storesData)
  return (
    <div className='h-full w-full flex'>
      <Navbar/>
      <div className='flex flex-col w-full h-screen bg-zinc-100/30 pt-10 pb-12'>

        <div className='flex px-12'>

            <div className='flex items-center justify-items-center'>
                <h3 className={`block text-[#f57575] text-md font-semibold`}>Servphere</h3>
            </div>

            <div className='flex justify-end space-x-3 w-full'>     
                <LoginPopover/>
                <SignupPopover/>
            </div>

        </div>

        <div className='flex mt-20 flex-col items-center w-full h-full'>

          <h1 className='text-5xl font-semibold text-gray-600'>
            Welcome to Servphere
          </h1>

          <h5 className='text-[15px] mt-2 text-gray-500/75'>
            Discover service providers in your area
          </h5>

          <SearchBar/>

          <div className='grid grid-cols-3 gap-5 mt-16'>
            {
              storesData?.map((store, index) =>
                <Link key={index} href={`/${store.id}`}>
                  <div className='flex hover:opacity-60 space-x-2 border w-[25rem] p-4 border-gray-200/75 rounded-lg'>

                    <div style={{backgroundImage: `url(${store?.img})`}} className='flex bg-cover h-[5rem] w-[5rem] rounded-full'>
                    </div>

                    <div className=''>
                      <h2 className='font-medium text-gray-500 text-md'>{store?.username}</h2>

                      <h4 className='text-gray-400 text-xs'>{store?.bio}</h4>

                  
                    </div>
                  </div>
                </Link>
              )
            }
          </div>
      
        </div>


      </div>
    </div>
  );
}
