"use client"
import React from 'react'
import Navbar from '../components/Navbar';


const page = () => {
  return (
    <>
    <div className='flex bg-black'>
       <Navbar/>

    <div className='h-screen overflow-y-hidden grow '>
    <h1 className='text-4xl my-5 ml-4  text-white tracking-wider '>Orders</h1>
    <div className='my-2 ml-4'> <hr /></div>

    {/* live orderss here */}
    <h1 className='mb-3 text-center text-lg  font-semibold tracking-wide text-white'>Live orders</h1>
    <div className='flex mx-4  my-1 h-[34vh] bg-yellow-50 '>

    </div>
    {/* orders completed here */}
    <div className='my-2 ml-4'> <hr /></div>
    <h1 className='mb-3 text-center text-lg  font-semibold tracking-wide text-white'>Orders Ready</h1>
    <div className='flex  mx-4 my-1 h-[34vh] bg-yellow-50 '>

    </div>

      
    </div>
    </div>
    </>
  )
}

export default page
