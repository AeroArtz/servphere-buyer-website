import Link from 'next/link';
import React from 'react';
import { signIn } from '@/auth';

import { FaGoogle } from 'react-icons/fa';

const SignupForm = () => {


  return (

            <form
              action={ async() => {
                "use server"
                await signIn("google")
              }} 
              className="bg-white h-full rounded px-8 pt-12 pb-8 mb-4 space-y-5">

                <h1 className='text-gray-600 text-center text-2xl font-bold mb-2'>
                  Sign up in seconds
                </h1>

                <h3 className='text-gray-500 text-center text-sm mb-2'>
                Use your email or another service to continue with Srvfia &#40;it&apos;s free&#41;&#33;
                </h3>

                <div className='flex items-center justify-center border border-gray-400/75 space-x-4 rounded-md py-1.5'>
                  <FaGoogle size={15}/>
                  <button className='text-md' type='submit'>
                    Continue with Google
                  </button>
                </div>
               

                <h3 className='text-gray-600 text-xs text-center'>By signing up, you agree to our {" "}
                  <Link className='underline text-violet-800/75 hover:text-violet-300' href="">Privacy Policy {" "}</Link> 
                  and {" "}
                  <Link className='underline text-violet-800/75 hover:text-violet-300' href="">Terms of Service</Link>
                </h3>


                <h3 className='text-gray-600 text-xs text-center'>Already have an account? <Link className='underline text-violet-800/75 hover:text-violet-300' href="/login">Login here</Link></h3>

            </form>
    
  )
}

export default SignupForm