"use client"
import React from 'react'
import { useState , useEffect } from 'react';
import Navbar from '../components/Navbar';
import Manualorderitem from '../components/Manualorderitem';
import useCartValue from '../../../contexts/cartValue';
import useLiveOrderList from '../../../contexts/liveOrderList';
import useOrderStore from '../../../contexts/orderStore';


import { Search} from "@styled-icons/evil/Search";
import {IndianRupeeSign} from '@styled-icons/fa-solid/IndianRupeeSign'


const page = () => {

  const {cartorders,updateQuantity ,getTotalAmount ,resetcartorders } = useCartValue();
  const {setOrders} = useLiveOrderList();
  const { dailyOrderCount , incrementDailyOrderCount } = useOrderStore();

  const[fooditems,setFooditems] = useState([]);
  const [tableanimation ,settableanimation] = useState(true);
  const[query , setQuery] = useState("");

  const [custname, setCustname] = useState("");
  const [custmob, setCustmob] = useState("");
  const [shopId, setShopId] = useState(null); // State to hold shop_id

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
    // Fetch food items when shop_id is available
    if (shopId) {
      const fetchItems = async () => {
        settableanimation(true);
        const response = await fetch(`/api/product?shop_id=${shopId}`);
        let rjson = await response.json();
        setFooditems(rjson.products);
        settableanimation(false);
      };
      fetchItems();
    }
  }, [shopId]);

  const handleIncrement = (index) => {
    updateQuantity(index, cartorders[index].quantity + 1);
  };

  const handleDecrement = (index) => {
    updateQuantity(index, cartorders[index].quantity - 1);
  };

  const totalAmount = getTotalAmount();

  const generateOrderId = () => {
    const now = new Date();
    const date = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
    
    return `PP${date}${month}${hours}${minutes}${seconds}${milliseconds}`;
  };

  const handleBuy = ()=>{

    if (!custname || !custmob) {
      alert("Please enter both name and mobile number.");
      return;
    }

    const orderId = generateOrderId();
    const refId = "CASH";
    const data = {
      orderId,
      refId,
      name: custname,
      contact: custmob,
      orders:cartorders,
      amount: totalAmount,
      shop_id:shopId
    };

    // console.log(data);
    incrementDailyOrderCount();
    // updateRevenue(data.amount);

    setOrders(data,dailyOrderCount+1);
    resetcartorders();
    setCustname("");
    setCustmob("");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "custname") setCustname(value);
    if (name === "custmob") setCustmob(value);
  };

  
 
  const handleSearch = async(e)=>{
    let value = e.target.value
    setQuery(value)
   //  console.log(query);
   if(value.length>=3){
     settableanimation(true);
     const response = await fetch(`/api/search?query=${query}&shop_id=${shopId}`)
     let rjson = await response.json();
     setFooditems(rjson.products);
     settableanimation(false);
     
   }
   else{
     settableanimation(true);
     const response = await fetch(`/api/product?shop_id=${shopId}`);
     let rjson = await response.json();
     setFooditems(rjson.products);
     settableanimation(false);
   }
 }

  return (
    <>
      <div className='flex bg-black flex-grow'>
        <Navbar/>

        <div className='h-screen overflow-scroll grow overflow-x-hidden pb-2 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-zinc-800 scrollbar-track-zinc-900 overflow-y-scroll scrollbar-thin scrollbar-corner-zinc-950'>
        <h1 className='mx-4 text-white my-5 text-4xl tracking-wider'>Manual Ordering</h1>
        <div className='my-4 ml-4'> <hr /></div>
        
        {/* section two partions starts */}
        <div className='flex flex-row text-white p-4 justify-center '>

        {/* section of customer details */}
          <div className=' flex flex-col  mx-2 p-2 w-[35vw] bg-[#161616] rounded-lg mt-1'>
          <h1 className='text-white text-lg p-1'>Customer Details</h1>

          <div className='flex flex-col' >

          <input
            name="custname"
            id="custname"
            type="text"
            value={custname}
            onChange={handleChange}
            placeholder="Enter customer name"
            className="border py-1 my-4 rounded-md outline-none px-2 text-black  w-[14vw]"
            />
          <input
           
           name="custmob"
           id="custmob"
           type='number'
           value={custmob}
           onChange={handleChange}
           placeholder="Mobile Num."
           className="border py-1  my-4rounded-md outline-none px-2 text-black  w-[14vw]"
           />

           </div>
            <h1 className='text-white text-lg mt-4 mb-2'>Cart Value </h1>
           <div className='h-[40vh] overflow-y-auto scrollbar-thin' >
              {cartorders.map((item, index) => (
                <div key={index} className='bg-black mt-2 p-2 flex justify-between items-center'>
                <div>
                  <p>{item.itemName}</p>
                  <p>Price: {item.amount} /-</p>
                </div>
                <div className='flex items-center'>
                  <button className='bg-red-400 px-2 py-0.5' onClick={() => handleDecrement(index)}> - </button>
                  <span className='mx-2'>{item.quantity}</span>
                  <button className='bg-green-400 px-2 py-0.5' onClick={() => handleIncrement(index)}> + </button>
                </div>
              </div>
              ))}
          </div>

          <div className="flex justify-between items-center mt-4">
              <span className="text-xl">Total Amount:</span>
              <span className="mr-3 text-xl"><IndianRupeeSign size={16} color='green'/> {totalAmount}</span>
            </div>

           <div className='flex justify-center mt-4' >
            <button onClick={handleBuy} className='bg-green-400 text-black p-2 rounded-md m-atuo px-4 hover:bg-green-500 duration-200'> Make Payment</button>
           </div>
          </div>

          {/* Section of Food search and add to cart */}

          <div className= ' mx-2 p-2 w-[50vw]  h-[85vh] border-solid border-gray border-l-2 border-rounded-sm '>
              <div className="flex mx-auto -ml-4 w-[48vw] h-[6vh] ">
                <Search color='white' size={26} className='relative top-2.5 left-7' />
                <input
                type="text"
                className=" outline-none rounded-2xl pl-8 pr-3 py-3 w-full bg-[#161616] text-gray-400 text-justify text-sm"
                onChange={handleSearch}

                placeholder="Search Food Item"
                />
                </div>

                <div className={` flex flex-grow flex-wrap mx-2 my-4 w-[48vw] h-[74vh]  scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-zinc-400 scrollbar-track-zinc-900 scrollbar-thin scrollbar-corner-zinc-300  overflow-y-auto ${tableanimation? 'animate-pulse':''} `}
                >

              {     
                fooditems.map((fooditem, index) => (
                  <Manualorderitem
                  key={index} // Assign a unique key for each Livecard
                  foodname={fooditem.foodname}
                  fooding={fooditem.fooding}
                  foodimg={fooditem.foodimg}
                  foodprice = {fooditem.price}
                  foodavlb = {fooditem.avlb}       
                  />
                ))
              
            }
            </div> 

            
          </div>
            {/* section  food item search ends */}
          </div>
            {/* section two partions ends */}
        </div>
      </div>
    </>
  )
}

export default page
