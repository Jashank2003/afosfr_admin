"use client";
import React from "react";
import {useState} from "react";
import {CartCheckFill} from '@styled-icons/bootstrap/CartCheckFill'
import useCartValue from '../../../contexts/cartValue'


const Manualorderitem = (props) => {
    const { foodname, foodimg, fooding, foodprice, foodavlb} = props;
    const { addToCart} = useCartValue();
    const [isAdded, setIsAdded] = useState(false);

    const handleClick = ()=>{
      addToCart(foodname,foodprice);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1000);
    }
  
    return (
      <>
         <div className=' flex flex-col justify-end align-middle w-48 h-[32vh] bg-[#161616] p-2 mx-4 my-2 rounded-xl'>
         

          <h1 className='text-md mx-auto text-center mb-2'>{foodname}</h1>
          <img src={foodimg ? foodimg : '/noimage.png'} alt="loading food image"
          className="w-20 h-20 mx-auto" />

          

            <p className='text-center text-xs mt-2 text-wrap  px-4'>{fooding}</p>
            <p className='mx-auto text-center text-xl mt-3'> Price:{foodprice}/- </p>
             
            
              <button  className={` text-black p-1 rounded-xl hover:bg-blue-200 duration-100 active:bg-green-400 ${isAdded ? 'animate-ping' : 'bg-blue-100'}`} onClick={handleClick}><CartCheckFill
                size={16} color="black"/> Add </button>
        </div>
      </>
    );
  };
  
  export default Manualorderitem;