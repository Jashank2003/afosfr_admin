// pages/index.js
"use client"
import { useEffect,useState} from 'react';
import {io} from 'socket.io-client';

export default function Home() {

  const [socket,setsocket] = useState(undefined)
  const [orderdata,setorderdata] = useState("ji");
  const data = "1* pizza";

  useEffect(() => {
    const socket = io('https://afosfr-server.onrender.com/');
    setsocket(socket);

    socket.on("newOrder",(data)=>{
      setorderdata(data);
     })

  }, []);

    
   const handleclick = ()=>{
    socket.emit("newOrder" , data);
   }

   

  return (
    <div>
      <h1>Socket.IO Client</h1>
      <p>{orderdata}</p>
      <button onClick={handleclick} className='bg-red'> click me </button>
      {/* <button onClick={handlegetme} className='bg-red'> get me </button> */}
    </div>
  );
}
