//TODO:  learn useRef and html2canvas

"use client"; 
import React, { useEffect, useState,useRef } from 'react';
import Navbar from '../components/Navbar';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import {QRCodeSVG} from 'qrcode.react';
import html2canvas from 'html2canvas';

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loadingQRCode, setLoadingQRCode] = useState(true); 
  const qrRef = useRef(null);  // Ref for QR code element

  useEffect(() => {
    if (session) {
      const data = JSON.parse(localStorage.getItem('adminData'));
      setUser(data);
      
      // Set QR code value once user data is available
      if (data) {
        setLoadingQRCode(false); 
      }
    }
  }, [session]); 


  const handleLogout = async () => {
    //! do something also logout from google 
    localStorage.clear();
    await signOut({
      redirect: true,  // Ensure redirect happens after sign out
      callbackUrl: '/',  // Redirect user to homepage after logout
    });
  };

  const downloadQRCode = () => {
    const qrElement = qrRef.current; // Get the QR code element reference

    html2canvas(qrElement).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png'); // Convert the canvas to PNG format
      link.download = 'qr-code.png'; // Set the download file name
      link.click(); // Trigger download
    });
  };

  return (
    <>
      <div className='flex bg-black text-white min-h-screen'>
        <Navbar />

        <div className='grow flex justify-center items-center p-8'>
          <div className='bg-gray-900 shadow-lg rounded-lg p-10 w-[600px]'>
            {user ? (
              <>
                <h2 className='text-3xl font-bold text-center mb-6'>
                  Hey {user.admin_name}!
                </h2>

                <div className='flex justify-between items-start'>
                  <div className='space-y-4'>
                    <div>
                      <p className='text-gray-400 font-semibold'>Email:</p>
                      <p>{user.email}</p>
                    </div>
                    <div>
                      <p className='text-gray-400 font-semibold'>Shop ID:</p>
                      <p>{user.shop_id}</p>
                    </div>
                    <div>
                      <p className='text-gray-400 font-semibold'>Subscription End:</p>
                      <p>{user.sub_end}</p>
                    </div>
                  </div>

                  <div ref={qrRef} className='ml-8 p-2 bg-white'>
                    {loadingQRCode ? (
                      <p>Loading QR code...</p>
                    ) : (
                      <QRCodeSVG value={user.shop_id} level="L" size={150} fgColor="black" />
                    )}
                  </div>
                </div>

                <div className='mt-6 flex flex-col space-y-4'>
              <button onClick={downloadQRCode} className='bg-black text-white w-full py-2 rounded hover:bg-gray-800'>
                Download QR Code
              </button>
              <button onClick={handleLogout} className='bg-black text-white w-full py-2 rounded hover:bg-gray-800'>
                Logout
              </button>
              <button className='bg-black text-white w-full py-2 rounded hover:bg-gray-800'>
                Upgrade Plan
              </button>
            </div>
              </>
            ) : (
              <p>Loading user data...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
