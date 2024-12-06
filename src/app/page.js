"use client"
import Link from 'next/link';
import Image from 'next/image';
import AOS from "aos";
import "aos/dist/aos.css";
import { useSession , signIn} from 'next-auth/react';
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';
import  useAdminDataStore  from '../../contexts/adminDataStore';



import {ReorderThree} from '@styled-icons/ionicons-outline/ReorderThree';
import {NotStarted} from '@styled-icons/material-sharp/NotStarted'
import { Londrina_Sketch, Kranky ,Rubik } from "next/font/google";
import Contactui from './components/Contactui';
import Loaderui from './components/Loaderui';

const kranky = Kranky({ subsets: ["latin"] ,weight: "400" });
const rubik = Rubik({ subsets: ["latin"] ,weight: "400" });
const londrina_Sketch = Londrina_Sketch({ subsets: ["latin"] ,weight: "400" });


function HomePage() {
  
  // states 
  const {setAdminDataFromLocalStorage} = useAdminDataStore();
  const router = useRouter();
  const {data:session} = useSession();
  const [Loading ,setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
 
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [contactname, setContactName] = useState('');
  const [contactemail, setContactEmail] = useState('');
  const [contactquery, setContactQuery] = useState('');


    // useEffects
    useEffect(() => {
      AOS.init({
        duration: 1000, // Animation duration
      });
    }, []);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > lastScrollY) {
          setIsNavbarVisible(false);
        } else {
          setIsNavbarVisible(true);
        }
        setLastScrollY(window.scrollY);
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [lastScrollY]);

    useEffect(() => {
      if (session) {
        handleUserCheck(); 
      }
    }, [session]);


    //functions
    const handleUserCheck = async () => {
      try {
        setLoading(true);
        console.log("Session exists, checking if email exists in the DB");
  
        const response = await fetch('/api/checkuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: session.user.email }), // Use email from the session
        });
  
        const data = await response.json();
        console.log("API response:", data);
        
        if (!data.exists) {
          console.log("User does not exist, redirecting to onboarding page");
          router.push("/onboarding");

        } else {
          //     //! also check if sub doesnt end;
          console.log("User exists, storing user data in localStorage and redirecting to dashboard");
          localStorage.setItem("adminData", JSON.stringify(data.user)); 
          setAdminDataFromLocalStorage();
          router.push("/dashboard");
        }
  
      } catch (err) {
        console.error("Error checking user:", err);
        setLoading(false); // Reset loading in case of error
      }
    };

    const handleLogin = async () => {
      console.log("Session before Get Started click:", session);
      setLoading(true);
  
      if (!session) {
        console.log("No session found, redirecting to sign in");
        await signIn("google"); 
      }
      // Else:  handled by the useEffect hook once available
    };

    const handleContactSubmit = (e)=>{
      e.preventDefault();
      // Handle form submission logic here
      console.log({ contactname, contactemail, contactquery });
    }

  return (
    <>
      {/* Navbar Section */}
      {Loading ? (
      <div className="fixed overflow-x-hidden inset-0 flex flex-col items-center justify-center z-50 bg-black bg-opacity-50 cursor-not-allowed">
        <Loaderui />
        <p className="mt-4 text-gray-500 text-lg font-semibold">Wait a moment...</p>
      </div>
    ) : null}

<nav className={`${rubik.className} overflow-hidden   bg-transparent  hide-scrollbar fixed left-0 right-0 z-20 transition-transform duration-300 ${isNavbarVisible ? 'translate-y-3' : '-translate-y-full'} bg-black flex items-center justify-between px-2 py-8`}>
  {/* Logo */}
  <div className={`${kranky.className} text-white font-extrabold text-2xl ml-5  `}>
    <Link href="#">
      <img src="/ppbgr.png" alt="PP" className="w-20 h-16 top-2  absolute hover:scale-150 duration-300 ease-in-out" />
    </Link>
  </div>

  {/* Links for larger screens */}
  <ul className="hide-scrollbar hidden md:flex space-x-8 text-white">
    <li>
      <Link href="#home" scroll={true} className="hover:text-yellow-400 transition duration-300">Home</Link>
    </li>
    <li>
      <Link href="#features" scroll={true} className="hover:text-yellow-400 transition duration-300">Our POS Features</Link>
    </li>
    <li>
      <Link href="#about" scroll={true} className="hover:text-yellow-400 transition duration-300">About Us</Link>
    </li>
  </ul>

  {/* Contact Button */}
  <div className="hidden md:block">
    <Link href="#contact" scroll={true} className="text-white hover:text-yellow-400 transition duration-300 mr-3">Contact Us</Link>
  </div>

  {/* Mobile Menu Button */}
  <div
  className="hide-scrollbar md:hidden text-white"
  onClick={() => {
    setIsMenuOpen(!isMenuOpen);
    console.log("Menu Open State:", !isMenuOpen);
  }}
>
  <button>
    <ReorderThree size={30} color='white' className='absolute top-4 right-4 z-40'/>
  </button>
</div>

  {/* Mobile Menu */}
  {isMenuOpen && (
    
    <ul className="md:hidden  bg-black   bg-opacity-95 w-[120%] text-center flex flex-col justify-start space-y-10 py-4 z-20">
      <li>
        <Link href="#home" scroll={true} className="text-yellow-400 transition duration-300" onClick={() => setIsMenuOpen(false)}>Home</Link>
      </li>
      <li>
        <Link href="#features" scroll={true} className="text-yellow-400 transition duration-300" onClick={() => setIsMenuOpen(false)}>Our POS Features</Link>
      </li>
      <li>
        <Link href="#about" scroll={true} className="text-yellow-400 transition duration-300" onClick={() => setIsMenuOpen(false)}>About Us</Link>
      </li>
      <li>
        <Link href="#contact" scroll={true} className="text-yellow-400 transition duration-300" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
      </li>
      <li>
        <span href="#contact" scroll={true} className="text-yellow-400 transition duration-300" onClick={() => setIsMenuOpen(false)}>Close menu</span>
      </li>
    </ul>
    

  )}
</nav>


      {/* Main Content */}
      <div className=' hidden md:block h-screen overflow-x-hidden'>

      <div className=" hide-scrollbar relative h-screen flex" id="home">
       
        <div className="w-1/2 bg-black flex flex-col justify-center items-start text-white p-10 px-24 pt-12">
          <h1 className={`${londrina_Sketch.className} duration-150 text-yellow-300 cursor-pointer text-left p-2 px-0 font-extrabold text-7xl tracking-[.30em] z-10`}>
            Palate Prestige
          </h1>
          <p className={`${rubik.className} text-white text-left text-md px-0 w-[80%] z-10 mt-4`}>
            A streamlined solution for cafes and restaurants to revolutionize food order management. Sign up today to optimize your operations with ease
          </p>
          <div className="mt-10">
      
                <Link href='#features' scroll={true}>
          <button  className=" ml-2 border-2 relative w-50 px-8 py-2 h-14 bg-black rounded-full overflow-hidden group">
            <span className="absolute inset-0 bg-yellow-500 transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100 origin-right"></span>
            <span className="relative z-10 flex items-center justify-center space-x-2 text-white">
              <span className='font-semibold'>
                  Get Started
              </span>
              
              <NotStarted size={28} color='white'/>
            </span>
          </button>
                </Link>

            <button onClick={handleLogin} className={`ml-4 border-2 relative w-50 px-3  h-14 bg-black rounded-full overflow-hidden group ${
    Loading ? 'disabled opacity-50 cursor-not-allowed' : ''
  }`}>
            <span className="absolute inset-0 bg-yellow-500 transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100 origin-left"></span>
            <span className="relative z-10 flex items-center justify-center space-x-2 text-white">
              <img src="/google.png" alt="Google" className="w-4 h-4" />
              <span className='font-semibold'>
              {Loading ? "Loading..." : "Login with Google"}

              </span>
            </span>
          </button>

          </div>
        </div>


        {/* Right Section: Image with Blending Effect */}
        <div className="hide-scrollbar w-1/2 relative">
          <Image
            src="/afosfrbg.jpg" 
            alt="Background Image"
            fill={true}
            style={{ objectFit: "cover" }}
            className="mix-blend-multiply"
          />

          {/* Blending Effect */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black opacity-100"></div>
        </div>
      </div>
            </div>

  {/* Main Content mobile page */}
  <div className="flex flex-col md:hidden h-screen bg-black text-white">
  {/* <!-- Background Image --> */}
  <div className="absolute inset-0">
    <Image
      src="/afosfrbg.jpg"
      alt="Background Image"
      fill={true}
      style={{ objectFit: 'cover' }}
      className="z-0"
    />
  </div>

  {/* <!-- Content Overlay --> */}
  <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 bg-black bg-opacity-60">
    {/* <!-- Branding --> */}
    <div className="text-center mt-4">
      <h1 className={`${londrina_Sketch.className} text-yellow-300 font-extrabold text-8xl tracking-widest`}>
        Palate
      </h1>
      <h1 className={`${londrina_Sketch.className} text-yellow-300 font-extrabold text-7xl tracking-wide`}>
        Prestige
      </h1>
    </div>

    {/* <!-- Description --> */}
    <p className={`${rubik.className} text-center text-md mt-8`}>
      A streamlined solution for cafes and restaurants to revolutionize food order management. Sign up today to optimize your operations with ease.
    </p>

    {/* <!-- Buttons --> */}
    <div className="mt-44 space-y-4 w-full flex flex-col items-center">
      <Link href="#features" scroll={true}>
        <button className="border-2 w-full px-28 py-3 bg-black rounded-full overflow-hidden group active:bg-yellow-400">   
          <span className="relative z-10 text-white font-semibold text-lg">
            Get Started
          </span>
        </button>
      </Link>

      <button
        onClick={handleLogin}
        className={`border-2 w-[80%] px-8 py-3 bg-black rounded-full overflow-hidden group active:bg-yellow-400 ${
          Loading ? 'disabled opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <span className="relative z-10 flex items-center justify-center space-x-2 text-white">
          <img src="/google.png" alt="Google" className="w-4 h-4" />
          <span className="font-semibold text-lg">
            {Loading ? 'Loading...' : 'Login with Google'}
          </span>
        </span>
      </button>
    </div>
  </div>
</div>



      {/* POS Features Section */}

        <div id="features" className=" hide-scrollbar overflow-hidden bg-gradient-to-b from-black to-gray-950 text-white flex flex-col flex-wrap items-center justify-center py-16 md:px-14 px-2">

      <h2 className="text-6xl  sm:text-left md:text-center font-black my-20  " data-aos="fade-up" data-aos-duration="2000" >Our POS Features</h2>
      <p className={`${rubik.className} text-lg  sm:text-left md:text-center max-w-4xl  tracking-wide mb-32`} data-aos="fade-up">
      At PalatePrestige, we provide a suite of innovative features designed to simplify operations for restaurant and cafe admins, reduce operational costs, and elevate the culinary experience for customers. Our powerful tools streamline processes and enhance service quality, ensuring your establishment runs smoothly. Here are the key features we offer :{`)`}
      </p>

      {/* Feature 1 */}
      <div className="hidden md:flex md:flex-row items-center space-x-8 my-32 ">
 
          <div className="w-1/2 perspective-3d"
            data-aos="zoom-out-up"
            data-aos-duration="2000"
            >
            <div className="card-3d-left shadow-image">
              <img src="/feature1.png" alt="Feature 1" className="rounded-sm border-6 border-black" />
              <div className="image-shadow"></div> 
            </div>
          </div>

  
          <div className="w-1/2" data-aos="fade-left">
            <h3 className="text-5xl font-bold mb-4 p-2 border-b-8 border-yellow-400 rounded-md">DashBoard</h3>
            <p className="text-md mt-2 p-2">Your personalized dashboard allows you to effortlessly track key metrics, including orders served today and revenue generated today. With dynamic analytical graphs, you can gain valuable insights to make informed decisions and optimize your restaurant's performance.</p>
          </div>  
       </div>

      {/* Feature 1 Responsive */}
      <div className="md:hidden flex flex-col items-center space-y-8 my-32">
        <div className="w-full flex justify-center" data-aos="zoom-out-up" data-aos-duration="2000">
          <img src="/feature1.png" alt="Feature 1" className="w-[95%] h-auto object-cover" />
        </div>

        <div className="w-full text-left p-4" data-aos="fade-left">
          <h3 className="text-4xl font-bold mb-4 -mt-4 p-2 border-b-8 border-yellow-400 rounded-md">DashBoard</h3>
          <p className="text-lg mt-2 p-2">
            Your personalized dashboard allows you to effortlessly track key metrics, including orders served today and revenue generated today. With dynamic analytical graphs, you can gain valuable insights to make informed decisions and optimize your restaurant's performance.
          </p>
        </div>
      </div>


      {/* Feature 2 */}
      <div className="hidden md:flex md:flex-row items-center space-x-8 my-32">
          
          <div className="w-1/2 text-right" data-aos="fade-left">
            <h3 className="text-5xl font-bold mb-4 p-2 border-b-8 border-yellow-400 rounded-md">Inventory Management</h3>
            <p className="text-md mt-2 p-2">Our Inventory Management feature allows you to easily add food items to your menu selections with essential attributes like category, ingredients, price, and image. You can also update availability and delete items, all in real-time, ensuring your inventory is always accurate and up-to-date.</p>
          </div>

          <div className="w-1/2 perspective-3d"
            data-aos="zoom-out-up"
            data-aos-duration="2000"
            >
            <div className="card-3d-right shadow-image">
              <img src="/feature1.png" alt="Feature 1" className="rounded-sm border-6 border-black" />
              <div className="image-shadow"></div> 
            </div>
          </div>

       </div>

        {/* Feature 2 Responsive */}
      <div className="md:hidden flex flex-col items-center space-y-8 my-32">
        <div className="w-full flex justify-center" data-aos="zoom-out-up" data-aos-duration="2000">
          <img src="/feature1.png" alt="Feature 1" className="w-[95%] h-auto object-cover" />
        </div>

        <div className="w-full text-left p-4" data-aos="fade-left">
          <h3 className="text-4xl font-bold mb-4 -mt-4 p-2 border-b-8 border-yellow-400 rounded-md">Inventory Management</h3>
          <p className="text-lg mt-2 p-2">
          Our Inventory Management feature allows you to easily add food items to your menu selections with essential attributes like category, ingredients, price, and image. You can also update availability and delete items, all in real-time, ensuring your inventory is always accurate and up-to-date.
          </p>
        </div>
      </div>

      {/* Feature 3 */}
      <div className="hidden md:flex md:flex-row items-center space-x-8 my-32">
 
          <div className="w-1/2 perspective-3d"
            data-aos="zoom-out-up"
            data-aos-duration="2000"
            >
            <div className="card-3d-left shadow-image">
              <img src="/feature1.png" alt="Feature 1" className="rounded-sm border-6 border-black" />
              <div className="image-shadow"></div> 
            </div>
          </div>

          
          <div className="w-1/2" data-aos="fade-left">
            <h3 className="text-5xl font-bold mb-4 p-2 border-b-8 border-yellow-400 rounded-md">Live Order Trackings</h3>
            <p className="text-md mt-2 p-2">Easily monitor active orders and those ready for pickup in real-time, whether they come from the app or are placed manually. Manage your workflow efficiently by marking orders as ready or declining them as needed. Plus, anticipate the upcoming integration with Zomato and Swiggy for even smoother order management.</p>
          </div>

       </div>

        {/* Feature 3 Responsive */}
      <div className="md:hidden flex flex-col items-center space-y-8 my-32">
        <div className="w-full flex justify-center" data-aos="zoom-out-up" data-aos-duration="2000">
          <img src="/feature1.png" alt="Feature 1" className="w-[95%] h-auto object-cover" />
        </div>

        <div className="w-full text-left p-4" data-aos="fade-left">
          <h3 className="text-4xl font-bold mb-4 -mt-4 p-2 border-b-8 border-yellow-400 rounded-md">Live Order Trackings</h3>
          <p className="text-lg mt-2 p-2">
          Easily monitor active orders and those ready for pickup in real-time, whether they come from the app or are placed manually. Manage your workflow efficiently by marking orders as ready or declining them as needed. Plus, anticipate the upcoming integration with Zomato and Swiggy for even smoother order management.
          </p>
        </div>
      </div>

      {/* Feature 4 */}
      <div className="hidden md:flex md:flex-row items-center space-x-8 my-32">
          
          <div className="w-1/2 text-right" data-aos="fade-left">
            <h3 className="text-5xl font-bold mb-4 p-2 border-b-8 border-yellow-400 rounded-md">Analytics & History</h3>
            <p className="text-md mt-2 p-2">Store and visualize your sales analytics with ease, and take advantage of the one-click data extraction feature to Excel. Access your orders history to revisit past transactions and glean valuable insights from your sales, helping you elevate your business and drive growth.

</p>
          </div>

          <div className="w-1/2 perspective-3d"
            data-aos="zoom-out-up"
            data-aos-duration="2000"
            >
            <div className="card-3d-right shadow-image">
              <img src="/feature1.png" alt="Feature 1" className="rounded-sm border-6 border-black" />
              <div className="image-shadow"></div> 
            </div>
          </div>

       </div>

        {/* Feature 4 Responsive */}
        <div className="md:hidden flex flex-col items-center space-y-8 my-32">
        <div className="w-full flex justify-center" data-aos="zoom-out-up" data-aos-duration="2000">
          <img src="/feature1.png" alt="Feature 1" className="w-[95%] h-auto object-cover" />
        </div>

        <div className="w-full text-left p-4" data-aos="fade-left">
          <h3 className="text-4xl font-bold mb-4 -mt-4 p-2 border-b-8 border-yellow-400 rounded-md">Analytics & History</h3>
          <p className="text-lg mt-2 p-2">
          Store and visualize your sales analytics with ease, and take advantage of the one-click data extraction feature to Excel. Access your orders history to revisit past transactions and glean valuable insights from your sales, helping you elevate your business and drive growth.
          </p>
        </div>
      </div>

            {/* Feature 5 */}
            <div className="hidden md:flex md:flex-row items-center space-x-8 my-32">
 
            <div className="w-1/2 perspective-3d"
              data-aos="zoom-out-up"
              data-aos-duration="2000"
              >
              <div className="card-3d-left shadow-image">
                <img src="/feature1.png" alt="Feature 1" className="rounded-sm border-6 border-black" />
                <div className="image-shadow"></div> 
              </div>
            </div>

            
            <div className="w-1/2" data-aos="fade-left">
              <h3 className="text-5xl font-bold mb-4 p-2 border-b-8 border-yellow-400 rounded-md">QR Code Ordering</h3>
              <p className="text-md mt-2 p-2">Experience the convenience of QR Code Ordering! Once subscribed, you receive a personalized QR code along with access to the PalatePrestige mobile application. Customers can effortlessly scan your QR code to view your up-to-date menu and place orders directly from their devices. With various payment methods available, orders are seamlessly processed. As soon as an order is placed, you receive instant notifications, and customers are alerted when their orders are ready for pickup. This innovative feature transforms the ordering experience, making it faster and more efficient for both you and your patrons.</p>
            </div>

            </div>

                {/* Feature 5 Responsive */}
                <div className="md:hidden flex flex-col items-center space-y-8 my-32">
        <div className="w-full flex justify-center" data-aos="zoom-out-up" data-aos-duration="2000">
          <img src="/feature1.png" alt="Feature 1" className="w-[95%] h-auto object-cover" />
        </div>

        <div className="w-full text-left p-4" data-aos="fade-left">
          <h3 className="text-4xl font-bold mb-4 -mt-4 p-2 border-b-8 border-yellow-400 rounded-md">QR Code Ordering</h3>
          <p className="text-lg mt-2 p-2">
          Experience the convenience of QR Code Ordering! Once subscribed, you receive a personalized QR code along with access to the PalatePrestige mobile application. Customers can effortlessly scan your QR code to view your up-to-date menu and place orders directly from their devices. With various payment methods available, orders are seamlessly processed. As soon as an order is placed, you receive instant notifications, and customers are alerted when their orders are ready for pickup. This innovative feature transforms the ordering experience, making it faster and more efficient for both you and your patrons.
          </p>
        </div>
      </div>

   
    </div>

      {/* About Us Section */}
      <div id="about" className="overflow-x-hidden hide-scrollbar h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-10">
        <h2 className="text-4xl font-bold mb-4">About Us</h2>
        <p className="text-lg text-center max-w-3xl text-white">
          At Palate Prestige, we believe in revolutionizing the dining experience. Our mission is to provide innovative solutions that simplify restaurant management and enhance customer satisfaction. Join us on this journey as we redefine the way food is ordered and enjoyed.
        </p>
      </div>

      {/* Contact Us Section */}
      <div id="contact" className="overflow-x-hidden hide-scrollbar h-screen bg-black text-white flex  md:flex-row flex-col max-w-full  ">
  {/* Left Section for 3D Design */}
  <div className="flex-1 flex items-center justify-center ">
    
    <Contactui />
  </div>
  

  {/* Right Section for the Contact Form */}
  <div className="flex-1 flex flex-col items-center justify-center p-10">
    <h2 className="text-6xl font-bold mb-4" data-aos="fade-up">Contact Us</h2>
    <p className="text-lg text-center max-w-2xl mb-6">
      Feel free to reach out with any questions about our features or subscriptions. We’d love to assist you!
    </p>
    {/* Update form action to Formspree endpoint */}
    <form 
      action="https://formspree.io/f/mldednyo" 
      method="POST" 
      className="w-full max-w-md"
    >
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2" htmlFor="name">Name</label>
        <input 
          type="text" 
          id="name" 
          name="name"  // Add name attribute for Formspree
          className="w-full p-3 border border-gray-600 rounded-md bg-gray-800 text-white"
          required 
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2" htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          name="email"  // Add name attribute for Formspree
          className="w-full p-3 border border-gray-600 rounded-md bg-gray-800 text-white"
          required 
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2" htmlFor="query">Your Query</label>
        <textarea 
          id="query" 
          name="query"  // Add name attribute for Formspree
          rows="4"
          className="w-full p-3 border border-gray-600 rounded-md bg-gray-800 text-white"
          required 
        />
      </div>
      <button 
        type="submit" 
        className="w-full py-3 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400 transition duration-200"
      >
        Send
      </button>
    </form>
  </div>
</div>

    </>
  );
}

export default HomePage;
