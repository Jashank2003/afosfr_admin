import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import env from '../../../../env/env'
import cloudinary from '../utils/cloudinary'

export async function GET(request){

    const uri=env.DATABASE_URL;
    const client = new MongoClient(uri);
        try{
            const database =  client.db('afosfr');
            const inventory = database.collection('inventory');
            const query = {};
            const products = await inventory.find(query).toArray();
            // console.log(movies);
            return NextResponse.json({success:true,products});

        }
        finally{
            await client.close();
        }
}

export async function POST(request){

    let body = await request.json();
    // console.log(body);
    const uri=env.DATABASE_URL;
    const client = new MongoClient(uri);

        try{
            const database =  client.db('afosfr');
            const inventory = database.collection('inventory');
           
            const product = await inventory.insertOne(body);
            return NextResponse.json({product , ok:true});

        }
        finally{
            await client.close();
        }
}

// export async function POST(request){

//     const{foodname,category,fooding,avlb,foodimg}  = await request.json();
//     // console.log(body);
//     const uri=env.DATABASE_URL;
//     const client = new MongoClient(uri);

//         try{
//             const database =  client.db('afosfr');
//             const inventory = database.collection('inventory');

//             const cloudinaryResult = await cloudinary.uploader.upload(foodimg , {
//                 folder:'menu'
//                 // you can also adjust width height scale and other things of the image
//             });
//             console.log(cloudinaryResult);  
//              const result = {
//                 foodname,
//                 category,
//                 fooding,
//                 avlb,
//                 foodimg: cloudinaryResult.secure_url // Storing the Cloudinary URL
//                 };
                
//             const product = await inventory.insertOne(result);
//             return NextResponse.json({product , ok:true});

//         }
//         finally{
//             await client.close();
//         }
// }