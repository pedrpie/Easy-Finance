import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    title: String,
    amount: Number,
    type: String,
    category: String,
    userId: String,
    date: Date
});

export default mongoose.model("Transaction", TransactionSchema)