import React from 'react'
import { FaGoogle } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import {
    Dialog,
    DialogContent,

    DialogTrigger,
  } from "@/components/ui/dialog";
import { LoginForm } from '../LoginForm';
import { signIn } from '@/auth';


export default function LoginPopover() {
  return (
    <Dialog>

    <DialogTrigger asChild>
        <button>
            <div className={`flex items-center hover:bg-[#f57575] hover:text-gray-50 text-gray-400 border-gray-200 justify-center rounded-3xl py-1 px-4`}>
                <p className='text-sm font-medium'>Sign in</p>
            </div>         
        </button>
    </DialogTrigger>

    <DialogContent className="sm:max-w-[425px]">
        
          <LoginForm/>

          <div className='flex flex-col h-full items-center justify-center space-y-3 '>

                  <form 
                    action={ async() => {
                      "use server"
                      await signIn("google");
                    }}
                   className='h-full w-full hover:opacity-60 active:opacity-60'>
                    <Button variant="outline" className="w-full">
                      <FaGoogle size={15} className='mr-2'/>
                      Login with Google
                    </Button>
                </form>

                <h3 className='text-gray-600 text-xs'>Don&apos;t have an account? <Link className='text-purple-950/55 inline-block text-xs underline' href="/register">Register here</Link></h3>

          </div>
        
       

    </DialogContent>
</Dialog>
  )
}
