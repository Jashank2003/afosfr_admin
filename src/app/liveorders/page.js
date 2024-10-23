"use client"
import {React , useState , useEffect} from 'react'
import Navbar from '../components/Navbar';
import Livecard from '../components/Livecard';
import Ordereadycard from '../components/Ordereadycard';

import useOrderStore from '../../../contexts/orderStore';
import useLiveOrderList from '../../../contexts/liveOrderList';
import useReadyOrderList from '../../../contexts/readyOrderList';
import {io} from 'socket.io-client';


const page = () => {
  

  const { dailyOrderCount , incrementDailyOrderCount,dailyRevenue,updateRevenue } = useOrderStore();
  const {orders ,setOrders} = useLiveOrderList();
  const {readyOrders} = useReadyOrderList();
  
  
  const [socket,setsocket] = useState(undefined)

  const [isHydrated, setIsHydrated] = useState(false);
 
    // socket handling in layout.js
    // useEffect(() => { 
    //  const  socket = io('https://afosfr-server.onrender.com/'); 
    //   setsocket(socket);
  
    //   socket.on("fetchOrder",(data)=>{
    //     incrementDailyOrderCount();
    //     updateRevenue(data.amount);

    //      setOrders(data,dailyOrderCount+1);
    //     //  console.log(orders);
    //    })
    //    return () => {
    //     socket.off("fetchOrder"); // Cleanup socket event listener on component unmount
    //   };
    // },[dailyOrderCount, incrementDailyOrderCount,dailyRevenue,updateRevenue, setOrders, readyOrders]);

    useEffect(() => {
      setIsHydrated(true);
    },[]);

    

    if (!isHydrated) {
      return <p className="text center text-white italic mt-20 mx-auto">Loading orders...</p>;
    }
    
  return (
    <>
    <div className='flex bg-black'>
       <Navbar/>

    <div className='h-screen overflow-y-scroll grow '>
    <h1 className='text-4xl my-5 ml-4  text-white tracking-wider '>Orders </h1>
     
   
    <div className='my-2 ml-4'> <hr /></div>

    {/* live orderss here */}
    <h1 className='mb-3 text-center text-lg  font-semibold tracking-wide text-white'>Live orders</h1>
    <div className='flex flex-row mx-4 my-4 h-[44vh] overflow-x-auto overflow-y-hidden scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-zinc-400 scrollbar-track-zinc-900 scrollbar-thin scrollbar-corner-zinc-300  '>

    {orders.length === 0 ?
     (<p className='text center text-white italic mt-20 mx-auto'>No new orders to display</p>) :
          
           orders.map((order, index) => (
            <Livecard
            key={index} // Assign a unique key for each Livecard
            orderId={order.orderId}
            refId={order.refId}
            name={order.name}
            contact={order.contact}
            order={order.orders.map(item => `${item.quantity} * ${item.itemName}`).join(", ")}
            amount={order.amount}
            dailycount={order.ordernum}
            
            />
          ))
         
  
        }
    
    </div>
    {/* orders completed here */}
    <div className='my-2 ml-4'> <hr /></div>
    <h1 className='mb-3 text-center text-lg  font-semibold tracking-wide text-white'>Orders Ready</h1>
    <div className=' flex flex-shrink-0 flex-row mx-4 my-4  h-[40vh] overflow-x-auto  overflow-y-hiddenscrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-zinc-400 scrollbar-track-zinc-900 scrollbar-thin scrollbar-corner-zinc-300 '>
    
   { readyOrders.length == 0 ? (<p className='text center text-white italic mt-20 mx-auto'>No new orders to display</p>) : readyOrders.map((order, index) => (
            <Ordereadycard
            key={index} // Assign a unique key for each Livecard
            orderId={order.orderId}
            refId={order.refId}
            name={order.name}
            contact={order.contact}
            order={order.order}
            amount={order.amount}
            dailycount={order.dailycount}
            
            />
          ))}
    </div>

      
    </div>
    </div>
    </>
  )
}

export default page
