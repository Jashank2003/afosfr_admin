import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { productName, avlb } = await request.json();
    
    const uri = "mongodb+srv://jashankjain224:SPIDERALERT224@cluster0.2osscc1.mongodb.net/?";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('afosfr');
        const inventory = database.collection('inventory');

        // Find the product by name and update its availability
        const filter = { foodname: productName };
        const updateDoc = {
            $set: { avlb: avlb }
        };

        const result = await inventory.updateOne(filter, updateDoc);
        
        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("Error updating product availability:", error);
        return NextResponse.json({ success: false, error: "Error updating product availability" });
    } finally {
        await client.close();
    }
}

export async function DELETE(request) {

    const { foodname } =  await request.json();

    if (!foodname) {
        return new Response(JSON.stringify({ error: 'Missing foodname' }), { status: 400 });
    }

    const uri = "mongodb+srv://jashankjain224:SPIDERALERT224@cluster0.2osscc1.mongodb.net/?";
    const client = new MongoClient(uri);


    try {
        const database = client.db('afosfr');
        const inventory = database.collection('inventory');
        
        const result = await inventory.deleteOne({ foodname });

        if (result.deletedCount === 1) {
            return NextResponse.json({success:true , message:`deleted` , status:true })
        } else {
            return NextResponse.json({success:true , message:`error in if else` , status:false })
        }
    } catch (error) {
        console.error('Error deleting document:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    } finally {
        await client.close();
    }
}
