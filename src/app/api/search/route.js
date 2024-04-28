import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import env from "../../../../env/env";
export async function GET(request){

    const query = request.nextUrl.searchParams.get("query");
    // console.log(query);
    const uri=env.DATABASE_URL;
    const client = new MongoClient(uri);
        try{
            const database =  client.db('afosfr');
            const inventory = database.collection('inventory');
           
            const products = await inventory.aggregate([{
                $match:{
                    $or:[
                        { foodname:{$regex:query,$options:"i"}},
                        // { category:{$regex:query,$option:"i"}},
                        // { price:{$regex:query,$option:"i"}},

                    ]
                }
            }]).toArray();
          
            return NextResponse.json({success:true,products},{
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