"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useSession ,signOut} from "next-auth/react";
import { useRouter } from "next/navigation";
import {Link} from "next/link";
import  useAdminDataStore  from '../../../contexts/adminDataStore';
import CryptoJS from 'crypto-js';

const Page = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const {setAdminDataFromLocalStorage} = useAdminDataStore();
    const [step, setStep] = useState(1);
    const [selectedPlan, setSelectedPlan] = useState(""); // State for selected subscription plan

  const [formData, setFormData] = useState({
    admin_name: session?.user?.name || "noname",
    contact: "",
    password: "",
    shop_name: "",
    sub_end: "",
    shop_id: "",
    email: session?.user.email || "",
    apikey:"",
    apisecret:"",
  });

  useEffect (() => {
    if (!session) {
        router.push('/');
    }
},[session])

  const handlebacktohomepage = async ()=>{
        await signOut({
          redirect: true,  // Ensure redirect happens after sign out
          callbackUrl: '/',  // Redirect user to homepage after logout
        });

  }

//   function encryptData(data, secret) {
//     const iv = cryptoJS.enc.Hex.parse('00000000000000000000000000000000'); // 16-byte IV
//     const encrypted = cryptoJS.AES.encrypt(data, cryptoJS.enc.Utf8.parse(secret), {
//         iv: iv,
//         mode: cryptoJS.mode.CBC,
//         padding: cryptoJS.pad.Pkcs7
//     });

//     return encrypted.toString();
// }

  const handlePayment =  async () => {
    // Validate input fields except shop_id
    const { admin_name, contact, password, shop_name, sub_end, email,apikey,apisecret } = formData;
  
    if (!admin_name || !contact || !password || !shop_name || !sub_end || !email || !apikey || !apisecret) {
      alert("All fields must be filled out!");
      return;
    }
    if(admin_name.length < 3) {
      alert("Name must be at least 3 characters long");
      return;
    }
    if(contact.length !== 10) {
      alert("Contact number must be 10 digits long");
      return;
    }
    if(password.length < 4) {
      alert("Password must be at least 6 characters long");
      return;
    }
    if(shop_name.length < 3) {
      alert("Shop name must be at least 3 characters long");
      return;
    }
    if(apikey.length < 3) {
      alert("API Key must be at least 3 characters long");  return;}
    if(apisecret.length < 3){
      apikey("API Secret must be at least 3 characters long"); return;  
    }
    //! system to check weather api keys are correct

    const passKey = prompt("Enter The Pass Key To Continue");
    if(passKey !== process.env.NEXT_PUBLIC_ON_BOARD_KEY) {
      alert("INCORRECT KEY");
      return;
    }
    // Generate a unique shop_id
    const currentDate = new Date();
    const datePart = `${currentDate.getFullYear()}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}`;
    const last4Digits = contact.slice(-4);
    const uniqueChar = Math.random().toString(36).substring(2, 5); // Generate 3 random characters
  
    const sanitizedShopName = shop_name.replace(/\s+/g, ''); // Remove all spaces
    const generate_shop_id = `${datePart}${last4Digits}${sanitizedShopName}${uniqueChar}`;
    console.log("my shop id is",generate_shop_id);

   
    // encrypt api key and apisecret key
   
    // const encryptedApiKey = encryptData(apikey,process.env.NEXT_PUBLIC_SECRET_KEY_CF);
    // const encryptedApiSecret = encryptData(apisecret,process.env.NEXT_PUBLIC_SECRET_KEY_CF);
   
    // Set the shop_id in formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      shop_id: generate_shop_id,
      // apikey: encryptedApiKey,
      // apisecret: encryptedApiSecret,
    }));

    const newFormData = {
      ...formData,
      shop_id: generate_shop_id,
      // apikey: encryptedApiKey,
      // apisecret: encryptedApiSecret
    };
  
    // Call the API to save data
    try {
     
      const response = await fetch('/api/onboarduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFormData),  // Use the updated form data with shop_id
      });
  
      const data = await response.json();
  
      if (data.ok) {
        
        localStorage.setItem("adminData", JSON.stringify(data.newAdmin));  
        setAdminDataFromLocalStorage();  
        //! Not setting the admin and local data in the store
        alert("Admin created successfully! Redirecting To Your Dashboard...");
        router.replace('/dashboard');

      } else {
        alert("Failed to create admin. Please try again once.");
      }
    } 
    
    catch (error) {
      console.error("Error during admin creation:", error);
    }

  };
  


const handlePlanSelect = (plan) => {
  setSelectedPlan(plan);

  // Set sub_end based on selected plan
  let endDate = new Date();
  if (plan === "1 month") {
    endDate.setMonth(endDate.getMonth() + 1);
  } else if (plan === "6 months") {
    endDate.setMonth(endDate.getMonth() + 6);
  } else if (plan === "1 year") {
    endDate.setFullYear(endDate.getFullYear() + 1);
  }

  setFormData((prevFormData) => ({
    ...prevFormData,
    sub_end: endDate.toISOString().split("T")[0], // Format as 'YYYY-MM-DD'
  }));
};
  

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-black h-screen w-screen flex items-center justify-center">
      <Tilt
        className="flex w-9/12 h-4/5 rounded-lg overflow-hidden shadow-lg"
        tiltMaxAngleX={1}
        tiltMaxAngleY={1}
        perspective={1500}
        transitionSpeed={2000}
        // scale={1.1}
        glareEnable={true}
        glareMaxOpacity={0.15}
        glareColor="#243B55"
        glarePosition="left"
        glareBorderRadius="3px"
      >
        {/* Left Side: Welcome Section */}
        <div className="w-1/2 bg-[#0000008d] p-8 flex flex-col justify-center text-left">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-[#ffffff] font-bold text-3xl -mt-52 mb-4">
              Welcome to
            </h1>
            <h3 className="text-[#d1f6ff] text-5xl mt-5 font-extrabold tracking-widest ">
              Palate Prestige
            </h3>
            <p className="text-[#ffffff] text-md mt-7">
              Join us in simplifying food management. Set up your admin account,
              subscribe, and manage your restaurant with ease!
            </p>
            <button className="text-blue-500 mt-5 underline" onClick={handlebacktohomepage}>back to main page</button>
         
          </motion.div>
        </div>

        {/* Right Side: Form Section */}
        <div className="w-1/2 bg-gradient-to-r from-[#141E30] to-[#243B55] px-8 py-3 flex flex-col justify-between relative">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Timeline - Circular Numbers without Vertical Lines */}
            <div className="flex justify-center mt-4 mb-2 relative items-center space-x-6">
              {Array.from({ length: 6 }, (_, index) => (
                <div key={index} className="flex flex-col items-center z-10">
                  <div
                    className={`h-12 w-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      step >= index + 1
                        ? "bg-[#ECDFCC] border-[#ffffff]"
                        : "bg-transparent border-[#ffffff]"
                    }`}
                  >
                    <span
                      className={`text-xl font-bold ${
                        step >= index + 1 ? "text-black" : "text-[#ECDFCC]"
                      }`}
                    >
                      {index + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {step === 1 && (
              <motion.div
                key={step} // To trigger re-animation on step change
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 50 }}
                className="flex flex-col items-center"
              >
                <p className="text-[#fdfdfd] font-bold font-mono text-2xl mt-10 mb-6 text-center">
                  Hi {formData.admin_name}, let's proceed with taking some essential information!
                </p>
              </motion.div>
            )}

            {step > 1 && (
              <motion.div
                key={step} // To trigger re-animation on step change
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 50 }}
                className="flex flex-col items-center"
              >
                <p className="text-[#fdfdfd] font-bold font-mono text-2xl mt-10 mb-6 text-center">
                  {step === 2 && "Enter Your Contact Number"}
                  {step === 3 && "Set The Password"}
                  {step === 4 && "What’s Your Shop’s Title? 🤔"}
                  {step === 5 && "Your CashFree details:) 🤑"}
                  {step === 6 && "Almost There :)"}
                </p>

                {step === 2 && (
                  

                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    maxLength={10}
                    minLength={10}
                    placeholder="Enter admin contact"
                    className="p-3 mt-40 w-[80%] text-white text-lg bg-transparent border-b-2 border-[#ECDFCC] mb-4 focus:outline-none placeholder-[#ffffff] transition-colors text-center"
                  />
               
                )}
                {step === 3 && (
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    minLength={4}
                    maxLength={20}
                    placeholder="Set your password"
                    className="p-3 mt-40 w-[80%] text-white text-lg bg-transparent border-b-2 border-[#ECDFCC] mb-4 focus:outline-none placeholder-[#ffffff] transition-colors text-center"
                  />
                )}
                {step === 4 && (
                  <input
                    type="text"
                    name="shop_name"
                    value={formData.shop_name}
                    onChange={handleInputChange}
                    minLength={3}
                    maxLength={60}
                    placeholder="Enter shop name"
                    className="p-3 mt-40 w-[80%] text-white text-lg bg-transparent border-b-2 border-[#ECDFCC] mb-4 focus:outline-none placeholder-[#ffffff] transition-colors text-center"
                  />
                )}

                {step === 5 && (
                  <div classname="flex flex-col justify-center align-center"> 
                     {/* <span> if you dont have cashfree yet then create account there <Link href="https://www.cashfree.com/" className="text-[#ECDFCC]">Cashfree</Link></span> */}

                  <input
                    type="text"
                    name="apikey"
                    value={formData.apikey}
                    onChange={handleInputChange}
                    minLength={4}
                    // maxLength={20}
                    placeholder="cashfree Api key"
                    className="p-3 mt-20 w-[80%] text-white  text-lg bg-transparent border-b-2 border-[#ECDFCC] mb-4 ml-10 focus:outline-none placeholder-[#ffffff] transition-colors text-center"
                  />
                  <input
                  type="text"
                  name="apisecret"
                  value={formData.apisecret}
                  onChange={handleInputChange}
                  minLength={4}
                  // maxLength={20}
                  placeholder="cashfree Api secret"
                  className="p-3  w-[80%] text-white text-lg bg-transparent border-b-2 border-[#ECDFCC] mb-4 ml-10 focus:outline-none placeholder-[#ffffff] transition-colors text-center"
                  />
                  </div>
                )}
                {step === 6 && (
                <div className="flex flex-col items-center mt-28 mb-4">
                    <p className="text-xl font-bold text-[#ECDFCC] mb-4">
                    Choose Your Subscription Plan
                    </p>
                    <div className="flex space-x-4">
                    {/* Card for 1 Month Subscription */}
                    <div
                        className={`border p-4 rounded-lg text-center cursor-pointer transition-transform transform hover:scale-105 ${
                        selectedPlan === "1 month" ? "bg-[#2c3e50] text-white" : "bg-transparent text-[#ECDFCC]"
                        }`}
                        onClick={() => handlePlanSelect("1 month")}
                    >
                        <h2 className="text-lg font-semibold">1 Month</h2>
                        <p className="text-sm">Sub End: {new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString()}</p>
                    </div>

                    {/* Card for 6 Month Subscription */}
                    <div
                        className={`border p-4 rounded-lg text-center cursor-pointer transition-transform transform hover:scale-105 ${
                        selectedPlan === "6 months" ? "bg-[#2c3e50] text-white" : "bg-transparent text-[#ECDFCC]"
                        }`}
                        onClick={() => handlePlanSelect("6 months")}
                    >
                        <h2 className="text-lg font-semibold">6 Months</h2>
                        <p className="text-sm">Sub End: {new Date(new Date().setMonth(new Date().getMonth() + 6)).toLocaleDateString()}</p>
                    </div>

                    {/* Card for 1 Year Subscription */}
                    <div
                        className={`border p-4 rounded-lg text-center cursor-pointer transition-transform transform hover:scale-105 ${
                        selectedPlan === "1 year" ? "bg-[#2c3e50] text-white" : "bg-transparent text-[#ECDFCC]"
                        }`}
                        onClick={() => handlePlanSelect("1 year")}
                    >
                        <h2 className="text-lg font-semibold">1 Year</h2>
                        <p className="text-sm">Sub End: {new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString()}</p>
                    </div>
                    </div>
                    <button
                    className="mt-6 bg-[#000000] border border-[#ECDFCC] p-2 w-full rounded-lg text-[#ECDFCC] hover:bg-[#181C14] transition-colors"
                    onClick={handlePayment}
                    disabled={!selectedPlan} // Disable if no plan is selected
                    >
                    Proceed to Payment
                    </button>
                        <button
                    onClick={handlePrevStep}
                    className="flex items-center mt-4 justify-center bg-black p-2 rounded-md text-white hover:bg-[#2f2f2f] transition-colors transform hover:scale-105"
                    >
                    <FaArrowLeft className="mr-2" />
                    Previous
                    </button>
                </div>
                )}
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="absolute -bottom-40 w-full flex justify-between px-8 ">
              {step > 1 && step<6 && (
                <button
                  onClick={handlePrevStep}
                  className="flex items-center justify-center bg-black p-2 rounded-md text-white hover:bg-[#2f2f2f] transition-colors transform hover:scale-105"
                >
                  <FaArrowLeft className="mr-2" />
                  Previous
                </button>
              )}
              {step < 6 && (
                <button
                  onClick={handleNextStep}
                  className="flex items-center justify-center bg-black p-2 px-4 rounded-md text-white hover:bg-[#6d6d6d26] hover:border  transition-colors transform hover:scale-105 duration-150"
                >
                  Next
                  <FaArrowRight className="ml-2" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </Tilt>
    </div>
  );
};

export default Page;
