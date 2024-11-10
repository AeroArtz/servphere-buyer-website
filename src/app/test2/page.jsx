import React from 'react'
import { colors } from '@/utils/colors';
import { Link as Link_, MapPin } from 'lucide-react';
import {
  Dialog,
  DialogContent,

  DialogTrigger,
} from "@/components/ui/dialog";
import Digital from '@/components/digital/Digital';
import Navbar from '@/components/Navbar';
import { Check, Shield } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"


const data =    
{
    title: '1:1 Math Tutoring',
    subtitle: 'Take your math skills to the next level',
    desc: 'Join me on journey to take your math skills to the next level, study with an experienced tutor with over 25 years of professional experience. No more bad grades, guaranteed success achive results in jsut a few days',
    price : '59.99',
    store_id : '',
    service_id: '',
    buttonCTA: 'Book Now'
}

const URL = 'https://img.freepik.com/free-vector/minimalist-book-cover-template_23-2148899519.jpg'

//console.log(data)  

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

export default async function Page({ params }) {


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
                            >{data.title}
                        </h1>
                    </div>

                        <section className="mt-4">
                            <div className="flex items-center">
                                <p className="font-medium text-gray-900">
                                    {data.price}
                                </p>

                                <div className="ml-4 border-l text-muted-foreground border-gray-300 pl-4">
                                    E-book
                                </div>
                            </div>

                            <div className="mt-4 space-y-6">
                                <p className="text-base text-muted-foreground">
                                    {data.desc}
                                </p>
                            </div>

                            {
                              FEATURES.map((feature) => 
                                <div className="mt-6 flex items-center">
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
                        <div style={{backgroundImage: `url(${URL})`}} className="aspect-square bg-sky-700/25 bg-cover rounded-lg">
                          
                        </div>
                    </div>

                    {/* add to cart part */}
                    <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
                      <div>
                        <div className="mt-10">

                            <button className="w-full text-gray-50 font-medium bg-red-400 py-2">
                                Buy Now
                            </button>

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

                  
              
            <div className='px-32'>
              <div className="grid gap-4">
            <h2 className="text-2xl font-bold">Customer Reviews</h2>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">Sarah Johnson</h3>
                    <div className="flex items-center gap-0.5">
                      <StarIcon className="w-5 h-5 fill-primary" />
                      <StarIcon className="w-5 h-5 fill-primary" />
                      <StarIcon className="w-5 h-5 fill-primary" />
                      <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                      <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    I've been experimenting with my LuminaCook Multi-Function Air Fryer for a few weeks now, and it's been
                    a versatile addition to my kitchen. It's great for making crispy fries, chicken wings, and even some
                    healthier options.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">Alex Smith</h3>
                    <div className="flex items-center gap-0.5">
                      <StarIcon className="w-5 h-5 fill-primary" />
                      <StarIcon className="w-5 h-5 fill-primary" />
                      <StarIcon className="w-5 h-5 fill-primary" />
                      <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                      <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    I recently purchased the SparkleShine Home Cleaning Robot, and it has been a game-changer in my life.
                    I used to spend hours every weekend cleaning my house, but now I can simply turn on this little robot
                    and let it do the work. It's incredibly efficient, navigating around obstacles with ease. The only
                    reason I didn't give it a perfect 5-star rating is that it occasionally gets stuck under low
                    furniture. Overall, it's been a great addition to my home, saving me time and effort.
                  </p>
                </div>
              </div>
            </div>
              </div>
              
              <div className="grid gap-4 mt-16">
                <h2 className="text-2xl font-bold">Related Products</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
                    <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                      <span className="sr-only">View</span>
                    </Link>
                    <img
                      src="https://marketplace.canva.com/EAFzmEHEJPw/2/0/1024w/canva-neutral-minimalist-aesthetic-time-management-ebook-cover-PSoR42xOBIE.jpg"
                      alt="Product 1"
                      width={500}
                      height={400}
                      className="object-cover w-full h-64"
                      style={{ aspectRatio: "500/400", objectFit: "cover" }}
                    />
                    <div className="p-4 bg-background">
                      <h3 className="text-xl font-bold">Classic Leather Shoes</h3>
                      <p className="text-sm text-muted-foreground">Elegant and comfortable</p>
                      <h4 className="text-lg font-semibold">$59.99</h4>
                    </div>
                  </div>

                  <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
                    <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                      <span className="sr-only">View</span>
                    </Link>
                    <img
                      src="https://marketplace.canva.com/EAFYQLZhxpI/2/0/1024w/canva-black-textured-self-help-ebook-cover-mea-L0tQ5HA.jpg"
                      alt="Product 1"
                      width={500}
                      height={400}
                      className="object-cover w-full h-64"
                      style={{ aspectRatio: "500/400", objectFit: "cover" }}
                    />
                    <div className="p-4 bg-background">
                      <h3 className="text-xl font-bold">Classic Leather Shoes</h3>
                      <p className="text-sm text-muted-foreground">Elegant and comfortable</p>
                      <h4 className="text-lg font-semibold">$59.99</h4>
                    </div>
                  </div>

                  <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
                    <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                      <span className="sr-only">View</span>
                    </Link>
                    <img
                      src="https://about.easil.com/wp-content/uploads/new_design_kindle_cover-Page-2-1-640x1024.jpg"
                      alt="Product 1"
                      width={500}
                      height={400}
                      className="object-cover w-full h-64"
                      style={{ aspectRatio: "500/400", objectFit: "cover" }}
                    />
                    <div className="p-4 bg-background">
                      <h3 className="text-xl font-bold">Classic Leather Shoes</h3>
                      <p className="text-sm text-muted-foreground">Elegant and comfortable</p>
                      <h4 className="text-lg font-semibold">$59.99</h4>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>

          </div>

    </div>

 
  )
}


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