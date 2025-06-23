"use client";

import Link from "next/link";
import { useAuth } from "@/lib/AuthProvider";
import { useEffect } from "react";
import { useDashboardStore } from "@/lib/store";
import { WidgetContainer } from "./WidgetContainer";
import { Button } from "@/components/ui/button";

export function Notes() {
  const { session } = useAuth();
  const userId = session?.user.id;
  const { notes, fetchNotes } = useDashboardStore();

  useEffect(() => {
    if (userId) fetchNotes(userId);
  }, [userId]);

  return (
    <WidgetContainer title="Notes">
      <div className="space-y-2 max-h-[200px] overflow-y-auto">
        {notes.slice(0, 3).map((note) => (
          <div key={note.id}>
            <p className="font-medium truncate">{note.title}</p>
            <p className="text-sm text-muted-foreground truncate">
              {note.content.slice(0, 80)}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-3 text-right">
        <Link href="/notes">
          <Button variant="secondary" size="sm">View All</Button>
        </Link>
      </div>
    </WidgetContainer>
  );
}
