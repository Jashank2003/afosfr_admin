"use client"
import React from 'react'
import {useState,useEffect} from 'react'
import Link from 'next/link'
import { CldUploadWidget } from 'next-cloudinary';
import { getCldImageUrl } from 'next-cloudinary';

import Navbar from './components/Navbar';

const page = () => {

  const [publicId, setPublicId] = useState('');

  return (
    <>
    <div className='flex bg-black'>
       <Navbar/>
    <div className=' mx-4 h-screen overflow-scroll grow overflow-x-hidden text-white'>
      
      <h1 className='my-8 text-center text-4xl tracking-wider'>ADMIN PANEL</h1>

      <div className='flex mt-12 justify-evenly '>
        <div className=' w-48 h-52 bg-[#161616] p-2 mx-2 rounded-xl'>
          
        </div>
        <div className=' w-48 h-52 bg-[#161616] p-2 mx-2 rounded-xl'></div>
        <div className=' w-48 h-52 bg-[#161616] p-2 mx-2 rounded-xl'></div>
        <div className=' w-48 h-52 bg-[#161616] p-2 mx-2 rounded-xl'></div>
      </div>
    </div>
    </div>
    </>
  )
}

export default page

 
