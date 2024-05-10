"use client";
import React from "react";
import {useState} from "react";
import Link from 'next/link'
import { useRouter ,usePathname } from 'next/navigation';


import { Dashboard } from "@styled-icons/material-rounded/Dashboard";
import { PiggyBank } from "@styled-icons/fa-solid/PiggyBank";
import { LocationFood } from "@styled-icons/zondicons/LocationFood";
import { Analytics } from "@styled-icons/material-rounded/Analytics";
import { History } from "@styled-icons/material-rounded/History";
import { Settings } from "@styled-icons/evaicons-solid/Settings";
import { ArrowBarLeft } from "@styled-icons/bootstrap/ArrowBarLeft";
import { ArrowRight} from "@styled-icons/bootstrap/ArrowRight";




const Navbar = () => {

  const pathname = usePathname();
  const [showNavbar, setShowNavbar] = useState(true);
  // 
  const handleClick = () => {
    setShowNavbar(!showNavbar);
  };



  return (
    <> 
        <div> 

      {showNavbar && (
        <div className={`relative flex flex-col bg-[#161616] w-72 h-screen `}> 
      {/* ${showNavbar ?'':'-translate-x-72 '} */}
        {/* four flex items */}
        <div className=" -mb-16 mt-1">
          <button onClick={handleClick} className="p-2  ml-2 mt-2 rounded-lg   w-10 hover:bg-[#50607D] "><ArrowBarLeft size={26} color="white"/></button>
          <img
            src="logo.png"
            alt="logo of the company"
            className="w-72 h-72  m-auto -mb-2"
            />
        </div>

        <div className="flex flex-col mb-3 p-2  m-auto">
            <Link href="/"className={`text-white font-semibold my-3 p-2 w-40 flex items-center rounded-2xl hover:bg-[#50607D] duration-200 ${pathname === '/' ? 'bg-[#50607D]' : ''}`}>{" "}<Dashboard
              size={26}
              color="#B9B9B9"
              style={{ marginRight: "4px" }}
            />{" "}
            Dashboard</Link>
          {/* if active true color ko white krna hai */}

          <Link href="/liveorders" className={`text-white font-semibold my-3 p-2 w-40 flex items-center rounded-2xl hover:bg-[#50607D] duration-200 ${pathname === '/liveorders' ? 'bg-[#50607D]' : ''}`}>
          {" "}<PiggyBank
              size={26}
              color="#B9B9B9"
              style={{ marginRight: "4px" }}
              />{" "}
            Live orders
          </Link>
          <Link href="/foodstock" className={`text-white font-semibold my-3 p-2 w-40 flex items-center rounded-2xl hover:bg-[#50607D] duration-200 ${pathname === '/foodstock' ? 'bg-[#50607D]' : ''}`}>
            <LocationFood
              size={26}
              color="#B9B9B9"
              style={{ marginRight: "4px" }}
            />{" "}
            Inventory
          </Link>
          <Link href="/sales" className={`text-white font-semibold my-3 p-2 w-40 flex items-center rounded-2xl hover:bg-[#50607D] duration-200 ${pathname === '/sales' ? 'bg-[#50607D]' : ''}`}>
            <Analytics
              size={26}
              color="#B9B9B9"
              style={{ marginRight: "5px" }}
              />{" "}
            Analytics
          </Link>
          <Link href="/ordershistory" className={`text-white font-semibold my-3 p-2 w-40 flex items-center rounded-2xl hover:bg-[#50607D] duration-200 ${pathname === '#' ? 'bg-[#50607D]' : ''}`}>
            <History size={26} color="#B9B9B9" style={{ marginRight: "5px" }} />{" "}
            History
          </Link>
        </div>

        <div className="w-48 m-auto">
          <hr />
        </div>

        <div className="flex flex-col mb-12 p-2  m-auto">
          <Link href="#" className={`text-white font-semibold  p-2 w-40 flex items-center rounded-2xl hover:bg-[#50607D] duration-200 ${pathname === '/#' ? 'bg-[#50607D]' : ''}`}>
            <Settings
              size={26}
              color="#B9B9B9"
              style={{ marginRight: "4px" }}
              />{" "}
            Settings
          </Link>
          </div>
      </div>
    )}
      {/* Short navbar starts  */}

      {!showNavbar && (
        <div className={` relative flex flex-col bg-[#161616] w-14 h-screen rounded-r-sm `}>
        {/* ${showNavbar? 'opacity-0 ':'opacity-100'} */}
        {/* four flex items */}
        <div className=" -mb-16 mt-1 h-24">
          <button onClick={handleClick} className="p-2  ml-2 mt-2 rounded-lg   w-10 hover:bg-[#50607D] "><ArrowRight size={26} color="white"/></button>
        </div>
        
        <div className="flex flex-col mb-3 p-2  m-auto">
            <Link href="/"className={`text-white font-semibold my-3 p-1.5 w-10 flex items-center rounded-2xl hover:bg-[#50607D] duration-200 ${pathname === '/' ? 'bg-[#50607D]' : ''}`}>{" "}<Dashboard
              size={28}
              color="#B9B9B9"
              style={{ marginRight: "4px" }}
            /></Link>
          {/* if active true color ko white krna hai */}

          <Link href="/liveorders" className={`text-white font-semibold my-3 p-1.5 w-10 flex items-center rounded-2xl hover:bg-[#50607D] duration-200 ${pathname === '/liveorders' ? 'bg-[#50607D]' : ''}`}>
          {" "}<PiggyBank
              size={28}
              color="#B9B9B9"
              style={{ marginRight: "4px" }}
              />
          </Link>
          <Link href="/foodstock" className={`text-white font-semibold my-3 p-1.5 w-10 flex items-center rounded-2xl hover:bg-[#50607D] duration-200 ${pathname === '/foodstock' ? 'bg-[#50607D]' : ''}`}>
            <LocationFood
              size={28}
              color="#B9B9B9"
              style={{ marginRight: "4px" }}
            />
          </Link>
          <Link href="/sales" className={`text-white font-semibold my-3 p-1.5 w-10 flex items-center rounded-2xl hover:bg-[#50607D] duration-200 ${pathname === '/sales' ? 'bg-[#50607D]' : ''}`}>
            <Analytics
              size={28}
              color="#B9B9B9"
              style={{ marginRight: "5px" }}
              />
          </Link>
          <Link href="#" className={`text-white font-semibold my-3 p-1.5 w-10 flex items-center rounded-2xl hover:bg-[#50607D] duration-200 ${pathname === '#' ? 'bg-[#50607D]' : ''}`}>
            <History size={28} color="#B9B9B9" style={{ marginRight: "5px" }} />
          </Link>
        </div>

        <div className="w-12 m-auto">
          <hr />
        </div>

        <div className="flex flex-col mb-12 p-2  m-auto">
          <Link href="#" className={`text-white font-semibold  p-1.5 w-10 flex items-center rounded-2xl hover:bg-[#50607D] duration-200 ${pathname === '/#' ? 'bg-[#50607D]' : ''}`}>
            <Settings
              size={28}
              color="#B9B9B9"
              style={{ marginRight: "4px" }}
              />
          </Link>
          </div>
      </div>  
      )}
      </div>
    </>
  );
};

export default Navbar;
