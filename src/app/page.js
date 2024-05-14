import Link from 'next/link';

function HomePage() {
  return (
    <div className="relative h-screen">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-center blur-sm"
        style={{ backgroundImage: `url('/afosfrbg.jpg')` }}
      />
      <div className="absolute inset-0 ">
        <h1 className="duration-150 text-amber-950 cursor-pointer text-center p-2 font-extrabold text-6xl tracking-[.30em] hover:tracking-[.40em] transition-all ease-in-out z-10 mt-48 mb-3">Palate Prestige</h1>
        <p className='text-black text-center text-lg px-4 w-[50vw] mx-auto z-10'>  The ultimate solution for cafes and restaurants seeking to revolutionize their food order management. Sign up today and unlock the power to streamline and optimize your operations with ease.</p>

        <div className='item center text-center mt-32'>
        <Link href="/dashboard"
           className=" text-center  bg-white items-center mx-auto text-black text-lg font-semibold  border border-white px-6 py-3 rounded-full hover:bg-amber-950 hover:text-white transition duration-300 ease-in-out z-10">Get Started
        </Link>
           </div>
      </div>
    </div>
  );
}

export default HomePage;
