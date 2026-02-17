import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/SideBar/app-sidebar";
import Header from "@/components/Header/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div>
      <Header />
      <div className="m-10">
        <div>
            <h1 className="text-4xl font-bold mt-10">Welcome to Easy Finance</h1>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="w-full border-green-500">
                <CardHeader>
                    <CardTitle>Total Income</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold text-green-500">$1000</p>
                </CardContent>
            </Card>

            <Card className="w-full border-red-500">
                <CardHeader>
                    <CardTitle>Total Expense</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold text-red-500">$500</p>
                </CardContent>
            </Card>

            <Card className="w-full border-blue-500">
                <CardHeader>
                    <CardTitle>Total Balance</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold text-blue-500">$500</p>
                </CardContent>
            </Card>
        </div>
      </div>

      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {}
        </main>
      </SidebarProvider>
    </div>
  );
}
