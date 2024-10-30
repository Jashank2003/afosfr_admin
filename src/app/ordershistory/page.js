"use client"
import React from 'react'
import {useState,useEffect} from 'react'
import Navbar from '../components/Navbar';
import { Search} from "@styled-icons/evil/Search";


const page = () => {

  const[prevOrders,setPrevOrders] = useState([]);
  const [tableanimation ,settableanimation] = useState(true);
  const[query , setQuery] = useState("");
  const[shopId, setShopId] = useState(null); // State to hold shop_id

  useEffect(() => {
    // Fetch shop_id once when the component mounts
    const adminData = JSON.parse(localStorage.getItem('adminData'));
    const shop_id = adminData?.shop_id;

    if (!shop_id) {
      alert("Shop ID not found");
    } else {
      setShopId(shop_id); // Store shop_id in state for reuse
    }
  }, []);

  useEffect(() => {
    if (shopId) { // Ensure shopId is set
      const fetchOrders = async () => {
        settableanimation(true);
        const response = await fetch(`/api/orders?shop_id=${shopId}`);
        let rjson = await response.json();
        console.log("rjson is here",rjson);
        setPrevOrders(rjson.allOrders || []);
        settableanimation(false);
      };
      fetchOrders();
    }
  }, [shopId]); // Trigger fetch only after shopId is set
  

  const handleSearch = async(e)=>{
     let value = e.target.value
     setQuery(value)
    //  console.log(query);
    if(value.length>=3){
      settableanimation(true);
      const response = await fetch(`/api/searchistory?query=${query}&shop_id=${shopId}`)
      let rjson = await response.json();
      setPrevOrders(rjson.searchedHistory || []);
      settableanimation(false);
      
    }
    else{
      const response = await fetch(`/api/orders?shop_id=${shopId}`)
      let rjson = await response.json();
      setPrevOrders(rjson.allOrders || []);
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
        <div className={`p-2 my-4  mx-4 h-[80vh] bg-[#161616] ${tableanimation? 'animate-pulse':'bg-transparent'}`}>
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

          <tbody>
  {prevOrders.length === 0 ? (
    <tr>
      <td colSpan="7" className="text-center text-gray-400">No orders found</td>
    </tr>
  ) : (
    prevOrders.map((prevOrder, index) => {
      const rowClass = index % 2 === 0 ? 'bg-gradient-to-l from-[#0000] to-[#0B192C]' : 'bg-gradient-to-l from-[#0000] to-[#0B192C]';
      return (
        <tr key={prevOrder.orderId} className={`${rowClass} p-4 text-md text-gray-300 mb-2`}>
          <td className=" p-4">{prevOrder.name}</td>
          <td className=" p-4">{prevOrder.contact}</td>
          <td className=" p-4">Rs.{prevOrder.refId}</td>
          <td className=" p-4">{prevOrder.orderId}</td>
          <td className=" p-4">{prevOrder.dailycount}</td>
          <td className=" p-4">{prevOrder.amount}</td>
          <td className=" p-4">{prevOrder.order}</td>
        </tr>
      );
    })
  )}
</tbody>

        </table>
      </div>

        </div>

      </div>
    </>
  )
}

export default page
