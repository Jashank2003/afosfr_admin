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
        <div className="relative flex flex-col justify-between align-middle w-48 h-[32vh] bg-[#161616] hover:bg-gray-800 p-1 mx-4 my-2 rounded-xl transition duration-300 ease-in-out transform hover:scale-105">
          {/* Discount Badge (optional) */}
          <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs rounded px-1">
            20% Off
          </div>
    
          {/* Food Image */}
          <img
            src={foodimg ? foodimg : '/noimage.png'}
            alt="Food Image"
            className="w-full h-28 object-cover rounded-t-lg"
          />
    
          {/* Food Details */}
          <div className="flex flex-col items-center">
            <h1 className="text-md font-semibold text-white text-center mt-2">
              {foodname}
            </h1>
            {/* <p className="text-xs text-gray-400 text-center px-2 mt-1">
              {fooding}
            </p> */}
          </div>
    
          {/* Price and Add to Cart Button */}
          <div className="flex justify-between items-center px-2 mt-1">
            <p className="text-md text-green-400 font-bold">₹{foodprice}</p>
            <p className="text-xs text-green-600 font-medium">Veg</p>
          </div>
    
          <button
            className={`text-black bg-gray-200 hover:bg-transparent hover:text-white hover:border hover:border-gray-400 p-1 w-full mt-2 rounded-lg font-medium transition-colors duration-300 ease-in-out ${isAdded ? 'animate-ping' : ''}`}
            onClick={handleClick}
          >
            <CartCheckFill size={16} color="black" /> Add to Cart
          </button>
        </div>
      </>
    );
    
};
export default Manualorderitem