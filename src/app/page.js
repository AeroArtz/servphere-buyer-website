import { auth } from '@/auth';
import LoginPopover from '@/components/login/LoginPopover';
import SignupPopover from '@/components/register/SignupPopover';
import { colors } from '@/utils/colors';
import { connectDB } from '@/utils/connect';
import { Search } from 'lucide-react';
import { Store } from '../../models/storeModel';
import Link from 'next/link';
import SearchBar from '@/components/home/SearchBar';
import Navbar from '@/components/Navbar';

export default async function Home() {

  const airbnb_red = "#f57575"
  
  await connectDB();

  let stores ;
  try{
    stores = await Store.find({});      
  } catch(err){
      console.log(err)
  }

  console.log(stores)
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
              stores.map((store, index) =>
                <Link href={`/${store._id}`}>
                  <div key={index} className='flex hover:opacity-60 space-x-2 border w-[25rem] p-4 border-gray-200/75 rounded-lg'>

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
