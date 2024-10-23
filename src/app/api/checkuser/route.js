import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email } = await request.json(); // Get the email from the request body

  const uri = process.env.DATABASE_URL;
  const client = new MongoClient(uri);

  // Function to set common headers
  const setCommonHeaders = () => ({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });

  try {
    await client.connect(); // Connect to the database
    const database = client.db('afosfr');
    const adminsCollection = database.collection('admins');
    
    // Check if a user with the given email exists and get the full user data
    const user = await adminsCollection.findOne({ email });

    if (user) {
      return NextResponse.json({ exists: true, user }, {
        status: 200,
        headers: setCommonHeaders(), // Set common headers
      });
    } else {
      return NextResponse.json({ exists: false }, {
        status: 404,
        headers: setCommonHeaders(), // Set common headers
      });
    }
  } catch (error) {
    console.error('Error checking user:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, {
      status: 500,
      headers: setCommonHeaders(), // Set common headers
    });
  } finally {
    await client.close(); // Close the database connection
  }
}
