"use client";
import React from "react";
import {useState} from 'react';
import {IndianRupeeSign} from '@styled-icons/fa-solid/IndianRupeeSign'
import useLiveOrderList from '../../../contexts/liveOrderList'
import useReadyOrderList from '../../../contexts/readyOrderList';

const Livecard = ({ orderId,refId, name,contact, order, amount ,dailycount }) => {

  const {readyOrderOf} = useLiveOrderList();
  const { readyOrders, addReadyOrder } = useReadyOrderList();
  const [loading,setLoading] = useState(false);

  const handleReady = async () => {
    setLoading(true);
    try {
        // Make a POST request to your API endpoint
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderId,
                refId,
                name,
                contact,
                order,
                amount,
                dailycount
            }),
        });

        // If the request is successful, call readyOrderOf to remove the order from the list
        if (response.ok) {
            readyOrderOf(orderId);

            const data = {
              orderId,
              refId,
              name,
              contact,
              order,
              amount,
              dailycount
          };


          addReadyOrder(data);
          console.log(readyOrders);
        } else {
            console.error('Failed to insert order into database');
        }
    } catch (error) {
        console.error('Error while making POST request:', error);
    }
    setLoading(false);
};

 const handleDecline = ()=>{
    setLoading(true);
    confirm("Are you want to decline the order?");
    readyOrderOf(orderId);
    setLoading(false);
 }

  return (
    
    <>
    <div className="  bg-[#161616]  py-1 pb-3 px-3 my-2 mx-4 rounded-lg shadow  w-[15vw] h-[42vh]">
    <span className=" text-white font-bold  rounded-2xl bg-red-400 w-7 h-7 p-0.5 px-2 text-center  -mx-4 -my-1">{dailycount}</span>
    <h1 className="text-lg  text-center mx-auto align-middle text-white ">
    #{orderId}
    </h1>
    <h2 className="text-lg font-semibold text-white text-center my-1 mb-2">{name}</h2> 
    <div className="bg-black p-0.5 rounded shadow ">
        <h2 className="text-lg  mb-1 text-gray-100 text-center">Items</h2>
        <div className="border-t border-white w-full h-1 hover:border-gray-300"></div>
        <div className="h-[12vh]">
        <p className="text-white px-2 p-1">{order}</p>
  
            
        </div> 
    </div>

        <p className="p-2 border-t border-b  border-white w-full rounded-sm shadow-md text-center bg-black text-l font-bold text-white"><IndianRupeeSign size={20} color="green"/> {amount}</p>

        <div className="flex ">
        <button onClick={handleReady} className=" rounded-l-md text-md outline-none bg-green-400 px-8 py-1.5 hover:bg-green-500 duration-150">{loading && (
                <span className='inset-0 '>
                  <img src="/pizzaload.svg" alt="Loading..." className="w-2 h-2" />
                </span>
              )}Ready 
        </button>
        <button onClick={handleDecline} className=" rounded-r-md text-md outline-none bg-red-400 px-5 py-1.5 hover:bg-red-500 duration-150">Decline </button>
        </div>
    </div>
   
    </>
  );
};
export default Livecard;