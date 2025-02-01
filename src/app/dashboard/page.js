"use client"
import React from 'react'
import {useState,useEffect} from 'react'
import Link from 'next/link'
import { CldUploadWidget } from 'next-cloudinary';
import { getCldImageUrl } from 'next-cloudinary';
import useOrderStore from '../../../contexts/orderStore';
import useLiveOrderList from '../../../contexts/liveOrderList';
import useReadyOrderList from '../../../contexts/readyOrderList';
import Navbar from '../components/Navbar';
import {PencilSquare} from '@styled-icons/bootstrap/PencilSquare';
import {Reset} from '@styled-icons/boxicons-regular/Reset';
import {PersonMoney} from '@styled-icons/fluentui-system-filled/PersonMoney';
import {BarChart } from "styled-icons/feather";



import JoyrideTour from '../components/JoyrideTour';

const page = () => {

  const { dailyOrderCount , resetDailyOrderCount ,incrementDailyOrderCount,
    dailyRevenue, updateRevenue,resetDailyRevenue,
    ordersServedToday, resetOrdersServedToday 
  } = useOrderStore();
  const {resetLiveOrderList} = useLiveOrderList();
  const {clearReadyOrderList} = useReadyOrderList();
  const [isHydrated , setIsHydrated] = useState(false);

  /// The Tutorial For our PP
  const steps = [
    {
      target: "body",
      content:
        "Welcome to PalatePrestige 🎉! Let us guide you through the key features to get started.",
      placement: "center",
    },
    {
      target: "body",
      content:
        "This is your Dashboard. It provides an overview of daily stats, helping you stay on top of your business performance.",
      placement: "center",
    },
    {
      target: ".third-step",
      content:
        "Here’s the Navigation Bar. Use it to quickly switch between pages like Inventory, Live Orders, and Analytics.",
      placement: "right",
    },
    {
      target: ".fourth-step",
      content:
        "This button opens the Live Order Tracking page. Manage and monitor orders in real time—accept or decline as needed.",
      placement: "right",
    },
    {
      target: ".fifth-step",
      content:
        "The Inventory button takes you to the Inventory Management page. Add menu items, manage stock, and organize your offerings.",
      placement: "right",
    },
    {
      target: ".sixth-step",
      content:
        "This button directs you to the Sales Analytics page, where you can review your sales data and make data-driven decisions.",
      placement: "right",
    },
    {
      target: ".seventh-step",
      content:
        "Use this button to access the Order History page. View and analyze all completed orders in one place.",
      placement: "right",
    },
    {
      target: ".eighth-step",
      content:
        "The Settings button takes you to your Profile page. Manage subscriptions, update preferences, and customize your account.",
    },
    {
      target: "body",
      content:
        "That’s all for now! Start by adding menu items in Inventory, generate QR codes, and place them where needed. Let PalatePrestige handle the rest!",
      placement: "center",
    },
  ];

  const updateTutorialStatus = async (status) => {
    const adminData = JSON.parse(localStorage.getItem("adminData"));
    adminData.tutorialDone = status;

    // Update localStorage
    localStorage.setItem("adminData", JSON.stringify(adminData));

    // Update in database using fetch
    try {
      const response = await fetch("/api/updatetutorial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tutorialDone: status , shop_id: adminData?.shop_id }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update status: ${response.statusText}`);
      }

      console.log("Tutorial status updated successfully.");
    } catch (error) {
      console.error("Error updating tutorial status:", error);
    }
  };

  
  useEffect(() => {
    setIsHydrated(true);
  },[]);

  const resetOrder = async ()=>{

    confirm("Are You Sure you want to done for the day");
    //TODO: Logic of saving data of the day for further analysis main comp . is dailyrevenue and orderse served today
    const adminData = await JSON.parse(localStorage.getItem('adminData'));
    const shop_id = adminData?.shop_id;
    console.log('dashboard shop_id:', shop_id);
    const saleUpdate = {
      "shop_id":shop_id ,
      "date": new Date().toISOString().split("T")[0],
      "totalRevenue": dailyRevenue,
      "totalOrders": ordersServedToday,
      "avgOrderValue": dailyRevenue/ordersServedToday,
      "topSellingItems": [],
    }

    const response = await fetch('/api/updatedailysales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(saleUpdate),
      })

      if(response.ok){
        console.log(" sales data updated");
      }

    resetDailyOrderCount();
    resetDailyRevenue();
    resetLiveOrderList();
    clearReadyOrderList();
    resetOrdersServedToday();

  }
  // const [publicId, setPublicId] = useState('');

  return (
    <>
    <JoyrideTour steps={steps} updateTutorialStatus={updateTutorialStatus}/>
    <div className='flex bg-black '>
       <Navbar/>

    <div className=' mx-4 h-screen overflow-scroll grow overflow-x-hidden overflow-y-hidden text-white'>
    <button onClick={resetOrder}> 
                  <Reset size={30} title='Done for the day?' className='absolute mt-12 mx-2'/>
          </button>
      <h1 className='my-8 text-center text-4xl tracking-wider'>
     
          ADMIN PANEL</h1>

      <div className='mini-sales-cards flex mt-12 justify-evenly '>
        <div className=' flex flex-col align-middle w-48 h-52 bg-[#161616] p-2 mx-2 rounded-xl'>
          
          <PencilSquare size={42} className='mx-auto my-5 '/>
          <div>
            
            <p className='mx-auto text-center text-2xl mb-4'> {ordersServedToday} </p>
            <p className='text-center'> Orders serverd today </p>
          </div>
        </div>

        <div className='  my-first-step flex flex-col align-middle w-48 h-52 bg-[#161616] p-2 mx-2 rounded-xl'>
          
          <PersonMoney size={42} color='red' className='mx-auto my-5 '/>
          <div>
            
            <p className='mx-auto text-center text-2xl mb-4'> {dailyRevenue} </p>
            <p className='text-center'> revenue today</p>
          </div>
        </div>
        <div className=' flex flex-col align-middle w-48 h-52 bg-[#161616] p-2 mx-2 rounded-xl'>
          <BarChart size={40} className='mx-auto my-5 '/>
          <div>
            
            <p className='mx-auto text-center text-2xl mb-4 text-white'>`{{dailyRevenue}/{ordersServedToday}}`</p>
            <p className='text-center'>Avg. Order Value</p>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default page

 
