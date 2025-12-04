"use client";

import { ReactNode, useState } from "react";
import { Menu, FileText, X, LogOut, Users, Briefcase, MessageCircle, Ticket, Headphones } from "lucide-react";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/lib/logout";


type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const topNavItems = [
    { name: "Applications", icon: Users, path: "/dashboard/applications" },
    { name: "Services", icon: Briefcase, path: "/dashboard/services" },
    { name: "Chat", icon: MessageCircle, path: "/dashboard/chat" },
    { name: "Tickets", icon: Ticket, path: "/dashboard/tickets" },   // 🎟️ added Tickets
    { name: "Support", icon: Headphones, path: "/dashboard/supports" } // 🎧 added Support
  ];

  const handleLogoutConfirm = async () => {
    try {
      await logoutAction();
      localStorage.clear();
      sessionStorage.clear();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLogoutDialogOpen(false);
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Logout Dialog */}
      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogContent className="sm:max-w-md z-[9999]">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out? Your session will be cleared.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setLogoutDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogoutConfirm}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Layout */}
      <div className="flex h-screen w-full overflow-hidden bg-gray-100">
        {/* Sidebar */}
        <aside
          className={clsx(
            "flex flex-col bg-white border-r shadow-md transition-all duration-300 ease-in-out w-64",
            !sidebarOpen && "hidden lg:flex"
          )}
        >
          {/* Logo */}


          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
            {topNavItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <button
                  key={item.name}
                  onClick={() => router.push(item.path)}
                  className={clsx(
                    "flex items-center w-full px-4 py-2 text-left rounded-md transition-colors",
                    isActive
                      ? "bg-red-100 text-red-600 font-medium"
                      : "text-gray-600 hover:bg-red-50 hover:text-red-600"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="ml-3">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <Button
              className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setLogoutDialogOpen(true)}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="flex items-center justify-between px-6 h-16 bg-white border-b shadow-sm flex-shrink-0">
            <button
              className="lg:hidden p-2 text-gray-600"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>

            <h2 className="text-lg font-semibold text-gray-800">Welcome Back 👋</h2>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700 font-medium">John Doe</span>
              <img
                src="https://i.pravatar.cc/40"
                alt="user avatar"
                className="w-9 h-9 rounded-full border"
              />
            </div>
          </header>

          {/* Main */}
          <main className="flex-1 overflow-auto bg-white p-6">{children}</main>
        </div>
      </div>
    </>
  );
}
