"use server"
import { signIn } from '@/auth'

export const loginHandler = async (email, password) => {
  
    console.log(` server ${email} ${password}`)

    try{
        await signIn("credentials", {
            email,
            password,
        });
    } catch (error) {
        return error.cause;
    }

  }