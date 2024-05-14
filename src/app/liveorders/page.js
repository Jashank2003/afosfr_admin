"use client"
import {React , useState , useEffect} from 'react'
import Navbar from '../components/Navbar';
import useOrderStore from '../../../contexts/orderStore';
import Livecard from '../components/Livecard';
import Ordereadycard from '../components/Ordereadycard';
const page = () => {


  // const { dailyOrderCount , resetDailyOrderCount , incrementDailyOrderCount } = useOrderStore();

  const [orderData, setOrderData] = useState(null);
 
    // incrementDailyOrderCount();
   

    
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
    <div className='flex  mx-4 my-4 h-[40vh] overflow-x-auto overflow-y-hidden scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-zinc-400 scrollbar-track-zinc-900 scrollbar-thin scrollbar-corner-zinc-300  '>

    <div>
      {/* <Livecard
        orderId={orderData.orderId}
        name={orderData.name}
        order={orderData.order}
        amount={orderData.amount}
        dailycount={orderData.dailycount}
      /> */}
  </div>
    
    </div>
    {/* orders completed here */}
    <div className='my-2 ml-4'> <hr /></div>
    <h1 className='mb-3 text-center text-lg  font-semibold tracking-wide text-white'>Orders Ready</h1>
    <div className='flex  mx-4 my-1 h-[34vh] bg-yellow-50 '>
    <Ordereadycard/>
    </div>

      
    </div>
    </div>
    </>
  )
}

export default page
