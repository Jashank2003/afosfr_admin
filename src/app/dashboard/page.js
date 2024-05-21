"use client"
import React from 'react'
import {useState,useEffect} from 'react'
import Link from 'next/link'
import { CldUploadWidget } from 'next-cloudinary';
import { getCldImageUrl } from 'next-cloudinary';
import useOrderStore from '../../../contexts/orderStore';
import useLiveOrderList from '../../../contexts/liveOrderList';
import useReadyOrderList from '../../../contexts/readyOrderList';
import Navbar from '../components/Navbar';
import {PencilSquare} from '@styled-icons/bootstrap/PencilSquare';
import {Reset} from '@styled-icons/boxicons-regular/Reset';
import {PersonMoney} from '@styled-icons/fluentui-system-filled/PersonMoney';

const page = () => {

  const { dailyOrderCount , resetDailyOrderCount , incrementDailyOrderCount,dailyRevenue, updateRevenue,resetDailyRevenue } = useOrderStore();
  const {resetLiveOrderList} = useLiveOrderList();
  const {clearReadyOrderList} = useReadyOrderList();
  const resetOrder = ()=>{

    confirm("Are You Sure you want to done for the day");

    resetDailyOrderCount();
    resetDailyRevenue();
    resetLiveOrderList();
    clearReadyOrderList();

  }
  const [publicId, setPublicId] = useState('');

  return (
    <>
    <div className='flex bg-black '>
       <Navbar/>

    <div className=' mx-4 h-screen overflow-scroll grow overflow-x-hidden overflow-y-hidden text-white'>
    <button onClick={resetOrder}> 
                  <Reset size={30} title='Done for the day?' className='absolute mt-12 mx-2'/>
          </button>
      <h1 className='my-8 text-center text-4xl tracking-wider'>
     
          ADMIN PANEL</h1>

      <div className='flex mt-12 justify-evenly '>
        <div className=' flex flex-col align-middle w-48 h-52 bg-[#161616] p-2 mx-2 rounded-xl'>
          
          <PencilSquare size={42} className='mx-auto my-5 '/>
          <div>
            
            <p className='mx-auto text-center text-2xl mb-4'> {dailyOrderCount} </p>
            <p className='text-center'> Orders serverd today </p>
          </div>
        </div>

        <div className=' flex flex-col align-middle w-48 h-52 bg-[#161616] p-2 mx-2 rounded-xl'>
          
          <PersonMoney size={42} color='red' className='mx-auto my-5 '/>
          <div>
            
            <p className='mx-auto text-center text-2xl mb-4'> {dailyRevenue} </p>
            <p className='text-center'> revenue today</p>
          </div>
        </div>
        <div className=' flex flex-col align-middle w-48 h-52 bg-[#161616] p-2 mx-2 rounded-xl'>
          <button onClick={resetOrder}> 
                  <Reset size={20} title='reset order count' className='ml-40'/>
          </button>
          <PencilSquare size={40} className='mx-auto my-5 '/>
          <div>
            
            <p className='mx-auto text-center text-2xl mb-4'> {dailyOrderCount} </p>
            <p className='text-center'> Orders serverd today </p>
          </div>
        </div>
        <div className=' flex flex-col align-middle w-48 h-52 bg-[#161616] p-2 mx-2 rounded-xl'>
          <button onClick={resetOrder}> 
                  <Reset size={20} title='reset order count' className='ml-40'/>
          </button>
          <PencilSquare size={40} className='mx-auto my-5 '/>
          <div>
            
            <p className='mx-auto text-center text-2xl mb-4'> {dailyOrderCount} </p>
            <p className='text-center'> Orders serverd today </p>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default page

 
