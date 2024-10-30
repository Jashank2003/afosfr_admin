import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

// POST API: Update Product Availability
export async function POST(request) {
    const { productName, avlb, shop_id } = await request.json();

    // Validate that productName and shop_id are provided
    if (!productName || !shop_id) {
        return NextResponse.json({ success: false, error: "Product name and Shop ID are required" }, { status: 400 });
    }

    const uri = process.env.DATABASE_URL;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('afosfr');
        const inventory = database.collection('inventory');

        // Find the product by name and shop_id, and update its availability
        const filter = { foodname: productName, shop_id: shop_id }; // Match both productName and shop_id
        const updateDoc = {
            $set: { avlb: avlb }
        };

        const result = await inventory.updateOne(filter, updateDoc);

        if (result.matchedCount === 0) {
            return NextResponse.json({ success: false, error: "No matching product found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("Error updating product availability:", error);
        return NextResponse.json({ success: false, error: "Error updating product availability" }, { status: 500 });
    } finally {
        await client.close();
    }
}

// DELETE API: Delete Product
export async function DELETE(request) {
    const { foodname, shop_id } = await request.json();

    // Validate that foodname and shop_id are provided
    if (!foodname || !shop_id) {
        return NextResponse.json({ success: false, error: "Food name and Shop ID are required" }, { status: 400 });
    }

    const uri = process.env.DATABASE_URL;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('afosfr');
        const inventory = database.collection('inventory');

        // Delete product based on foodname and shop_id
        const result = await inventory.deleteOne({ foodname: foodname, shop_id: shop_id });

        if (result.deletedCount === 1) {
            return NextResponse.json({ success: true, message: "Product deleted successfully" });
        } else {
            return NextResponse.json({ success: false, message: "No matching product found to delete" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json({ success: false, error: "Error deleting product" }, { status: 500 });
    } finally {
        await client.close();
    }
}
