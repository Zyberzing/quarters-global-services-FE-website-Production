"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  Menu,
  LogOut,
  Users,
  Briefcase,
  MessageCircle,
  Ticket,
  Headphones,
  CreditCard,
  Landmark,
} from "lucide-react";
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

/* ================= TYPES ================= */

type DashboardLayoutProps = {
  children: ReactNode;
};

type User = {
  firstName: string;
  lastName: string;
  profilePicture?: string;
};

/* ================= COMPONENT ================= */

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  const topNavItems = [
    { name: "Applications", icon: Users, path: "/dashboard/applications" },
    { name: "Services", icon: Briefcase, path: "/dashboard/services" },
    { name: "Chat", icon: MessageCircle, path: "/dashboard/chat" },
    { name: "Tickets", icon: Ticket, path: "/dashboard/tickets" },
        { name: 'Payments', icon: CreditCard, path: '/dashboard/payments' }, // ✅ ADDED
 {
    name: "Tax Bureau",
    icon: Landmark, // 🏛️ suitable government/tax icon
    path: "/dashboard/tax-bureau",
  },
    { name: "Support", icon: Headphones, path: "/dashboard/supports" },
  ];

  /* ================= LOGOUT ================= */

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
      setProfileMenuOpen(false);
      setSidebarOpen(false);
    }
  };

  /* ================= FETCH USER ================= */

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me");

        if (!res.ok) {
          router.push("/login");
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("User fetch failed", err);
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  /* ================= CLOSE PROFILE MENU ON OUTSIDE CLICK ================= */

  useEffect(() => {
    const close = () => setProfileMenuOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <>
      {/* ================= LOGOUT CONFIRM DIALOG ================= */}
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

      {/* ================= LAYOUT ================= */}
      <div className="flex h-screen w-full overflow-hidden bg-gray-100 ">
        {/* ================= SIDEBAR ================= */}
        <aside
          className={clsx(
            "flex flex-col bg-white border-r shadow-lg transition-all duration-300 w-64",
            !sidebarOpen && "hidden lg:flex"
          )}
        >
          <nav className="flex-1 overflow-y-auto px-3   space-y-1 pt-3">
            {topNavItems.map((item) => {
              const isActive =
                pathname === item.path || pathname.startsWith(item.path + "/");

              return (
                <button
                  key={item.name}
                  onClick={() => router.push(item.path)}
                  className={clsx(
                    "group relative flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ",
                    isActive
                      ? "bg-red-50 text-red-600 font-semibold shadow-sm"
                      : "text-gray-600 hover:bg-red-50 hover:text-red-600 hover:shadow-sm"
                  )}
                >
                  {/* Left Active Border */}
                  <span
                    className={clsx(
                      "absolute left-0 top-2 bottom-2 w-1 rounded-r-md transition-all",
                      isActive ? "bg-red-600" : "bg-transparent group-hover:bg-red-300"
                    )}
                  />

                  {/* Icon */}
                  <div
                    className={clsx(
                      "flex items-center justify-center h-9 w-9 rounded-md transition-all",
                      isActive
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-500 group-hover:bg-red-100 group-hover:text-red-600"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                  </div>

                  {/* Label */}
                  <span
                    className={clsx(
                      "ml-3 text-sm transition-all",
                      isActive
                        ? "tracking-wide"
                        : "group-hover:tracking-wide"
                    )}
                  >
                    {item.name}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>


        {/* ================= MAIN ================= */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* ================= HEADER ================= */}
          <header className="flex items-center justify-between px-6 h-18 bg-white border-b shadow-sm  ">
            <button
              className="lg:hidden p-2 text-gray-600"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>

            <h2 className="text-lg font-semibold text-gray-800">
              Welcome Back 👋
            </h2>

            {/* ===== PROFILE MENU ===== */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setProfileMenuOpen((p) => !p);
                }}
                className="flex items-center space-x-2"
              >
                <img
                  src={user?.profilePicture ?? "https://i.pravatar.cc/40"}
                  alt="user avatar"
                  className="w-9 h-9 rounded-full border"
                />
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-medium text-gray-800">
                      {user
                        ? `${user.firstName} ${user.lastName}`
                        : "Loading..."}
                    </p>
                    <p className="text-xs text-gray-500">Account</p>
                  </div>

                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      router.push("/dashboard/profile");
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  >
                    ⚙️ Settings
                  </button>

                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      setLogoutDialogOpen(true);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </header>

          {/* ================= CONTENT ================= */}
          <main className="flex-1 overflow-auto bg-white p-6">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
