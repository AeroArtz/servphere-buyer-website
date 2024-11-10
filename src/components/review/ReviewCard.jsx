"use client"
import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { IoIosStar } from "react-icons/io";
import { useRouter } from 'next/navigation'

function StarIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
}

export default function ReviewCard({store_id, service_id}) {


    const router = useRouter();

    const [review, setReview] = useState('')

    const [rating, setRating] = useState(0)

    console.log(rating)

    const handleChange = (e) => {
        setReview(e.target.value)
    }

    console.log(service_id)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const toastID = toast.loading("Creating Booking");

        let res = await fetch('/api/create-review', {
            method: 'POST',
            body : JSON.stringify({
                store_id : store_id,
                service_id : service_id,
                content : review,
                rating: rating
    
            })
        })

        res = await res.json();

        if( res === "Success"){

            // REFRESH PAGE AFTER LOGIN
            toast.success("Booking successful", {
                id: toastID
            });
            router.refresh();
        }

        else{
            toast.error("Error Occured", {
                id: toastID
            })
        }
      }

  return (
    <form
>
            <CardHeader>
                <CardTitle>Product Review</CardTitle>
                <CardDescription>Please share your feedback on the different aspects of the product.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">

                <div className='flex'>
                    {[1, 2, 3, 4, 5].map((star) => {
                        return (  
                        <span
                            className='start'
                            style={{
                            cursor: 'pointer',
                            color: rating >= star ? 'gold' : 'gray',
                            fontSize: `35px`,
                            }}
                            onClick={() => {
                            setRating(star)
                            }}
                        >
                            {' '}
                            ★{' '}
                        </span>
                        )
                    })}
                </div>

                <div className="grid gap-2">
            
                    <Label htmlFor="comments">Extra Comments</Label>
                    <textarea onChange={handleChange} id="content" placeholder="Share any additional feedback..." className="w-full p-5 active:outline-none" />
             
                </div>

                </CardContent>
                <CardFooter className="flex justify-end">
                    <button className='bg-red-400 w-full p-2.5 rounded-md text-md font-semibold text-white' onClick={handleSubmit} type='submit'>Submit Review</button>
                </CardFooter>
    </form>
  )
}
