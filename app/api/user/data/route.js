import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(req) {
    try{
        const {userId} = getAuth(req);
        await connectDB();
        const user = User.findById(userId)

        if(!user){
            return NextResponse.json({success: false, message: "User not found"})
        }
        return NextResponse.json({success: true,  message: "User found", data:user})

    }catch(error){
        return NextResponse.json({success: false, message: error.message})

    }
}