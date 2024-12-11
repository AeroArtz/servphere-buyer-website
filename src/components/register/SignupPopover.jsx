import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog";
import SignupForm from './SignupForm';


export default function SignupPopover() {
  return (
    <Dialog>

    <DialogTrigger asChild>
        <button>
            <div className={`flex items-center hover:bg-[#f57575] hover:text-gray-50 text-gray-400 border-gray-200 justify-center rounded-3xl py-1 px-4`}>
                <p className='text-sm font-medium'>Sign Up</p>
            </div>         
        </button>
    </DialogTrigger>

    <DialogContent className="sm:max-w-[425px]">
        <SignupForm/>
    </DialogContent>
</Dialog>
  )
}
