"use client";

import { useDashboardStore } from "@/lib/store";
import { WidgetContainer } from "./WidgetContainer";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function Notes() {
  const { notes, setNotes } = useDashboardStore();

  return (
    <WidgetContainer title="Notes">
      <Tabs defaultValue="edit" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="edit">
          <Textarea
            className="min-h-[150px]"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write your markdown notes here..."
          />
        </TabsContent>

        <TabsContent value="preview">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{notes}</ReactMarkdown>
          </div>
        </TabsContent>
      </Tabs>
    </WidgetContainer>
  );
}
