// import connectDB from "@/config/db";
// import User from "@/models/User";
// import { getAuth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";


// export async function GET(req) {
//     try{
//         const {userId} = getAuth(req);
//         await connectDB();
//         const user = await User.findById(userId)

//         if(!user){
//             return NextResponse.json({success: false, message: "User not found"})
//         }
//         return NextResponse.json({success: true,  message: "User found", data:user})

//     }catch(error){
//         return NextResponse.json({success: false, message: error.message})

//     }
// }

import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { userId } = getAuth(req); // ← uses request context automatically

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User found",
      data: user,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
