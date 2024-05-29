"use client"
import React from 'react'
import Navbar from '../components/Navbar';


const page = () => {
  return (
    <>
      <div className='flex bg-black'>
        <Navbar/>

        <div className='h-screen overflow-scroll grow overflow-x-hidden pb-2 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-zinc-800 scrollbar-track-zinc-900 overflow-y-scroll scrollbar-thin scrollbar-corner-zinc-950'>
        <h1 className='mx-4 text-white my-5 text-4xl tracking-wider'>Manual Ordering</h1>
        <div className='my-4 ml-4'> <hr /></div>
        
        <div>
            
        </div>



        </div>
      </div>
    </>
  )
}

export default page
