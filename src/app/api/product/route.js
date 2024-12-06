// // updated 
// import { MongoClient } from "mongodb";
// import { NextResponse } from "next/server";
//  import cloudinary from '../utils/cloudinary'


// export async function GET(request) {
//     const uri = process.env.DATABASE_URL;
//     const client = new MongoClient(uri);
//     const url = new URL(request.url);
//     const shop_id = url.searchParams.get("shop_id"); // Extract shop_id from query

//     if(!shop_id){
//         return NextResponse.json({success:false,error:"shop_id is required"},{status:400})    
//     }
  
//     try {
//       const database = client.db('afosfr');
//       const inventory = database.collection('inventory');
  
//       const query = shop_id ? { shop_id } : {}; 
//       const products = await inventory.find(query).toArray();
  
//       return NextResponse.json({ success: true, products }, {
//         status: 200,
//         headers: {
//           'Access-Control-Allow-Origin': '*',
//           'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//           'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//         },
//       });
//     } finally {
//       await client.close();
//     }
//   }
  

//   export async function POST(request) {
//     let body = await request.json();
//     const uri = process.env.DATABASE_URL;
//     const client = new MongoClient(uri);
  
//     try {
//       const database = client.db('afosfr');
//       const inventory = database.collection('inventory');
  
//       if (!body.shop_id) {
//         return NextResponse.json({ success: false, message: "shop_id is required" }, { status: 400 });
//       }
  
//       const product = await inventory.insertOne(body);
//       return NextResponse.json({ product, ok: true });
  
//     } finally {
//       await client.close();
//     }
//   }
  

import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import cloudinary from '../utils/cloudinary';
// import redis from '../utils/redisClient';
import {getRedisClient} from '../utils/redisClient';

// GET function to fetch products and cache result in Redis
export async function GET(request) {
    const uri = process.env.DATABASE_URL;
    const client = new MongoClient(uri);
    const url = new URL(request.url);
    const shop_id = url.searchParams.get("shop_id");
    const category = url.searchParams.get("category");

    if (!shop_id) {
        return NextResponse.json({ success: false, error: "shop_id is required" }, { status: 400 });
    }

    if (category) {
        const database = client.db('afosfr');
        const inventory = database.collection('inventory');
        const query = { shop_id, category };
        const products = await inventory.find(query).toArray();
        return NextResponse.json({ success: true, products }, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
            }

    // Define Redis key for the products list
    const redis = getRedisClient();
    const redisKey = `${shop_id}:products`;

    try {
        // Check Redis for cached products
        const cachedProducts = await redis.get(redisKey);
        if (cachedProducts) {
            return NextResponse.json({ success: true, products: JSON.parse(cachedProducts) }, {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                },
            });
        }

        // Fetch from MongoDB if no cache available
        const database = client.db('afosfr');
        const inventory = database.collection('inventory');
        const query = { shop_id };
        const products = await inventory.find(query).toArray();

        // Cache products in Redis for 1 hour
        await redis.set(redisKey, JSON.stringify(products), 'EX', 3600);

        return NextResponse.json({ success: true, products }, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
    } finally {
        redis.quit();
        await client.close();
    }
}

// POST function to add a product and update Redis cache
export async function POST(request) {
    const body = await request.json();
    const uri = process.env.DATABASE_URL;
    const client = new MongoClient(uri);
    const { shop_id, category } = body;

    if (!shop_id) {
        return NextResponse.json({ success: false, message: "shop_id is required" }, { status: 400 });
    }

    try {
        const database = client.db('afosfr');
        const inventory = database.collection('inventory');

        // Insert new product in MongoDB
        const product = await inventory.insertOne(body);

        // Clear relevant Redis caches
        const redis = getRedisClient();
        const redisKeysToDelete = [
            `${shop_id}:category_items:${category}`,
            `${shop_id}:all_categories`,
            `${shop_id}:products`
        ];

        for (const key of redisKeysToDelete) {
            await redis.del(key);
        }

        return NextResponse.json({ success: true, product }, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
    } finally {
        redis.quit();
        await client.close();
    }
}
