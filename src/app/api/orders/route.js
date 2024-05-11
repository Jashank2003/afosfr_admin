import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import cloudinary from '../utils/cloudinary'



export async function POST(request) {
    let body = await request.json();
  
    const uri =   process.env.DATABASE_URL;
    const client = new MongoClient(uri);

    try {
        const database = client.db('afosfr');
        const orders = database.collection('orders');

        // Insert the order into the database
        const neworder = await orders.insertOne(body);

        // Return the updated order data with the incremented dailyordercount
        return NextResponse.json({ neworder, ok: true, dailyOrderCount });
    } finally {
        await client.close();
    }
}

// export async function GET(request){

//     const uri=  process.env.DATABASE_URL;
//     const client = new MongoClient(uri);
//         try{
//             const database =  client.db('afosfr');
//             const orders = database.collection('orders');
//             const query = {};
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