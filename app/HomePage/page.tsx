"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/SideBar/app-sidebar";
import Header from "@/components/Header/Header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import TransactionHistory from "@/components/TransactionHistory/TransactionHistory";
import { TrendingUp, TrendingDown, Wallet, Activity } from "lucide-react";
import { useState, useEffect } from "react";

interface StatsData {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export default function HomePage() {
  const [stats, setStats] = useState<StatsData>({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/transaction");
        if (response.ok) {
          const transactions = await response.json();

          const totalIncome = transactions
            .filter((t: any) => t.type === "income")
            .reduce((sum: number, t: any) => sum + t.amount, 0);

          const totalExpense = transactions
            .filter((t: any) => t.type === "expense")
            .reduce((sum: number, t: any) => sum + t.amount, 0);

          setStats({
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense,
          });
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  return (
    <div className=" bg-linear-to-br from-blue-50 via-white to-indigo-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Bem-vindo ao Easy Finance
          </h1>
          <p className="text-gray-600 text-lg">
            Gerencie suas finanças com facilidade e inteligência
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Total Income Card */}
          <Card className="border-0 shadow-lg bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="relative z-10 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-gray-600 mb-1">
                    Receita Total
                  </CardDescription>
                  <CardTitle className="text-3xl font-bold text-green-600">
                    {loading ? "-" : formatCurrency(stats.totalIncome)}
                  </CardTitle>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500 opacity-20" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Todas as suas entradas de dinheiro
              </p>
            </CardContent>
          </Card>

          {/* Total Expense Card */}
          <Card className="border-0 shadow-lg bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="relative z-10 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-gray-600 mb-1">
                    Despesa Total
                  </CardDescription>
                  <CardTitle className="text-3xl font-bold text-red-600">
                    {loading ? "-" : formatCurrency(stats.totalExpense)}
                  </CardTitle>
                </div>
                <TrendingDown className="w-8 h-8 text-red-500 opacity-20" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Todas as suas saídas de dinheiro
              </p>
            </CardContent>
          </Card>

          {/* Total Balance Card */}
          <Card className="border-0 shadow-lg bg-linear-to-br from-blue-600 to-indigo-600 overflow-hidden hover:shadow-xl transition-shadow duration-300 text-white">
            <CardHeader className="relative z-10 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-blue-100 mb-1">
                    Saldo Total
                  </CardDescription>
                  <CardTitle className="text-3xl font-bold text-white">
                    {loading ? "-" : formatCurrency(stats.balance)}
                  </CardTitle>
                </div>
                <Wallet className="w-8 h-8 text-white opacity-20" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-100">
                Sua situação financeira atual
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Atividade Recente
            </h2>
          </div>
          <TransactionHistory />
        </div>
      </main>

      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
        </main>
      </SidebarProvider>
    </div>
  );
}
