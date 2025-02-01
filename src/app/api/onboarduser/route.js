import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  
  // Check for null or empty fields
  const requiredFields = ['admin_name', 'contact', 'password', 'shop_name', 'sub_end', 'shop_id', 'email'];
  
  for (const field of requiredFields) {
    if (!body[field]) {
      return NextResponse.json({ ok: false, error: `${field} is required.` }, { status: 400 });
    }
  }

  const uri = process.env.DATABASE_URL;
  const client = new MongoClient(uri);

  try {
    
    const database = client.db('afosfr');
    const admins = database.collection('admins'); 
    // Insert the admin data into the database
    const newAdmin = await admins.insertOne(body);
    
    // Return the response with the newly created admin data
    return NextResponse.json({ newAdmin, ok: true });
  } catch (error) {
    console.error("Error inserting admin:", error);
    return NextResponse.json({ ok: false, error: "Failed to create admin" }, { status: 500 });
  } finally {
    await client.close();
  }
}
