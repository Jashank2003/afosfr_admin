// updated 
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
 import cloudinary from '../utils/cloudinary'


export async function GET(request) {
    const uri = process.env.DATABASE_URL;
    const client = new MongoClient(uri);
    const url = new URL(request.url);
    const shop_id = url.searchParams.get("shop_id"); // Extract shop_id from query

    if(!shop_id){
        return NextResponse.json({success:false,error:"shop_id is required"},{status:400})    
    }
  
    try {
      const database = client.db('afosfr');
      const inventory = database.collection('inventory');
  
      const query = shop_id ? { shop_id } : {}; // Filter by shop_id if provided
      const products = await inventory.find(query).toArray();
  
      return NextResponse.json({ success: true, products }, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    } finally {
      await client.close();
    }
  }
  

  export async function POST(request) {
    let body = await request.json();
    const uri = process.env.DATABASE_URL;
    const client = new MongoClient(uri);
  
    try {
      const database = client.db('afosfr');
      const inventory = database.collection('inventory');
  
      if (!body.shop_id) {
        return NextResponse.json({ success: false, message: "shop_id is required" }, { status: 400 });
      }
  
      const product = await inventory.insertOne(body);
      return NextResponse.json({ product, ok: true });
  
    } finally {
      await client.close();
    }
  }
  
