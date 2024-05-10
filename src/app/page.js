"use client"
import React from 'react'
import {useState,useEffect} from 'react'
import Link from 'next/link'
import { CldUploadWidget } from 'next-cloudinary';
import { getCldImageUrl } from 'next-cloudinary';
import useOrderStore from '../../contexts/orderStore';
import Navbar from './components/Navbar';
import {PencilSquare} from '@styled-icons/bootstrap/PencilSquare';
import {Reset} from '@styled-icons/boxicons-regular/Reset';

const page = () => {

  const { dailyOrderCount , resetDailyOrderCount , incrementDailyOrderCount } = useOrderStore();

  const resetOrder = ()=>{

    confirm("Are You Sure you want to reset order count");
    resetDailyOrderCount();
  }
  const [publicId, setPublicId] = useState('');

  return (
    <>
    <div className='flex bg-black'>
       <Navbar/>
    <div className=' mx-4 h-screen overflow-scroll grow overflow-x-hidden text-white'>
      
      <h1 className='my-8 text-center text-4xl tracking-wider'>ADMIN PANEL</h1>

      <div className='flex mt-12 justify-evenly '>
        <div className=' flex flex-col align-middle w-48 h-52 bg-[#161616] p-2 mx-2 rounded-xl'>
          <button onClick={resetOrder}> 
                  <Reset size={20} title='reset order count' className='ml-40'/>
          </button>
          <PencilSquare size={40} className='mx-auto my-4 '/>
          <div>
            
            <p className='mx-auto text-center text-2xl mb-4'> {dailyOrderCount} </p>
            <p className='text-center'> Orders serverd today </p>
          </div>
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

 
