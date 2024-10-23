import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const query = request.nextUrl.searchParams.get("query");
  const shop_id = request.nextUrl.searchParams.get("shop_id"); // Get shop_id from the query parameters

  const uri = process.env.DATABASE_URL;
  const client = new MongoClient(uri);

  try {
    const database = client.db('afosfr');
    const inventory = database.collection('inventory');

    const products = await inventory.aggregate([
      {
        $match: {
          $and: [
            { shop_id: shop_id }, // Match the shop_id
            {
              $or: [
                { foodname: { $regex: query, $options: "i" } },
                // { category: { $regex: query, $options: "i" } }, // Uncomment if needed
                // { price: { $regex: query, $options: "i" } },    // Uncomment if needed
              ],
            },
          ],
        },
      },
    ]).toArray();

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
