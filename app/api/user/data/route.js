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

export async function GET() {
  try {
    const { userId, firstName, emailAddress, profileImageUrl } = auth();

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Look for user in DB
    let user = await User.findById(userId);

    if (!user) {
      // First time login (Google signup) → create the user
      user = await User.create({
        _id: userId,
        name: firstName || "No Name",
        email: emailAddress,
        imageUrl: profileImageUrl || "",
        cartItems: {},
      });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
