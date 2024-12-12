
import React from 'react'
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Check, Shield } from "lucide-react"

import DigitalFormSubmission from '@/components/digital/DigitalFormSubmission';
import { db } from '@/db';
import { services } from '@/db/schema/services';
import { and, eq, sql } from 'drizzle-orm';
import { reviews } from '@/db/schema/reviews';
import { clients } from '@/db/schema/clients';


const URL = 'https://img.freepik.com/free-vector/minimalist-book-cover-template_23-2148899519.jpg'

const BREADCRUMBS = [
{id: 1, name:"Home", href:"/"},
{id: 2, name: "Services", href: "/products"}
]

const FEATURES = [
  'Instant Download',
  '24/7 Support',
  'Full Step By Step Guide',
  'Safe to use'
]

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

export default async function Page({params}) {
  const { store_id, service_id } = params;

 

  let thumbnailData;
  let reviews_;
  try{

    thumbnailData = await db.execute(sql`select ${services.thumbnail} from ${services} where ${services.store_id}=${store_id} and ${services.id}=${service_id}`);
    thumbnailData = thumbnailData?.rows[0]?.thumbnail;

    console.log(thumbnailData)

    reviews_ = await db.select().from(reviews).innerJoin(clients, and( eq(reviews.clientId, clients.id) , eq(reviews.serviceId, service_id)))


  
  } catch(err){
    console.log(err)
  }

  return (
    <div className='w-full h-full flex'>
    <Navbar store_id={""}/>
  
        <div className='flex flex-col w-full h-full'>
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              {/*  Product details */}
              <div className="lg:max-w-lg lg:self-end">
                  <ol className="flex items-center space-x-2">
                      {BREADCRUMBS.map((breadcrumb, i) => (
                          <li key={breadcrumb.href}>
                              <div className="flex items-center text-sm">
                                  <Link
                                  href={breadcrumb.href}
                                  className="font-medium text-sm text-muted-foreground hover:text-gray-900">
                                      {breadcrumb.name}
                                  </Link>
                                  {i !== BREADCRUMBS.length -1 ? (
                                      <svg
                                          viewBox='0 0 20 20'
                                          fill='currentColor'
                                          aria-hidden='true'
                                          className='ml-2 h-5 w-5 flex-shrink-0 text-gray-300'>
                                          <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                                      </svg>
                                  ) : null}
                              </div>
                          </li>
                      ))}
                  </ol>
                  <div className="mt-4">
                      <h1
                          className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                          >{thumbnailData?.title}
                      </h1>
                  </div>

                      <section className="mt-4">
                          <div className="flex items-center">

                          { (thumbnailData?.discount) ? 

                            <>
                             <p className="font-medium line-through text-gray-400/75 mr-3">
                                  {'$'}{thumbnailData?.price}
                              </p>
                              <p className="font-medium text-gray-900">
                                  {'$'}{thumbnailData?.discount}
                              </p>
                            </>
                            : 
                            <p className="font-medium text-gray-900">
                                {'$'}{thumbnailData?.price}
                            </p>

                            }
                             

                              <div className="ml-4 border-l text-muted-foreground border-gray-300 pl-4">
                                  Digital Download
                              </div>
                          </div>

                          <div className="mt-4 space-y-6">
                              <p className="text-base text-muted-foreground">
                                  {thumbnailData?.description}
                              </p>
                          </div>

                          {
                            thumbnailData?.features?.map((feature, index) => 
                              <div key={index} className="mt-6 flex items-center">
                                  <Check
                                  aria-hidden="true" 
                                  className="h-5 w-5 flex-shrink-0 text-green-500"/>
                                  <p className="ml-2 text-sm text-muted-foreground">{feature}</p>
                              </div>
                            )
                          }
                          
                          
                      </section>
                  </div>

                  {/* Product images */}
                  <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
                      <div style={{backgroundImage: `url(${thumbnailData?.img})`}} className="aspect-square bg-sky-700/25 bg-cover rounded-lg">
                        
                      </div>
                  </div>

                  {/* add to cart part */}
                  <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
                    <div>
                      <div className="mt-10">

                          <DigitalFormSubmission
                            service_id={service_id}
                            type="digital"
                          />

                      </div>
                  
                      <div className="mt-6 text-center">
                          <div className="group inline-flex text-sm text-medium">
                              <Shield
                              aria-hidden="true"
                              className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400"/>
                              <span className="text-muted-foreground hover:text-gray-700">
                                  30 Day Return Guarantee
                              </span>

                          </div>
                      </div>
                    </div>
                  </div>

          </div>

                
            
          <div className='px-32 pb-20'>
            <div className="grid gap-4">
          <h2 className="text-2xl font-bold">Customer Reviews</h2>
          <div className="grid gap-6">

            

            {
              reviews_?.map((elm, index) =>  

              <div key={index} className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{elm?.client?.name}</h3>
                    <div className="flex items-center gap-0.5">

                      {
                        [1,2,3,4,5].map((star, index) => <StarIcon key={index} className={`w-5 h-5 ${(star < elm?.review?.ratings) ? "fill-primary": "fill-muted stroke-muted-foreground"}`} />)
                      }
                      
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {elm?.review?.content}
                  </p>
                </div>
              </div>
              )
            }

            
          </div>
            </div>
            
      
          </div>

        </div>

  </div>
  )
}
