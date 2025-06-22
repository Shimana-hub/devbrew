import DashboardLayout from "@/components/layouts/DashboardLayout";
import { GitHubFeed } from "@/components/widgets/GitHubFeed";
import { WeatherWidget } from "@/components/widgets/WeatherWidget";
import { Bookmarks } from "@/components/widgets/Bookmarks";
import { Notes } from "@/components/widgets/Notes";
import { PomodoroTimer } from "@/components/widgets/PomodoroTimer";

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center">
      <DashboardLayout>
        <div className="text-muted-foreground text-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            <GitHubFeed username="Shimana-hub" />
            <WeatherWidget city="Lagos" />
            <Bookmarks />
            <Notes />
            <PomodoroTimer />

          </div>
        </div>
      </DashboardLayout>
    </main>
  );
}
