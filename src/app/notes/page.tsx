"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthProvider";
import { useDashboardStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotesPage() {
  const { session } = useAuth();
  const userId = session?.user.id;
  const { notes, fetchNotes, createNote, updateNote, deleteNote } =
    useDashboardStore();
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  // Local state for editing
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const activeNote = notes.find((n) => n.id === activeNoteId);

  useEffect(() => {
    if (userId) fetchNotes(userId);
  }, [userId]);

  // Sync local state with activeNote
  useEffect(() => {
    setTitle(activeNote?.title || "");
    setContent(activeNote?.content || "");
  }, [activeNote]);

  const handleNewNote = async () => {
    const newNote = await createNote(userId!, "Untitled Note");
    if (newNote) setActiveNoteId(newNote.id);
  };

  const handleSave = () => {
    if (activeNote && userId) {
      updateNote({ ...activeNote, title, content }, userId);
    }
  };

  return (
    <div className="flex h-[90vh]">
      {/* Sidebar */}
      <div className="w-1/4 p-4 border-r space-y-2 overflow-y-auto">
        <div className="flex justify-between items-center mb-2">
          <Button onClick={handleNewNote}>+ New Note</Button>
          <Button asChild variant="secondary" className="ml-2">
            <Link href="/">
              <svg
                className="w-4 h-4 mr-1 inline"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Dashboard
            </Link>
          </Button>
        </div>
        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => setActiveNoteId(note.id)}
            className={`cursor-pointer p-2 rounded ${
              activeNoteId === note.id ? "bg-muted" : "hover:bg-accent"
            }`}
          >
            <p className="font-medium truncate">{note.title}</p>
            <p className="text-sm text-muted-foreground truncate">
              {note.content.slice(0, 60)}
            </p>
          </div>
        ))}
      </div>

      {/* Editor */}
      <div className="flex-1 p-6 space-y-4">
        {activeNote ? (
          <>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <Textarea
              className="min-h-[300px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start typing..."
            />
            <div className="flex justify-between">
              <Button
                variant="destructive"
                onClick={() => deleteNote(activeNote.id, userId!)}
              >
                Delete
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </>
        ) : (
          <p className="text-muted-foreground">Select a note to view/edit.</p>
        )}
      </div>
    </div>
  );
}
