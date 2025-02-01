"use client"
import React from 'react'
import {useState,useEffect} from 'react'
import Navbar from '../components/Navbar';
import { DollarSign, ShoppingCart, BarChart } from "styled-icons/feather";
import useOrderStore from '../../../contexts/orderStore';

import '../../.././chartConfig'
import LineChart from '../components/LineChart';



const page = () => {
  //zustand state
  const { dailyRevenue , ordersServedToday } = useOrderStore();

  //use state
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [loading,setLoading] = useState(false);
  const [ chartData ,setChartData] = useState(null);
  const [ range , setRange] = useState('7 days');
  const [shop_id,setShop_id] = useState(null);
  const [startDate, setStartDate] = useState('');
  // console.log('sales shop_id:', shop_id);
  const [endDate, setEndDate] = useState('');

 
  
  
  
  
  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem('adminData'));
    if (adminData) {
      setShop_id(adminData.shop_id);
    }
  }, []);


  useEffect(() => {
    if (shop_id) {
      fetchSalesData(shop_id, range);
    }
  }, [shop_id, range]);

  const handleCustomRange = () => {
    if (startDate && endDate) {
      // Ensure startDate is before endDate
      if (new Date(startDate) > new Date(endDate)) {
        const temp = startDate;
        setStartDate(endDate);
            setEndDate(temp);
          }
          setRange(`custom:${startDate}:${endDate}`);
        }
        setShowCustomRange(false);
};

    const  fetchSalesData = async ()=>{
      setLoading(true);
      try{
      const response  = await fetch(`/api/updatedailysales?shop_id=${shop_id}&range=${range}`)
      const {data} = await response.json();
      // console.log(data);

      const labels = data.map(item => {
        const date = new Date(item.date);
        return date.toLocaleDateString('en-US', {day: 'numeric',month: 'short', year: 'numeric',weekday: 'short' });
    });
      const totalRevenue = data.map(item => item.totalRevenue);
      const totalOrders = data.map(item => item.totalOrders);
      const avgOrderValue = data.map(item => item.avgOrderValue);

      setChartData({
        labels,
        datasets:[
          {
            label: 'Total Revenue', 
            data : totalRevenue,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.4,
          },
          {
            label: 'Total Orders',
            data : totalOrders,
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            tension: 0.4,
          },
          {
            label: 'Avg Order Value',
            data : avgOrderValue,
            borderColor: 'rgba(255, 159, 64, 1)',
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            tension: 0.4,
          },
        ],
      });
      }
      catch(error){
        console.error("Error fetching data:", error);
      }
      finally{
        setLoading(false);
      }
        
     console.log(chartData);
    } 

  return (
    <>
      <div className='flex'>
        <Navbar/>

            <div className = "h-screen overflow-x-hidden bg-black grow">
              <h1 className = "text-white tracking-wider text-4xl  my-5 ml-4">Analytics</h1>
              <div className = "my-2 ml-4"> <hr/></div>

              <div className="  mt-6 p-3 bg-gray-900 h-[20vh] w-[70vw]  mx-auto align-center rounded-md flex justify-evenly items-center gap-4">
                  {/* Card 1 */}
                  <div className="bg-gray-950 h-[90%] w-[25%] rounded-md flex flex-row justify-between text-white p-3">
                    <div className='flex flex-col justify-items-start'>
                    <h3 className="text-l  text-white">Today's Revenue</h3>
                    <p className="text-xl font-bold mt-1 overflow-auto">Rs.{dailyRevenue}</p>
                    <p className="text-green-400 text-sm mt-1 ">+12.5% from yesterday</p>
                    </div>
                    <DollarSign size={32} className="text-green-400 mb-2 mt-5" />
                  </div>
                  {/* Card 2 */}
                  <div className="bg-gray-950 h-[90%] w-[25%] rounded-md flex flex-row justify-between text-white p-3">
                    <div className='flex flex-col justify-items-start'>
                    <h3 className="text-l  text-white">Total Orders</h3>
                    <p className="text-xl font-bold mt-1 overflow-auto">{ordersServedToday}</p>
                    <p className="text-green-400 text-sm mt-1 ">+5.5% from yesterday</p>
                    </div>
                    <ShoppingCart size={32} className="text-red-400 mb-2 mt-5" />
                  </div>
                  {/* Card 3 */}
                  <div className="bg-gray-950 h-[90%] w-[25%] rounded-md flex flex-row justify-between text-white p-3">
                    <div className='flex flex-col justify-items-start'>
                    <h3 className="text-l  text-white">Avg Order Value</h3>
                    <p className="text-xl font-bold mt-1 overflow-auto">`{{dailyRevenue}/{ordersServedToday}}`</p>
                    <p className="text-green-400 text-sm mt-1 ">+12.5% </p>
                    </div>
                    <BarChart size={32} className="text-orange-400 mb-2 mt-5" />
                  </div>
                </div >


                  {/* Filters  */}
                <div className='flex flex-row justify-end w-[70vw] mx-auto mt-3'>
                    <button className="bg-gray-900 text-white p-2 rounded-md mx-2 hover:bg-gray-700 duration-150" onClick={()=> setRange('7 days')} >Last 7 days</button>
                    <button className="bg-gray-900 text-white p-2 rounded-md mx-2 hover:bg-gray-700 duration-150" onClick={()=> setRange('monthly')} >Monthly</button>
                    <button className="bg-gray-900 text-white p-2 rounded-md mx-2 hover:bg-gray-700 duration-150" onClick={()=> setRange('yearly')} >Yearly</button>
                    <button className="bg-gray-900 text-white p-2 rounded-md mx-2 hover:bg-gray-700 duration-150" onClick={()=> setRange('yearly')} >Yearly</button>

                    <button className="bg-gray-900 text-white p-2 rounded-md mx-2 hover:bg-gray-700 duration-150" onClick={() => setShowCustomRange(true)}>
                    Apply custom range
                    </button>

                    {showCustomRange && (
                      <div className="absolute -mt-6 bg-gray-900 p-2 text-sm rounded-md  text-black">
                        <div className="flex justify-between items-center">
                          <span className="text-white mr-2">Start:</span>
                          <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className='p-0.5 rounded-md'
                          />
                        </div>
                        <div className="flex text-smjustify-between items-center mt-2  ">
                          <span className="text-white mr-2">End :   </span>
                          <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className='p-0.5 rounded-md'
                          />
                        </div>
                        <div className="flex justify-between mt-2">
                          <button
                            className="bg-gray-900 text-white p-2 rounded-md mx-2 hover:bg-gray-700 duration-150"
                            onClick={handleCustomRange}
                          >
                            OK
                          </button>
                          <button
                            className="bg-gray-900 text-white p-2 rounded-md mx-2 hover:bg-gray-700 duration-150 z-50"
                            onClick={()=>setShowCustomRange(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ..graphs chart.js  */}
                <div className={`${loading? 'animate-pulse': ''} mt-2 p-3 bg-gray-900 h-[60vh] w-[70vw]  mx-auto align-center rounded-md`}>
                {chartData ? (
                  <LineChart data={chartData} />
                  ) : (
                    <p className="text-white">Loading data...</p>
                  )}

                </div>

            </div>
      </div>
    </>
  )
}

export default page
