"use client"
import "./globals.css";
import { Inter } from "next/font/google";
import { useEffect,useState } from "react";


import {io} from 'socket.io-client';


import useOrderStore from '../../contexts/orderStore';
import useLiveOrderList from '../../contexts/liveOrderList';
import useReadyOrderList from '../../contexts/readyOrderList';
import useAdminDataStore from '../../contexts/adminDataStore';
import {SessionProvider} from 'next-auth/react';

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({children}) {


  const {dailyOrderCount , incrementDailyOrderCount,dailyRevenue,updateRevenue } = useOrderStore();
  const {orders ,setOrders} = useLiveOrderList();
  const {readyOrders} = useReadyOrderList();
  const {setAdminDataFromLocalStorage ,adminData} = useAdminDataStore();
  const [socket,setsocket] = useState(undefined)

    useEffect(()=>{
      if(adminData == null){
        setAdminDataFromLocalStorage();
      }
    },[adminData]);
    
    const shopId = adminData?.shop_id;
    useEffect(() => { 
      
     const  socket = io('https://afosfr-server.onrender.com/'); 
      setsocket(socket);
      
      socket.on("connect", () => {
        if (shopId) {
          console.log(shopId);
          socket.emit("joinRoom", shopId);
        }
      })


      socket.on("fetchOrder",(data)=>{
        incrementDailyOrderCount();
        // updateRevenue(data.amount);

         setOrders(data,dailyOrderCount+1);
        //  console.log(orders);
       })
       return () => {
        socket.off("fetchOrder"); // Cleanup socket event listener on component unmount
      };
    },[shopId,dailyOrderCount, incrementDailyOrderCount,dailyRevenue,updateRevenue, setOrders, readyOrders]);

  return (
    <html lang="en">
       <head>
       <title> pP | admin panel</title>
       <link rel="icon" href="/pplogoblack.png"  type="image/png" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/cloudinary/1.11.1/cloudinary.min.js"></script> {/* Added the script tag here */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Other meta tags and link tags can go here */}
      </head>
      <SessionProvider>
      <body className={inter.className}> 
        {children}
        </body>
    </SessionProvider>
    </html>
  );
}
