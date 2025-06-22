"use client";

import { useState } from "react";
import { useDashboardStore } from "@/lib/store";
import { WidgetContainer } from "./WidgetContainer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { v4 as uuid } from "uuid";

export function Bookmarks() {
  const { bookmarks, addBookmark, removeBookmark } = useDashboardStore();
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");

  const handleAdd = () => {
    if (!label || !url) return;
    addBookmark({ id: uuid(), label, url });
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
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeBookmark(b.id)}
              >
                ❌
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </WidgetContainer>
  );
}
