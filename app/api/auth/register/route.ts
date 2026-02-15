import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request){
    try {
        await connectDB();

        const {user, email, password} = await req.json();

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            user,
            email,
            password: hashedPassword,
        });

        return NextResponse.json(newUser)
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}