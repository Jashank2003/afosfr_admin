"use client"
import React from 'react'
import Navbar from '../components/Navbar';
import { DollarSign, ShoppingCart, BarChart } from "styled-icons/feather";
import useOrderStore from '../../../contexts/orderStore';


const page = () => {

  const { dailyRevenue , ordersServedToday } = useOrderStore();
  return (
    <>
      <div className='flex'>
        <Navbar/>

            <div className = "h-screen overflow-x-hidden bg-black grow">
              <h1 className = "text-white tracking-wider text-4xl  my-5 ml-4">Analytics</h1>
              <div className = "my-2 ml-4"> <hr/></div>

              <div className="  mt-6 p-3 bg-gray-900 h-[20vh] w-[70vw]  mx-auto align-center rounded-md flex justify-evenly items-center gap-4">
                  {/* Card 1 */}
                  <div className="bg-gray-950 h-[90%] w-[25%] rounded-md flex flex-row justify-between text-white p-3">
                    <div className='flex flex-col justify-items-start'>
                    <h3 className="text-l  text-white">Today's Revenue</h3>
                    <p className="text-xl font-bold mt-1 overflow-auto">Rs.{dailyRevenue}</p>
                    <p className="text-green-400 text-sm mt-1 ">+12.5% from yesterday</p>
                    </div>
                    <DollarSign size={32} className="text-green-400 mb-2 mt-5" />
                  </div>
                  {/* Card 2 */}
                  <div className="bg-gray-950 h-[90%] w-[25%] rounded-md flex flex-row justify-between text-white p-3">
                    <div className='flex flex-col justify-items-start'>
                    <h3 className="text-l  text-white">Total Orders</h3>
                    <p className="text-xl font-bold mt-1 overflow-auto">{ordersServedToday}</p>
                    <p className="text-green-400 text-sm mt-1 ">+5.5% from yesterday</p>
                    </div>
                    <ShoppingCart size={32} className="text-red-400 mb-2 mt-5" />
                  </div>
                  {/* Card 3 */}
                  <div className="bg-gray-950 h-[90%] w-[25%] rounded-md flex flex-row justify-between text-white p-3">
                    <div className='flex flex-col justify-items-start'>
                    <h3 className="text-l  text-white">Avg Order Value</h3>
                    <p className="text-xl font-bold mt-1 overflow-auto">Rs.300</p>
                    <p className="text-green-400 text-sm mt-1 ">+12.5% </p>
                    </div>
                    <BarChart size={32} className="text-orange-400 mb-2 mt-5" />
                  </div>
                </div>
                {/* ..graphs chart.js  */}

            </div>
      </div>
    </>
  )
}

export default page
