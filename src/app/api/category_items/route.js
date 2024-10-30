// import { MongoClient } from "mongodb";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//     const uri = process.env.DATABASE_URL;
//     const client = new MongoClient(uri);

//     try {
//         const database = client.db('afosfr');
//         const inventory = database.collection('inventory');

//         const body = await request.json(); // Parse the incoming POST request body
//         const { shop_id, category } = body; // Extract shop_id and optional category from the request

//         if (!shop_id) {
//             return NextResponse.json({
//                 success: false,
//                 message: "shop_id is required"
//             }, {
//                 status: 400,
//                 headers: {
//                     'Access-Control-Allow-Origin': '*',
//                     'Access-Control-Allow-Methods': 'POST',
//                     'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//                 },
//             });
//         }

//         let query = { shop_id }; // Filter by shop_id

//         if (category) {
//             // If category is provided, include it in the query
//             query.category = category;
//         }

//         const products = await inventory.find(query).toArray();
//         const categories = {}; // Object to hold categories and their respective items

//         // Organize products into categories
//         products.forEach(product => {
//             if (!categories[product.category]) {
//                 categories[product.category] = []; // Initialize category array if not exists
//             }
//             categories[product.category].push(product);
//         });

//         const categoriesAndItems = Object.entries(categories).map(([category, items]) => ({
//             name: category,
//             items: items
//         }));

//         if(categoriesAndItems.length ==0){
//             return NextResponse.json({
//                 success: false,
//                 message: "Shop_id is invalid or items does not exists of that shop_id"
//             })
//         }
        
//         return NextResponse.json({
//             success: true,
//             data: {
//                 categories: categoriesAndItems
//             }
//         }, {
//             status: 200,
//             headers: {
//                 'Access-Control-Allow-Origin': '*',
//                 'Access-Control-Allow-Methods': 'POST',
//                 'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//             },
//         });
//     } finally {
//         await client.close();
//     }
// }

import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
// import redis from '../utils/redisClient';
import {getRedisClient} from '../utils/redisClient';

export async function POST(request) {
    const uri = process.env.DATABASE_URL;
    const client = new MongoClient(uri);
    const body = await request.json();
    const { shop_id, category } = body;

    // Validate shop_id
    if (!shop_id) {
        return NextResponse.json({
            success: false,
            message: "shop_id is required"
        }, {
            status: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
    }

    //  Redis ke
    const redis = getRedisClient();
    const redisKey = category ? `${shop_id}:category_items:${category}` : `${shop_id}:all_categories`;

    try {
        // Check if data is cached in Redis
        const cachedData = await redis.get(redisKey);
        if (cachedData) {
            // If cached, parse and return the data
            return NextResponse.json({
                success: true,
                data: JSON.parse(cachedData)
            }, {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                },
            });
        }

        // Data not cached, so fetch from MongoDB
        const database = client.db('afosfr');
        const inventory = database.collection('inventory');

        let query = { shop_id };
        if (category) {
            query.category = category;
        }

        const products = await inventory.find(query).toArray();
        const categories = {};

        // Organize products by category
        products.forEach(product => {
            if (!categories[product.category]) {
                categories[product.category] = [];
            }
            categories[product.category].push(product);
        });

        const categoriesAndItems = Object.entries(categories).map(([category, items]) => ({
            name: category,
            items: items
        }));

        // If no items are found, return an error
        if (categoriesAndItems.length === 0) {
            return NextResponse.json({
                success: false,
                message: "Shop_id is invalid or items do not exist for that shop_id"
            });
        }

        // Cache the response data in Redis for future requests
        const responseData = { categories: categoriesAndItems };
        await redis.set(redisKey, JSON.stringify(responseData), 'EX', 3600); // Cache for 1 hour

        // Return the response
        return NextResponse.json({
            success: true,
            data: responseData
        }, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
    } finally {
        await client.close();
    }
}
