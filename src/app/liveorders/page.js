"use client"
import {React , useState , useEffect} from 'react'
import Navbar from '../components/Navbar';
import useOrderStore from '../../../contexts/orderStore';
import Livecard from '../components/Livecard';
import Ordereadycard from '../components/Ordereadycard';
import {io} from 'socket.io-client';

const page = () => {
  
  
  const { dailyOrderCount , incrementDailyOrderCount } = useOrderStore();
  const [socket,setsocket] = useState(undefined)
  const [orders, setOrders] = useState([]);
 
    // incrementDailyOrderCount();
    useEffect(() => { 
     const  socket = io('https://afosfr-server.onrender.com/'); //https://afosfr-server.onrender.com/
      setsocket(socket);
  
      socket.on("fetchOrder",(data)=>{
        incrementDailyOrderCount();
        setOrders(prevOrders => [...prevOrders, data]);
        // setOrders(prevOrders => [...prevOrders, { ...data, dailyOrderCount: dailyOrderCount+1 }]);
        // console.log(orders);
        
       })
       return () => {
        socket.off("fetchOrder"); // Cleanup socket event listener on component unmount
      };
    },[]);
    
  return (
    <>
    <div className='flex bg-black'>
       <Navbar/>

    <div className='h-screen overflow-y-hidden grow '>
    <h1 className='text-4xl my-5 ml-4  text-white tracking-wider '>Orders </h1>
     
     {/* <p className='text-white'>{dailyOrderCount}</p> */}
    <div className='my-2 ml-4'> <hr /></div>

    {/* live orderss here */}
    <h1 className='mb-3 text-center text-lg  font-semibold tracking-wide text-white'>Live orders</h1>
    <div className='flex flex-row mx-4 my-4 h-[44vh] overflow-x-auto overflow-y-hidden scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-zinc-400 scrollbar-track-zinc-900 scrollbar-thin scrollbar-corner-zinc-300  '>

   
          {orders.map((order, index) => (
              <Livecard
                key={index} // Assign a unique key for each Livecard
                orderId={order.orderId}
                name={order.name}
                order={order.orders.map(item => `${item.quantity} * ${item.itemName}`).join(", ")}
                amount={order.amount}
                dailycount={dailyOrderCount}
                // dailycount={order.dailyOrderCount}
              />
            ))}
 
    
    </div>
    {/* orders completed here */}
    <div className='my-2 ml-4'> <hr /></div>
    <h1 className='mb-3 text-center text-lg  font-semibold tracking-wide text-white'>Orders Ready</h1>
    <div className='flex  mx-4 my-1 h-[34vh]  '>
    <Ordereadycard/>
    </div>

      
    </div>
    </div>
    </>
  )
}

export default page
