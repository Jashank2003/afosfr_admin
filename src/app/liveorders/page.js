"use client"
import {React , useState , useEffect} from 'react'
import Navbar from '../components/Navbar';
import useOrderStore from '../../../contexts/orderStore';

const page = () => {


  const { dailyOrderCount , resetDailyOrderCount , incrementDailyOrderCount } = useOrderStore();
  const [localDailyOrderCount, setLocalDailyOrderCount] = useState(dailyOrderCount);

 
    // incrementDailyOrderCount();
  

  return (
    <>
    <div className='flex bg-black'>
       <Navbar/>

    <div className='h-screen overflow-y-hidden grow '>
    <h1 className='text-4xl my-5 ml-4  text-white tracking-wider '>Orders </h1>
     <p className='text-white'>{dailyOrderCount}</p>
    <div className='my-2 ml-4'> <hr /></div>

    {/* live orderss here */}
    <h1 className='mb-3 text-center text-lg  font-semibold tracking-wide text-white'>Live orders</h1>
    <div className='flex mx-4  my-1 h-[34vh] bg-yellow-50 '>

    </div>
    {/* orders completed here */}
    <div className='my-2 ml-4'> <hr /></div>
    <h1 className='mb-3 text-center text-lg  font-semibold tracking-wide text-white'>Orders Ready</h1>
    <div className='flex  mx-4 my-1 h-[34vh] bg-yellow-50 '>

    </div>

      
    </div>
    </div>
    </>
  )
}

export default page
