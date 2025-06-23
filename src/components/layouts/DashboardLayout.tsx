"use client";

import { useAuth } from "@/lib/AuthProvider";
import { supabase } from "@/lib/supabase";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useDashboardStore } from "@/lib/store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const { session } = useAuth();
const email = session?.user.email;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useDashboardStore();

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <aside className="w-64 bg-muted p-4 border-r">
        <h2 className="text-xl font-bold mb-6">☕ DevBrew</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/settings" className="hover:underline">
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex justify-between items-center border-b px-6 py-4 gap-4 flex-wrap">
          <h1 className="text-2xl font-semibold flex-shrink-0">Dashboard</h1>
          <div className="flex items-center gap-3 flex-shrink-0 ml-auto">
            <div className="flex items-center gap-2">
              <p className="text-sm">Welcome, {email?.split("@")[0]}</p>
              <Avatar>
                <AvatarFallback>
                  {email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* <Link
              href="/auth"
              className="hover:underline text-sm text-muted-foreground"
            >
              Login
            </Link> */}
            <Button onClick={() => supabase.auth.signOut()}>Logout</Button>
            {loading && (
              <p className="text-sm text-muted-foreground">Loading...</p>
            )}
            <ThemeToggle />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
