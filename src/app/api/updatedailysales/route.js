import {MongoClient} from 'mongodb'
import { NextResponse } from 'next/server'

// set sales data daily by post and from done for the day
export async function POST(request){

    const body = await request.json();
    const uri = process.env.DATABASE_URL;
    const client = new MongoClient(uri);

    const setCommonHeaders = () => ({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      });

    try{
        await client.connect();
        const database = client.db('afosfr');
        const salesdata = database.collection('salesdata');

        const result = await salesdata.insertOne(body);

        return NextResponse.json({result,ok:true},{status:200,headers:setCommonHeaders()});
        
    }
    catch(error){
        return NextResponse.json({ok:false,error:error.message},{status:500,headers:setCommonHeaders()});
    }
    finally{
        await client.close();
    }
}

// get sales data for sales analytics

export async function GET(request){

    const { searchParams } = new URL(request.url);
    const shop_id = searchParams.get('shop_id');
    const range = searchParams.get('range');
  
    console.log('shop_id:', shop_id); // Debugging
    console.log('range:', range);     // Debugging
  
    if (!shop_id || !range) {
      return new Response(JSON.stringify({ error: 'Missing parameters' }), { status: 400 });
    }

    const uri = process.env.DATABASE_URL;
    const client = new MongoClient(uri);

    const setCommonHeaders = () => ({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      });

    try{
        await client.connect();

        const database = client.db('afosfr');
        const salesdata = database.collection('salesdata');

        let startDate ;
        let endDate = new Date();

        if(range === '7 days'){
            startDate = new Date();
            startDate.setDate(endDate.getDate() - 7);
        }
        else if(range === 'monthly'){
            startDate = new Date();
            startDate.setMonth(endDate.getMonth() - 1);
        }
        else if(range === 'yearly'){
            startDate = new Date();
            startDate.setFullYear(endDate.getFullYear() - 1);
        }
        else if (range.startsWith('custom:')) {
            // Handle custom range
            const [_, startStr, endStr] = range.split(':');
            startDate = new Date(startStr);
            endDate = new Date(endStr);

            // Ensure startDate is less than endDate
            if (startDate > endDate) {
                const temp = startDate;
                startDate = endDate;
                endDate = temp;
            }
        } else {
            return new Response(JSON.stringify({ error: 'Invalid range' }), { status: 400 });
        }

        const startDateStr = startDate.toISOString();
        const endDateStr = endDate.toISOString();
        const result = await  salesdata.find(
            {shop_id,
             date : {
                    $gte:startDateStr,
                    $lte:endDateStr,
                },
            }).sort({ date: 1 }).toArray();
        //  console.log("route js result:",result);
        return NextResponse.json({data:result, ok:true},{status:200,headers:setCommonHeaders()});
    }
    catch(error){
        return NextResponse.json({error:error.message , ok:false},{status:400,headers:setCommonHeaders()})
    }

    finally{
        await client.close();
    }
}