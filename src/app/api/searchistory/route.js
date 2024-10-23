// import { MongoClient } from "mongodb";
// import { NextResponse } from "next/server";
// // import env from "../../../../env/env";
// export async function GET(request){

//     const query = request.nextUrl.searchParams.get("query");
//     const shop_id = request.nextUrl.searchParams.get("shop_id");

//     if(!query || !shop_id){
//         return NextResponse.json({success:false,error:"query and shop_id are required"},{status:400})
//     }
    
//     const uri=  process.env.DATABASE_URL;
//     const client = new MongoClient(uri);
//         try{
//             const database =  client.db('afosfr');
//             const orders = database.collection('orders');
           
//             const searchedHistory = await orders.aggregate([{
//                 $match:{
//                     $or:[
//                         { name:{$regex:query,$options:"i"}},
//                         { refId:{$regex:query,$options:"i"}},
//                         { orderId:{$regex:query,$options:"i"}},

//                     ]
//                 }
//             }]).toArray();
          
//             return NextResponse.json({success:true,searchedHistory},{
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

import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {

    const query = request.nextUrl.searchParams.get("query");
    const shop_id = request.nextUrl.searchParams.get("shop_id");

    // Validate that both query and shop_id are provided
    if (!query || !shop_id) {
        return NextResponse.json({ success: false, error: "Query and Shop ID are required" }, { status: 400 });
    }
    
    const uri = process.env.DATABASE_URL;
    const client = new MongoClient(uri);

    try {
        const database = client.db('afosfr');
        const orders = database.collection('orders');
       
        // Find records where shop_id matches and name, refId, or orderId match the query
        const searchedHistory = await orders.aggregate([{
            $match: {
                shop_id: shop_id,  // Ensure it matches the provided shop_id
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { refId: { $regex: query, $options: "i" } },
                    { orderId: { $regex: query, $options: "i" } },
                ]
            }
        }]).toArray();
      
        return NextResponse.json({ success: true, searchedHistory }, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });

    } catch (error) {
        console.error("Error fetching search results:", error);
        return NextResponse.json({ success: false, error: "Error fetching search results" }, { status: 500 });
    } finally {
        await client.close();
    }
}
