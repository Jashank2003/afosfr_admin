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
            // console.log(movies);
            return NextResponse.json({success:true,products});

        }
        finally{
            await client.close();
        }
}