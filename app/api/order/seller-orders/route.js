import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Order from "@/models/Order";
import Address from "@/models/Address"; 
import Product from "@/models/Product"; 
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { userId } = getAuth(request);

        if (!userId) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const isSeller = await authSeller(request);
        if (!isSeller) {
            return NextResponse.json(
                { success: false, message: "Not Authorized" },
                { status: 403 }
            );
        }

        await connectDB();

        const orders = await Order.find({})
            .populate("address")
            .populate("items.product");

        return NextResponse.json({ success: true, orders });

    } catch (error) {
        console.error("Seller Orders Error:", error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
