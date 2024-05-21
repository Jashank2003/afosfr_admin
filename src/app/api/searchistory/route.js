import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
// import env from "../../../../env/env";
export async function GET(request){

    const query = request.nextUrl.searchParams.get("query");
    
    const uri=  process.env.DATABASE_URL;
    const client = new MongoClient(uri);
        try{
            const database =  client.db('afosfr');
            const orders = database.collection('orders');
           
            const searchedHistory = await orders.aggregate([{
                $match:{
                    $or:[
                        { name:{$regex:query,$options:"i"}},
                        { refId:{$regex:query,$options:"i"}},
                        { orderId:{$regex:query,$options:"i"}},

                    ]
                }
            }]).toArray();
          
            return NextResponse.json({success:true,searchedHistory},{
                status: 200,
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                },
              });

        }
        finally{
            await client.close();
        }
}