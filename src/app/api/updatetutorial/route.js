import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { tutorialDone, shop_id } = await request.json();
    const uri = process.env.DATABASE_URL;

    const setCommonHeaders = () => ({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
    });

    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db("afosfr");
        const admins = database.collection("admins");

        // Update the document
        const result = await admins.updateOne(
            { shop_id: shop_id }, 
            { $set: { tutorialDone: tutorialDone } }
        );

        return NextResponse.json(
            { ok: true, modifiedCount: result.modifiedCount },
            { status: 200, headers: setCommonHeaders() }
        );
    } catch (error) {
        return NextResponse.json(
            { ok: false, error: error.message },
            { status: 500, headers: setCommonHeaders() }
        );
    } finally {
        await client.close();
    }
}
