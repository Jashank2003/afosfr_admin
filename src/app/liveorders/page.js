"use client"
import React from 'react'
import Navbar from '../components/Navbar';


const page = () => {
  return (
    <>
      <div className='flex'>
        <Navbar/>

        <div className='h-screen overflow-scroll overflow-x-hidden grow'>
          <p> Rest of the live orders</p>
        </div>

      </div>
    </>
  )
}

export default page
