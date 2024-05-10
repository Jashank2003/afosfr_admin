"use client"
import React from 'react'
import {useState,useEffect} from 'react'
import Link from 'next/link';
import { getCldImageUrl } from 'next-cloudinary';
import { CldUploadWidget } from 'next-cloudinary';
import Navbar from '../components/Navbar';
import { Delete} from "@styled-icons/fluentui-system-filled/Delete";
import { Search} from "@styled-icons/evil/Search";
import { CartPlusFill} from "@styled-icons/bootstrap/CartPlusFill";
import { CloseOutline} from "@styled-icons/evaicons-outline/CloseOutline";





const page = () => {

  const [tableanimation ,settableanimation] = useState(true);
  const [showadd , setshowadd] = useState(false);
  const [publicId, setPublicId] = useState("");
  const[productForm,setProductForm] = useState({
    avlb:true,
  });
  const[products,setProducts] = useState([]);
  const[alert ,setAlert] = useState("");
  const[query , setQuery] = useState("");
  const[loading,setloading] = useState(false)
  const[loadingaction,setloadingaction] = useState(false)
  const[dropdown,setDropdown] = useState([
  
])

  useEffect(()=>{

    const fetchProducts = async ()=>{
      settableanimation(true);
      const response = await fetch('/api/product')
      let rjson = await response.json();
      setProducts(rjson.products);
      settableanimation(false);
    }
    fetchProducts();
  },[])

  
  const handleaddbut = ()=>{
    setshowadd(true);
  }
  const handleaddclose = ()=>{
    setshowadd(false);
  }

  const addProduct = async(e)=>{
    e.preventDefault();

    if (!productForm.foodname || !productForm.category || !productForm.price) {
      setAlert("Please fill in all required fields.");
      setTimeout(() => {
        setAlert("");
    }, 2000);
      return; // Exit the function if any required field is empty
    }

    try{

      const imageUrl = getCldImageUrl({
        width: 960,
        height: 600,
        src: publicId
      });
        //  console.log(imageUrl);
        const response = await fetch('/api/product',{
            method: 'POST',
            headers:{
                'content-type':'application/json'
            },                                                                     
            body:JSON.stringify({...productForm,avlb:productForm.avlb ? 'yes':'no',foodimg:imageUrl })
        });

        if(response.ok){

            console.log('Product added successfully');
            setAlert("Your Product has been added !")
            setTimeout(() => {
              setAlert("");
          }, 2000);
            setProductForm({})
          // update products table  immediately                                 //,foodimg: imageUrl 
          const newProduct = { ...productForm, avlb: productForm.avlb ? 'yes' : 'no',foodimg:imageUrl};
          setProducts(prevProducts => [...prevProducts, newProduct]);
            
        }
        else{
            console.error("Error adding product");
        }
    }
    catch(error){
        console.error('Error:',error);
    }
  }

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setProductForm({ ...productForm, [e.target.name]: value });
  };

  const onDrodownedit = async (e)=>{
      let value = e.target.value
      setQuery(value)
      if(value.length>=3){
        setloading(true);
        setDropdown([])
        const response = await fetch('/api/search?query=' + query)
        let rjson = await response.json();
        setDropdown(rjson.products);
        setloading(false);
      }
      else{
        setDropdown([])
      }
    
  }

  const handleAvailability = async (productName, newAvailability) => {
    // immediate change the availabilty of the prduct in products table
    //  update the products 
          let index = products.findIndex((item) =>item.foodname == productName);
          let newProducts = JSON.parse(JSON.stringify(products));
          if(newAvailability === true){
            newProducts[index].avlb = 'yes'
          }
          else{
            newProducts[index].avlb = 'no'
          }
          setProducts(newProducts);
      
          // update the dropdown
              let indexdrop = dropdown.findIndex((item) => item.foodname === productName);
              let newDropdown = [...dropdown];
              newDropdown[indexdrop].avlb = newAvailability ? 'yes' : 'no';
              setDropdown(newDropdown);


    try {
        setloadingaction(true);
        const response = await fetch(`/api/action`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productName: productName, avlb: newAvailability ? 'yes' : 'no' })
        });

        if (response.ok) {
          
            console.log('Availability updated successfully');
            

        } else {
            console.error('Error updating availability');
            alert("reload the application something went wront");
        }
    } catch (error) {
        console.error('Error:', error);
    }
    setloadingaction(false);
};

const deleteItem = async(foodname)=>{

  // immediately changes reflection of quantity in dropdown

  let indexdrop = dropdown.findIndex((item) => item.foodname == foodname);
  let newDropdown = [...dropdown]; // Clone the array to avoid mutating the original
  newDropdown.splice(indexdrop, 1); // Remove the item at index 'indexdrop'
  setDropdown(newDropdown); // Update your state with the modified array

  // immediately changes reflection of quantity in dropdown
  let index = products.findIndex((item) => item.foodname == foodname);
  let newProducts = [...products];
  newProducts.splice(index , 1);
  setProducts(newProducts);


  setloadingaction(true);
  const response = await fetch("/api/action", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({foodname}),
  });
  let r = await response.json();
  console.log(r);
  setloadingaction(false);
}

  return (
    <> 
    <div className='flex  bg-black text-black '>

    <Navbar/>
    <div className='h-screen overflow-scroll grow overflow-x-hidden pb-2 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-zinc-800 scrollbar-track-zinc-900 overflow-y-scroll scrollbar-thin scrollbar-corner-zinc-950'>

    <h1 className='mx-4 text-white my-5 text-4xl tracking-wider'>Food Stock Manager</h1>
    <div className='my-4 ml-4'> <hr /></div>
    
    <div className='flex flex-row justify-between align-middle  p-1 mx-4 '>
    
    <button className=' hover:bg-[#7fa28a]  duration-75 rounded-xl bg-[#A7BEAE] m-2  text-small h-12 px-2' onClick={handleaddbut}>
      Add item <CartPlusFill size={24} color='black'/>
    </button>

    {showadd && (
      <div className="  border-white border-solid border-2 absolute top-28 shadow-lg rounded-md  mx-auto p-6 w-[50vw] h-[20vh]   bg-black">
      {/* bg-[#212623] */}
        {/* <h1 className="text-lg font-semibold mb-4">Add new food product </h1> */}
        <div className="flex space-x-2 ">
          <input
            name="foodname"
            id="foodname"
            type="text"
            onChange={handleChange}
            value={productForm?.foodname || ""}
            placeholder="Food Name"
            className="border py-1 rounded-lg outline-none px-2  w-[8vw]"
            />
          <input
           
           name="category"
           id="category"
           type="text"
           onChange={handleChange}
           value={productForm?.category || ""}
           placeholder="Category"
           className="border py-1 rounded-lg outline-none px-2  w-[8vw]"
           />
          <input
            name="price"
            id="price"
            type="number"
            onChange={handleChange}
            value={productForm?.price || ""}
            placeholder="Price"
            className="border  py-1 rounded-lg outline-none px-2  w-[8vw]"
            />
          <input
            name="fooding"
            id="fooding"
            type="text"
            onChange={handleChange}
            value={productForm?.fooding || ""}
            placeholder="Ingredients"
            className="border  py-1 rounded-lg outline-none px-2  w-[8vw]"
            />
               <label htmlFor="avlb" className="flex bg-gray-100 border rounded-xl outline-none px-2  w-[8vw]">
        Availability
        <input
          type="checkbox"
          name="avlb"
          id="avlb"
          checked={productForm.avlb}
          onChange={handleChange}
          className=" mt-1 ml-2 "
          style={{ width: '16px', height: '16px' }} 
          />
      </label>
            <CldUploadWidget uploadPreset="afosfr"
                onSuccess={(results) => {
                  setPublicId(results.info.public_id) 
                  console.log('Public ID', results.info.public_id);
                }} >
                {({ open }) => {
                  return (
                    <button className="rounded-lg outline-none px-2 py-1 bg-blue-300 w-[10vw]" onClick={() => open()}>
                        Upload
                      </button>
                    );
                  }}
            </CldUploadWidget>
         
          
        </div>
        <button onClick={addProduct}
         type="submit" className=' hover:bg-[#7fa28a] duration-75 mt-2 rounded-lg bg-[#A7BEAE] mr-2 h-10 text-black px-6 py-2 focus:bg-blue-300'>Add item</button>
         <button className=' ' onClick={handleaddclose}>
        <CloseOutline size={28} color='red'/>
        </button>
        <div className='text-md absolute text-green-800'>{alert}</div>
      </div>
      )}


      {/* Search  system here  */}

      <div className="w-[12vw] h-12 mt-2 shadow-sm m-2 " >

        <div className="flex ">
        <Search color='white' size={26} className='relative top-2.5 left-6' />
          <input
            type="text"
            className=" outline-none rounded-2xl pl-7 pr-2 py-3 w-full bg-[#161616] text-gray-400 text-justify text-sm"
            onChange={onDrodownedit}
            // onBlur={()=>{setDropdown([])}}
            placeholder="Search a Product..."
            />
        </div>

          <div className='relative mt-5'>
              {loading && (
                <div className='absolute inset-0 flex items-center justify-center'>
                  <img src="/pizzaload.svg" alt="Loading..." className="w-6 h-6" />
                </div>
              )}
        </div>

          <div className='dropdowncont absolute right-20 mt-1 bg-purple-100 border-black rounded-md w-[36vw]'>
            
            {dropdown.map(item=>{
              return <div key={item.foodname} className='flex justify-between p-2 mb-1 border-b-2'>
                <span className='foodname'>{item.foodname} at Rs.{item.price}</span>
                <span className='category'>{item.category}</span>
                <span className='flex flex-row'>
                  <button onClick={() =>{deleteItem(item.foodname)}}   disabled={loadingaction} className=" mx-1 inline-block cursor-pointer disabled:cursor-not-allowed"><Delete size={24} color='red'/></button>

                <label htmlFor={`avlbact-${item._id}`} className="flex items-center bg-gray-100 border rounded px-2 py-1">
        <span className="mr-2">Availability</span>
        <input
          type="checkbox"
          name={`avlbact-${item._id}`}
          id={`avlbact-${item._id}`}
          checked={item.avlb === 'yes'}
          onChange={() => handleAvailability(item.foodname, item.avlb !== 'yes')} // Toggle availability
          className="mt-1 ml-2"
          style={{ width: '18px', height: '18px' }} // Increase checkbox size
          />
      </label>
          </span>

            </div>
          })}
          </div>
       
      </div>

         </div>

      {/* Display foood meny  */}
      <div className={`p-2 my-4  mx-4 h-[80vh] bg-[#161616] ${tableanimation? 'animate-pulse':''}`}>
        {/* <h1 className=" text-lg font-semibold mb-4">Display Food Menu </h1> */}
        <table className="w-full border">
          <thead>
            <tr className=" text-gray-400 border-b-2 border-t-2 border-solid border-white text-lg border-l-0 border-r-0 ">
              <th className=" p-4">Food Name</th>
              <th className=" p-4">Category</th>
              <th className=" p-4">Price</th>
              <th className=" p-4">Available</th>
              <th className=" p-4">Ingredients</th>
              <th className=" p-4">img</th>
            </tr>
          </thead>

          <tbody >
            {products.map((product , index)=>{
              const rowClass = index % 2 === 0 ? 'bg-[#535F57]' : 'bg-[#212623]';
              return <tr key ={product.foodname} className={`${rowClass} p-4 text-md text-gray-300 mb-2`}>
              <th className="border-b p-3">{product.foodname}</th>
              <th className="border-b p-3">{product.category}</th>
              <th className="border-b p-3">Rs.{product.price}</th>
              <th className={`border-b p-3 ${product.avlb === 'no' ? 'bg-red-200' : ''}`}>
          {product.avlb}
        </th>
              <th className="border-b p-3">{product.fooding}</th>
              <th className="border-b  p-3 underline"> <Link target='_blank' href={!product.foodimg? '#':product.foodimg}>
        view
      </Link></th>
            </tr>
            })}
          </tbody>
        </table>
      </div>
      </div>
     
            </div>
            </>
  )
}

export default page
