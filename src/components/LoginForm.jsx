"use client"
//import { loginHandler } from '@/actions/loginHandler';
import { loginHandler } from '@/actions/loginHandler';

import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export const LoginForm = () => {

    const router= useRouter();

    return (
        <form action={ async (formData) => {
            const email = formData.get("email");
            const password = formData.get("password");

            if (!email || !password) 
                return toast.error("Please provide all details");
            
            const toastID = toast.loading("Logging in");

            const error = await loginHandler(email, password);

            if(!error){
                
                // REFRESH PAGE AFTER LOGIN
                toast.success("Login Successful", {
                    id: toastID
                });
                router.refresh();
            }

            else{
                toast.error(String(error), {
                    id: toastID
                })
            }
        
        }} 
        className="rounded space-y-5">

        <h1 className='text-gray-600 text-center text-2xl font-bold mb-2'>
            Login
        </h1>

        <h3 className='text-gray-500 text-center text-sm mb-2'>
            Continue your journey with servphere
        </h3>

        <div className="mb-4">    
            <input name="email" required placeholder="email" type="text" className="border rounded w-full py-3 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"/>
        </div>

        <div className="mb-4">    
            <input name="password" required placeholder="password" type="password" className="border rounded w-full py-3 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"/>
        </div>

        <div className="flex justify-between">
            <div className="flex items-center space-x-1">
                <Checkbox className="w-3.5 h-3.5 border-gray-400" id="remember" />
                <Label htmlFor="remember" className="text-xs text-gray-500 leading-none">
                Remember me
                </Label>
            </div>

            <Link href="#" className="ml-auto text-gray-500 inline-block text-xs underline" prefetch={false}>
                Forgot your password?
            </Link> 
        </div>
       
        <div className="flex items-center justify-between">
            <button className={`w-full bg-[#f57575] text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline" type="submit`}>
            Sign In
            </button>
        </div>


    </form>
    )
}