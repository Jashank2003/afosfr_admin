import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
 import cloudinary from '../utils/cloudinary'

export async function GET(request){

    const uri=process.env.DATABASE_URL;   
     const client = new MongoClient(uri);
        try{
            const database =  client.db('afosfr');
            const inventory = database.collection('inventory');
            const query = {};
            const products = await inventory.find(query).toArray();
            
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

export async function POST(request){

    let body = await request.json();
    // console.log(body);
    const uri= process.env.DATABASE_URL;   
     const client = new MongoClient(uri);

        try{
            const database =  client.db('afosfr');
            const inventory = database.collection('inventory');
           
            const product = await inventory.insertOne(body);
            return NextResponse.json({product , ok:true});

        }
        finally{
            await client.close();
        }
}
