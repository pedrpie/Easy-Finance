import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request){
    try {
        await connectDB();

        const { email, password } = await req.json();

        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json(
                { error: "Usuário não encontrado"},
                { status: 404}
            );
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid){
            return NextResponse.json(
                { error: "Senha inválida" },
                { status: 401 }
            )
        };

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" } 
        )

        return NextResponse.json({ token });

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}