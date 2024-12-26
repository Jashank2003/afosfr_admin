import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";


export async function POST(request){

    const uri = process.env.DATABASE_URL;
    const client = new MongoClient(uri);

    const { shop_id } = await request.json(); // Get the email from the request body
    // console.log("shop_id from getcashfree is:",shop_id);

    const setCommonHeaders = () => ({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      });

    try{
        await client.connect(); // Connect to the database
        const database = client.db('afosfr');
        const adminsCollection = database.collection('admins');

        // Check if a user with the given shop id exist and get the apikey and apisecret from it
        const user = await adminsCollection.findOne({ shop_id });

        if (user) {
            const apikey = user.apikey;
            const apisecret = user.apisecret;
            console.log("apikey and apisecret",apikey,apisecret);
            if(!apikey || !apisecret){
                return NextResponse.json({error:"User doesnt have api key or api secret"},{status:404,headers:setCommonHeaders()})
            }
            else{
                return NextResponse.json({apikey,apisecret},
                    {status:200 ,headers:setCommonHeaders()} );
                }
        }
        else{
            return NextResponse.json({error:"shop_id not exist"},{status:404,headers:setCommonHeaders()});
        }
    }catch(error){
        return NextResponse.json({error:"Server error try catch fails from catch "},{status:404,headers:setCommonHeaders()})
    }
    finally{
        await client.close();
    }
}