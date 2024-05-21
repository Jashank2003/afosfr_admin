"use client"
import React from 'react'
import {useState,useEffect} from 'react'
import Navbar from '../components/Navbar';
import { Search} from "@styled-icons/evil/Search";


const page = () => {

  const[prevOrders,setPrevOrders] = useState([]);
  const [tableanimation ,settableanimation] = useState(true);
  const[query , setQuery] = useState("");

  useEffect(()=>{

    const fetchOrders = async ()=>{
      settableanimation(true);
      const response = await fetch('/api/orders')
      let rjson = await response.json();
      setPrevOrders(rjson.allorders);
      settableanimation(false);
    }
    fetchOrders();
  },[])

  const handleSearch = async(e)=>{
     let value = e.target.value
     setQuery(value)
    //  console.log(query);
    if(value.length>=3){
      settableanimation(true);
      const response = await fetch('/api/searchistory?query=' + query)
      let rjson = await response.json();
      setPrevOrders(rjson.searchedHistory);
      settableanimation(false);
      
    }
    else{
      const response = await fetch('/api/orders')
      let rjson = await response.json();
      setPrevOrders(rjson.allorders);
      settableanimation(false);
    }
  }
  return (
    <>
      <div className='flex bg-black'>
        <Navbar/>

        <div className='h-screen overflow-scroll grow overflow-x-hidden pb-2 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-zinc-800 scrollbar-track-zinc-900 overflow-y-scroll scrollbar-thin scrollbar-corner-zinc-950'>

        <h1 className='text-4xl my-5 ml-4  text-white tracking-wider '>Orders Histroy </h1>
        <div className='my-2 ml-4'> <hr /></div>
        
         {/* Search orders by name orderId or refId  */}
        

        <div className="flex  w-[80vw] my-6">
        <Search color='white' size={26} className='relative top-2.5 left-6' />
          <input
            type="text"
            className=" outline-none rounded-2xl pl-7 pr-2 py-3 w-full bg-[#161616] text-gray-400 text-justify text-sm"
            onChange={handleSearch}
           
            placeholder="Search an Order by name , orderId or refId..."
            />
        </div>

          

         {/* Display Previous orderes here */}
        <div className={`p-2 my-4  mx-4 h-[80vh] bg-[#161616] ${tableanimation? 'animate-pulse':''}`}>
        {/* <h1 className=" text-lg font-semibold mb-4">Display Food Menu </h1> */}
        <table className="w-full border">
          <thead>
            <tr className=" text-gray-400 border-b-2 border-t-2 border-solid border-white text-lg border-l-0 border-r-0 ">
              <th className=" p-4">Name</th>
              <th className=" p-4">Contact</th>
              <th className=" p-4">RefId</th>
              <th className=" p-4">OrderId</th>
              <th className=" p-4">OrderNum</th>
              <th className=" p-4">Amount</th>
              <th className=" p-4">Order</th>
            </tr>
          </thead>

          <tbody >
            {prevOrders?.map((prevOrder , index)=>{
              const rowClass = index % 2 === 0 ? 'bg-[#535F57]' : 'bg-[#212623]';
              return <tr key ={prevOrder.orderId} className={`${rowClass} p-4 text-md text-gray-300 mb-2`}>
              <th className="border-b p-3">{prevOrder.name}</th>
              <th className="border-b p-3">{prevOrder.contact}</th>
              <th className="border-b p-3">Rs.{prevOrder.refId}</th>
              <th className="border-b p-3"> {prevOrder.orderId} </th>
              <th className="border-b p-3">{prevOrder.dailycount}</th>
              <th className="border-b p-3">{prevOrder.amount}</th>
              <th className="border-b p-3">{prevOrder.order}</th>
            </tr>
            })}
          </tbody>
        </table>
      </div>

        </div>

      </div>
    </>
  )
}

export default page
