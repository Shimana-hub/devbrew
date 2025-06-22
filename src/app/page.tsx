"use client";

import { useAuth } from "@/lib/AuthProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { SortableGrid } from "@/components/widgets/SortableGrid";

export default function Home() {
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/auth");
    }
  }, [session]);

  if (!session) return null;
  
  return (
    <main className="flex h-screen items-center justify-center">
      <DashboardLayout>
        <div className="text-muted-foreground text-center">
          <SortableGrid />
        </div>
      </DashboardLayout>
    </main>
  );
}
