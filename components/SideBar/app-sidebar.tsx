"use client";

import { useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "../ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export default function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = useCallback(() => {
    document.cookie = `token=; path=/; max-age=0; SameSite=Strict`;
    router.replace("/");
  }, [router]);

  return (
    <div>
      <Sidebar>
        <SidebarHeader>
          <h1 className="text-3xl font-bold">Easy Finance</h1>
        </SidebarHeader>

        <SidebarContent className="p-2">
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      pathname?.startsWith("/HomePage") || pathname === "/"
                    }
                  >
                    <a href="/HomePage">
                      <span className="text-lg">Dashboard</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild >
                    <a href="#">
                      <span className="text-lg">History</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Transações</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild
                    isActive={
                      pathname?.startsWith("/DepositPage") || pathname === "/DepositPage"
                    }>
                    <a href="/DepositPage">
                      <span className="text-lg">Deposit</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                  asChild
                  isActive={
                    pathname?.startsWith("/WithdrawPage") || pathname === "/WithdrawPage"
                  }>
                    <a href="/WithdrawPage">
                      <span className="text-lg">Withdraw</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                  asChild>
                    <Button
                      variant="destructive"
                      className="text-[17px] mt-10 hover:bg-red-500 cursor-pointer active:bg-red-600 focus:ring-red-300"
                      onClick={handleLogout}>
                      Logout
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}
