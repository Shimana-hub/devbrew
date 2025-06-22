"use client";

import { useState, useEffect } from "react";
import { useDashboardStore } from "@/lib/store";
import { WidgetContainer } from "./WidgetContainer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { v4 as uuid } from "uuid";
import { useAuth } from "@/lib/AuthProvider";

export function Bookmarks() {
  const { session } = useAuth();
  const userId = session?.user.id;
  const { bookmarks, fetchBookmarks, saveBookmark, deleteBookmark } =
    useDashboardStore();

  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (userId) fetchBookmarks(userId);
  }, [userId]);

  const handleAdd = () => {
    if (!label || !url || !userId) return;
    const newBookmark = { id: uuid(), label, url };
    saveBookmark(newBookmark, userId);
    setLabel("");
    setUrl("");
  };

  return (
    <WidgetContainer title="Bookmarks">
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            placeholder="Label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
          <Input
            placeholder="https://..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button onClick={handleAdd}>Add</Button>
        </div>

        <ul className="mt-4 space-y-1">
          {bookmarks.map((b) => (
            <li key={b.id} className="flex justify-between items-center">
              <a
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {b.label}
              </a>
              <Button onClick={() => deleteBookmark(b.id, userId)}>❌</Button>
            </li>
          ))}
        </ul>
      </div>
    </WidgetContainer>
  );
}
