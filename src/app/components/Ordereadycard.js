"use client";
import React from "react";
import useReadyOrderList from "../../../contexts/readyOrderList";
import {IndianRupeeSign} from '@styled-icons/fa-solid/IndianRupeeSign';
import {Cross} from '@styled-icons/entypo/Cross'

const Ordereadycard = (props) => {
  const { orderId, refId, name, contact, order, amount, dailycount } = props;
  const {orderTakenAway} = useReadyOrderList();

  const handleCross = ()=>{
    orderTakenAway(orderId);
  }

  return (
    <>
      <div className="bg-[#161616] py-1 pb-3 px-3 my-2 mx-4 rounded-lg shadow w-[18vw] h-[34vh] flex-shrink-0">
        <button onClick={handleCross}><Cross size={20} color="red"/></button>
        <h2 className="text-lg text-white text-center my-1 mb-2">Order ready for <span className="font-bold">{name}</span></h2>
        <h1 className="text-lg text-center mx-auto align-middle text-white mb-1">OrderNum: {dailycount}</h1>

        <div className="bg-black p-0.5 rounded shadow">
          <div className="border-t border-white w-full h-1 hover:border-gray-300"></div>
          <div className="h-[12vh]">
            <p className="text-white px-2 p-1">{order}</p>
          </div>
        </div>

        <p className="p-2 border-t border-b border-white w-full rounded-sm shadow-md text-center bg-black text-l font-bold text-white">
          <IndianRupeeSign size={20} color="green" /> Amount paid: {amount}
        </p>
        <p className="p-2 border-t w-full rounded-sm shadow-md text-center text-sm font-bold text-white">
          Call: {contact}
        </p>
      </div>
    </>
  );
};

export default Ordereadycard;
