// import { MongoClient } from "mongodb";
// import { NextResponse } from "next/server";
// import cloudinary from '../utils/cloudinary'




// export async function GET(request){
//     const uri=  process.env.DATABASE_URL;
//     const client = new MongoClient(uri);
//     const shop_id = url.searchParams.get("shop_id");

//     if(!shop_id){
//         return NextResponse({success:false,error:"shop_id is required"},{status:400})
//     }

//         try{
//             const database =  client.db('afosfr');
//             const orders = database.collection('orders');
//             const query = {shop_id} ;
//             const allorders = await orders.find(query).toArray();
            
//             return NextResponse.json({success:true,allorders},{
//                 status: 200,
//                 headers: {
//                   'Access-Control-Allow-Origin': '*',
//                   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//                   'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//                 },
//               });

//         }
//         finally{
//             await client.close();
//         }
// }

// export async function POST(request) {
//     let body = await request.json();

//     if(!body.shop_id){
//         return NextResponse({ok:false,error:"shop_id is required"},{status:400})
//     }
  
//     const uri =   process.env.DATABASE_URL;
//     const client = new MongoClient(uri);

//     try {
//         const database = client.db('afosfr');
//         const orders = database.collection('orders');

//         // Insert the order into the database
//         const neworder = await orders.insertOne(body);

//         // Return the updated order data with the incremented dailyordercount
//         return NextResponse.json({ neworder, ok: true, });
//     } finally {
//         await client.close();
//     }
// }

import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
    const uri = process.env.DATABASE_URL;
    const client = new MongoClient(uri);
    const url = new URL(request.url); // Create a URL object to extract query parameters
    const shop_id = url.searchParams.get("shop_id");

    if (!shop_id) {
        return NextResponse.json({ success: false, error: "shop_id is required" }, { status: 400 });
    }

    try {
        await client.connect(); // Connect to the database
        const database = client.db('afosfr');
        const orders = database.collection('orders');
        const query = shop_id ? { shop_id } : {}; // Prepare query object

        const allOrders = await orders.find(query).toArray(); // Fetch all orders for the given shop_id

        return NextResponse.json({ success: true, allOrders }, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 }); // Handle errors
    } finally {
        await client.close(); // Ensure the client is closed after operations
    }
}

export async function POST(request) {
    const uri = process.env.DATABASE_URL;
    const client = new MongoClient(uri);
    const body = await request.json(); // Parse the JSON body from the request

    if (!body.shop_id) {
        return NextResponse.json({ ok: false, error: "shop_id is required" }, { status: 400 }); // Validate request body
    }

    try {
        await client.connect(); // Connect to the database
        const database = client.db('afosfr');
        const orders = database.collection('orders');

        // Insert the new order into the database
        const newOrder = await orders.insertOne(body);

        return NextResponse.json({ newOrder, ok: true }); // Return the new order
    } catch (error) {
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 }); // Handle errors
    } finally {
        await client.close(); // Ensure the client is closed after operations
    }
}
