// import { MongoClient } from "mongodb";
// import { NextResponse } from "next/server";
// import redis from '../utils/redisClient';

// export async function GET(request) {
//     const uri = process.env.DATABASE_URL;
//     const client = new MongoClient(uri);
//     const url = new URL(request.url); // Create a URL object to extract query parameters
//     const shop_id = url.searchParams.get("shop_id");

//     if (!shop_id) {
//         return NextResponse.json({ success: false, error: "shop_id is required" }, { status: 400 });
//     }

//     const redisKey = `${shop_id}:all_orders`;


//     try {

//         const cachedData = await redis.get(redisKey);
//         if(cachedData) {
//              return NextResponse.json({ success: true, allOrders : JSON.parse(cachedData) }, {
//             status: 200,
//             headers: {
//                 'Access-Control-Allow-Origin': '*',
//                 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//                 'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//             },
//         });
//         }


//         // Connect to the database
//         await client.connect(); 
//         const database = client.db('afosfr');
//         const orders = database.collection('orders');
//         const query = shop_id ? { shop_id } : {}; // Prepare query object

//         const allOrders = await orders.find(query).toArray(); // Fetch all orders for the given shop_id
        
//         const data = JSON.stringify(allOrders);
//         await redis.set(redisKey, JSON.stringify(data), 'EX', 3600);


//         return NextResponse.json({ success: true, allOrders }, {
//             status: 200,
//             headers: {
//                 'Access-Control-Allow-Origin': '*',
//                 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//                 'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//             },
//         });

//     } 
    
//     catch (error) {
//         return NextResponse.json({ success: false, error: error.message }, { status: 500 }); // Handle errors
//     } 
    
//     finally {
//         await client.close(); // Ensure the client is closed after operations
//     }
// }

// export async function POST(request) {
//     const uri = process.env.DATABASE_URL;
//     const client = new MongoClient(uri);
//     const body = await request.json(); // Parse the JSON body from the request

//     if (!body.shop_id) {
//         return NextResponse.json({ ok: false, error: "shop_id is required" }, { status: 400 }); // Validate request body
//     }

//     try {
//         await client.connect(); // Connect to the database
//         const database = client.db('afosfr');
//         const orders = database.collection('orders');

//         // Insert the new order into the database
//         const newOrder = await orders.insertOne(body);

//         return NextResponse.json({ newOrder, ok: true }); // Return the new order
//     } catch (error) {
//         return NextResponse.json({ ok: false, error: error.message }, { status: 500 }); // Handle errors
//     } finally {
//         await client.close(); // Ensure the client is closed after operations
//     }
// }

import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
// import redis from '../utils/redisClient';
import {getRedisClient} from '../utils/redisClient';

const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri);

export async function GET(request) {
    const url = new URL(request.url);
    const shop_id = url.searchParams.get("shop_id");

    if (!shop_id) {
        return NextResponse.json({ success: false, error: "shop_id is required" }, { status: 400 });
    }

    const redis = getRedisClient();
    const redisKey = `${shop_id}:all_orders`;

    try {
        // Check if data exists in Redis cache
        const cachedData = await redis.get(redisKey);
        if (cachedData) {
            return NextResponse.json({ success: true, allOrders: JSON.parse(cachedData) }, {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                },
            });
        }

        // Connect to the database
        await client.connect();
        const database = client.db('afosfr');
        const orders = database.collection('orders');
        const query = { shop_id };

        const allOrders = await orders.find(query).toArray();

        // Cache data in Redis with an expiration of 1 hour
        await redis.set(redisKey, JSON.stringify(allOrders), 'EX', 3600);

        return NextResponse.json({ success: true, allOrders }, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    } finally {
        await client.close(); // Ensure the client is closed after operations
    }
}

export async function POST(request) {
    const body = await request.json();

    if (!body.shop_id) {
        return NextResponse.json({ ok: false, error: "shop_id is required" }, { status: 400 });
    }

    try {
        await client.connect();
        const database = client.db('afosfr');
        const orders = database.collection('orders');

        const newOrder = await orders.insertOne(body);

        // Invalidate the Redis cache for this shop_id, if present
        const redis = getRedisClient();
        const redisKey = `${body.shop_id}:all_orders`;
        await redis.del(redisKey);

        return NextResponse.json({ newOrder, ok: true });
    } catch (error) {
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    } finally {
        await client.close();
    }
}
