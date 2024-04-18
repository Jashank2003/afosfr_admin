"use client";
import React from "react";
import Link from 'next/link'
import { Dashboard } from "@styled-icons/material-rounded/Dashboard";
import { PiggyBank } from "@styled-icons/fa-solid/PiggyBank";
import { LocationFood } from "@styled-icons/zondicons/LocationFood";
import { Analytics } from "@styled-icons/material-rounded/Analytics";
import { History } from "@styled-icons/material-rounded/History";
import { Settings } from "@styled-icons/evaicons-solid/Settings";

const Navbar = () => {
  return (
    <>
      <div className="flex flex-col bg-[#161616] w-72 h-screen">
        {/* four flex items */}
        <div className=" -mb-16 mt-1">
          <img
            src="logo.png"
            alt="logo of the company"
            className="w-72 h-72  m-auto"
          />
        </div>

        <div className="flex flex-col mb-3 p-2  m-auto">
            <Link href="/"className="text-white font-semibold my-3 p-2 w-40 flex items-center  rounded-2xl hover:bg-[#50607D] duration-150 focus:bg-[#50607D]">{" "}<Dashboard
              size={26}
              color="#B9B9B9"
              style={{ marginRight: "4px" }}
            />{" "}
            Dashboard</Link>
          {/* if active true color ko white krna hai */}

          <Link href="/liveorders" className="text-white font-semibold my-3 p-2 w-40 flex items-center  rounded-2xl hover:bg-[#50607D] duration-150 focus:bg-[#50607D]">
          {" "}<PiggyBank
              size={26}
              color="#B9B9B9"
              style={{ marginRight: "4px" }}
            />{" "}
            Live orders
          </Link>
          <Link href="/foodstock" className="text-white font-semibold my-3 p-2 w-40 flex items-center  rounded-2xl hover:bg-[#50607D] duration-150 focus:bg-[#50607D]">
            <LocationFood
              size={26}
              color="#B9B9B9"
              style={{ marginRight: "4px" }}
            />{" "}
            Food Stock
          </Link>
          <Link href="/sales" className="text-white font-semibold my-3 p-2 w-40 flex items-center  rounded-2xl hover:bg-[#50607D] duration-150 focus:bg-[#50607D]">
            <Analytics
              size={26}
              color="#B9B9B9"
              style={{ marginRight: "5px" }}
            />{" "}
            Analytics
          </Link>
          <Link href="#" className="text-white font-semibold my-3 p-2 w-40 flex items-center  rounded-2xl hover:bg-[#50607D] duration-150 focus:bg-[#50607D]">
            <History size={26} color="#B9B9B9" style={{ marginRight: "5px" }} />{" "}
            History
          </Link>
        </div>

        <div className="w-48 m-auto">
          <hr />
        </div>

        <div className="flex flex-col mb-12 p-2  m-auto">
          <Link href="#" className="text-white font-semibold  p-2 w-40 flex items-center  rounded-2xl hover:bg-[#50607D] duration-150 focus:bg-[#50607D]">
            <Settings
              size={26}
              color="#B9B9B9"
              style={{ marginRight: "4px" }}
            />{" "}
            Settings
          </Link>
          </div>
      </div>
    </>
  );
};

export default Navbar;
