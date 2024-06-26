"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import useOrderStore from '../../contexts/orderStore';
import useLiveOrderList from '../../contexts/liveOrderList';
import useReadyOrderList from '../../contexts/readyOrderList';
import { useEffect,useState } from "react";

import {io} from 'socket.io-client';


const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "pP | admin panel",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {


  const { dailyOrderCount , incrementDailyOrderCount,dailyRevenue,updateRevenue } = useOrderStore();
  const {orders ,setOrders} = useLiveOrderList();
  const {readyOrders} = useReadyOrderList();
  
  
  const [socket,setsocket] = useState(undefined)
 
    
    useEffect(() => { 
     const  socket = io('https://afosfr-server.onrender.com/'); 
      setsocket(socket);
  
      socket.on("fetchOrder",(data)=>{
        incrementDailyOrderCount();
        updateRevenue(data.amount);

         setOrders(data,dailyOrderCount+1);
        //  console.log(orders);
       })
       return () => {
        socket.off("fetchOrder"); // Cleanup socket event listener on component unmount
      };
    },[dailyOrderCount, incrementDailyOrderCount,dailyRevenue,updateRevenue, setOrders, readyOrders]);

  return (
    <html lang="en">
       <head>
       <title>pP | admin panel</title>
       <link rel="icon" href="/logo.png"  type="image/png" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/cloudinary/1.11.1/cloudinary.min.js"></script> {/* Added the script tag here */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Other meta tags and link tags can go here */}
      </head>
      <body className={inter.className}> 
    
        {children}
     
        </body>
    </html>
  );
}
