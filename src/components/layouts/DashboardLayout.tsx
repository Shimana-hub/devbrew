"use client";

import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <aside className="w-64 bg-muted p-4 border-r">
        <h2 className="text-xl font-bold mb-6">☕ DevBrew</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/" className="hover:underline">Dashboard</Link>
          <Link href="/settings" className="hover:underline">Settings</Link>
        </nav>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex justify-between items-center border-b px-6 py-4">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <ThemeToggle />
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
