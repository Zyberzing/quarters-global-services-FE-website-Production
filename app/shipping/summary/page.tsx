"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'nextjs-toploader/app';
import React from 'react'

const Page = () => {
    const router = useRouter();     
    return (
        <div className=" bg-white flex flex-col items-center p-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Shipping label
            </h2>

            <Image src={"/image.png"} width={600} height={600} alt='sss'></Image>

            <div className="mt-6">
                <Button className="bg-blue-700 text-white rounded-md" onClick={() => router.push("/login")} >
                    Track your Order
                </Button>
            </div>


        </div>
    )
}

export default Page