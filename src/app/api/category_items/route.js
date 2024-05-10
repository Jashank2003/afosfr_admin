import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import env from '../../../../env/env'
import cloudinary from '../utils/cloudinary'

export async function GET(request){

    const uri=env.DATABASE_URL;
    const client = new MongoClient(uri);
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const category = params.get("category");
    console.log(category)
    try {
        const database =  client.db('afosfr');
        const inventory = database.collection('inventory');
        let query = {};

        if (category) {
            // If category is defined in the request, filter by category
            query = { category: category };
        }

        const products = await inventory.find(query).toArray();
        const categories = {}; // Object to hold categories and their respective items

        // Organize products into categories
        products.forEach(product => {
            if (!categories[product.category]) {
                categories[product.category] = []; // Initialize category array if not exists
            }
            categories[product.category].push(product);
        });

        const categoriesAndItems = Object.entries(categories).map(([category, items]) => ({
            name: category,
            items: items
        }));

        return NextResponse.json({
            success: true,
            data: {
                categories: categoriesAndItems
            }
        }, {
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

