import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/SideBar/app-sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BanknoteArrowUp } from 'lucide-react';

export default function DepositPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center w-150 pb-6 mt-30 border-0 shadow-lg text-center">
        <section className="text-center">
          <h1 className="text-5xl font-bold mt-10 flex items-center gap-3"><BanknoteArrowUp size={50} color="green" /> Deposit Your Money</h1>
          <h2 className="text-3xl mt-5">Current balance: $0.00</h2>
        </section>

        <section className="w-100 mt-15 flex flex-col gap-5">
          <h2 className="text-3xl">Enter amount:</h2>
          <Input type="number" placeholder="Amount to deposit" />
          <Button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 cursor-pointer active:bg-blue-800">
            Deposit
          </Button>
        </section>
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
