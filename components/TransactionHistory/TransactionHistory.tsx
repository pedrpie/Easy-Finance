"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Wallet,
  ShoppingCart,
  DollarSign,
  Zap,
} from "lucide-react";
import { useState, useEffect } from "react";

interface Transaction {
  _id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

const categoryIcons: { [key: string]: React.ReactNode } = {
  salary: <DollarSign className="w-4 h-4 text-green-500" />,
  bonus: <DollarSign className="w-4 h-4 text-green-500" />,
  shopping: <ShoppingCart className="w-4 h-4 text-red-500" />,
  utilities: <Zap className="w-4 h-4 text-red-500" />,
  other: <Wallet className="w-4 h-4 text-gray-500" />,
};

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/transaction");
        if (response.ok) {
          const data = await response.json();
          setTransactions(data.slice(0, 5));
        }
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  return (
    <Card className="w-full border-0 shadow-lg bg-white">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Histórico de Transações</CardTitle>
            <CardDescription>Suas últimas transações</CardDescription>
          </div>
          <Wallet className="w-6 h-6 text-blue-500" />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <p className="text-gray-500">Carregando transações...</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Wallet className="w-12 h-12 text-gray-300 mb-3" />
            <p className="text-gray-500">Nenhuma transação encontrada</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction._id}
                className="flex items-center justify-between p-4 rounded-lg bg-linear-to-r hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-gray-200"
                style={{
                  background:
                    transaction.type === "income"
                      ? "linear-gradient(to right, rgba(34, 197, 94, 0.05), rgba(34, 197, 94, 0))"
                      : "linear-gradient(to right, rgba(239, 68, 68, 0.05), rgba(239, 68, 68, 0))",
                }}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={`p-2 rounded-full ${
                      transaction.type === "income"
                        ? "bg-green-100"
                        : "bg-red-100"
                    }`}
                  >
                    {transaction.type === "income" ? (
                      <ArrowDownLeft className="w-5 h-5 text-green-500" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {transaction.title}
                    </p>
                    <p className="text-sm text-gray-500 capitalize">
                      {transaction.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p
                      className={`font-bold text-lg ${
                        transaction.type === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
