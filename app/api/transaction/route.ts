import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Transaction from "@/models/Transaction";

export async function POST(req: Request) {
    try {
        await connectDB();

        const body = await req.json();

        const transaction = await Transaction.create(body);

        return NextResponse.json(transaction)
    } catch (err) {
        return NextResponse.json({ err: "Erro ao criar" }, { status: 500 });
    }
}