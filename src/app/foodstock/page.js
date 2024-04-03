"use client"
import React from 'react'
import {useState,useEffect} from 'react'
// import PizzaLoading from './pizzaload.svg';

const page = () => {
  
  const[productForm,setProductForm] = useState({
    avlb:true,
  });
  const[products,setProducts] = useState([]);
  const[alert ,setAlert] = useState("");
  const[query , setQuery] = useState("");
  const[loading,setloading] = useState(false)
  const[loadingaction,setloadingaction] = useState(false)
  const[dropdown,setDropdown] = useState([
  //   {
  //   "foodname":"burjkger",
  //   "category":"burhjkger",
  //   "price":"hj40",

  // },
  //   {
  //   "foodname":"burjkger",
  //   "category":"burhjkger",
  //   "price":"hj40",

  // },
  //   {
  //   "foodname":"burjkger",
  //   "category":"burhjkger",
  //   "price":"hj40",

  // },
])

  useEffect(()=>{

    const fetchProducts = async ()=>{
      const response = await fetch('/api/product')
      let rjson = await response.json();
      setProducts(rjson.products);
    }
    fetchProducts();
  },[])


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
        const response = await fetch('/api/product',{
            method: 'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({...productForm,avlb:productForm.avlb ? 'yes':'no'})
        });

        if(response.ok){

            console.log('Product added successfully');
            setAlert("Your Product has been added !")
            setTimeout(() => {
              setAlert("");
          }, 2000);
            setProductForm({})
          // update products table  immediately
          const newProduct = { ...productForm, avlb: productForm.avlb ? 'yes' : 'no' };
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
    <h1 className='text-2xl text-center font-bold mt-1 p-3'>Manage Food Stock here:</h1>
      
    <div className="mx-auto p-8  max-w-screen-xl bg-pink-300 ">
        <h1 className="text-lg font-semibold mb-4">Search a  food product</h1>
        <div className="flex">
          <input
            type="text"
            className="border rounded-l px-2 py-1 w-full"
            onChange={onDrodownedit}
            // onBlur={()=>{setDropdown([])}}
            placeholder="Search for a product..."
          />
          <select className="border rounded-l px-2 py-1"  >
            <option value="">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>

          <div className='relative mt-5'>
              {loading && (
                <div className='absolute inset-0 flex items-center justify-center'>
                  <img src="/pizzaload.svg" alt="Loading..." className="w-6 h-6" />
                </div>
              )}
        </div>

          <div className='dropdowncont absolute mt-1 bg-purple-100 border-black rounded-md w-[72vw]'>
            
            {dropdown.map(item=>{
              return <div key={item.foodname} className='flex justify-between p-2 mb-1 border-b-2'>
                <span className='foodname'>{item.foodname} at Rs.{item.price}</span>
                <span className='category'>{item.category}</span>
                {/* <span className='price'>{item.price}</span> */}
                <span className='flex flex-row'>
                  <button onClick={() =>{deleteItem(item.foodname)}}   disabled={loadingaction} className=" mx-1 subtract inline-block px-3 py-1 bg-red-500 text-white font-semibold text-xs rounded-lg shadow-md cursor-pointer disabled:bg-red-200">Delete</button>

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

      <div className=" mx-auto p-8  max-w-screen-xl bg-green-300 ">
        <h1 className="text-lg font-semibold mb-4">Add new food product </h1>
        <div className="flex space-x-2">
          <input
            name="foodname"
            id="foodname"
            type="text"
            onChange={handleChange}
            value={productForm?.foodname || ""}
            placeholder="Food Name"
            className="border rounded px-2 py-1 w-full"
          />
          <input
           
            name="category"
            id="category"
            type="text"
            onChange={handleChange}
            value={productForm?.category || ""}
            placeholder="Category"
            className="border rounded px-2 py-1 w-full"
            />
          <input
            name="price"
            id="price"
            type="number"
            onChange={handleChange}
            value={productForm?.price || ""}
            placeholder="Price"
            className="border rounded px-2 py-1 w-full"
            />
          <input
            name="fooding"
            id="fooding"
            type="text"
            onChange={handleChange}
            value={productForm?.fooding || ""}
            placeholder="Ingredients"
            className="border rounded px-2 py-1 w-full"
          />
               <label htmlFor="avlb" className="flex bg-gray-100 border rounded px-2 py-1 w-full">
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
          <input
            name="foodimg"
            id="foodimg"
            type="file"
            onChange={handleChange}
            value={productForm?.foodimg || ""}
            placeholder="Insert Food pic here"
            className="border rounded px-2 py-1 w-full"
            />
         
          
        </div>
        <button onClick={addProduct}
         type="submit" className='mt-2 bg-blue-600 text-white px-4 py-2 focus:bg-blue-300'>Add</button>
        <div className='text-md absolute text-green-800'>{alert}</div>
      </div>


      <div className="mx-auto p-8  max-w-screen-xl bg-blue-100 ">
        <h1 className=" text-lg font-semibold mb-4">Display Food Menu </h1>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-400">
              <th className="border p-1">Food Name</th>
              <th className="border p-1">Category</th>
              <th className="border p-1">Price</th>
              <th className="border p-1">Available</th>
              <th className="border p-1">Ingredients</th>
              <th className="border p-1">img</th>
            </tr>
          </thead>

          <tbody>
            {products.map(product=>{
              return <tr key ={product.foodname} className="bg-gray-300">
              <th className="border p-1">{product.foodname}</th>
              <th className="border p-1">{product.category}</th>
              <th className="border p-1">Rs.{product.price}</th>
              <th className={`border p-1 ${product.avlb === 'no' ? 'bg-red-200' : ''}`}>
          {product.avlb}
        </th>
              <th className="border p-1">{product.fooding}</th>
              <th className="border p-1">{product.img}</th>
            </tr>
            })}
          </tbody>
        </table>
      </div>
    
            </>
  )
}

export default page
