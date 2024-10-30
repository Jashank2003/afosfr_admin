import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET(request) {
    const uri = process.env.DATABASE_URL;
    const client = new MongoClient(uri);
    const url = new URL(request.url);
    const shop_id = url.searchParams.get("shop_id");

    if (!shop_id) {
        return NextResponse.json({ success: false, error: "shop_id is required" }, { status: 400 });
    }

    try {
        await client.connect();
        const database = client.db('afosfr');
        const inventory = database.collection('inventory');

        // Fetch distinct categories for the provided shop_id
        const categories = await inventory.distinct('category', { shop_id });

        return NextResponse.json({ success: true, categories }, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json({ success: false, error: "Error fetching categories" }, { status: 500 });
    } finally {
        await client.close();
    }
}
