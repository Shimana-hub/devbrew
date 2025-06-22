import DashboardLayout from "@/components/layouts/DashboardLayout";
import { SortableGrid } from "@/components/widgets/SortableGrid";

export default function Home() {
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
