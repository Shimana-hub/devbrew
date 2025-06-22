"use client";

import { useEffect, useState } from "react";
import { WidgetContainer } from "./WidgetContainer";
import { fetchGitHubRepos } from "@/lib/github";

export function GitHubFeed({ username = "Shimana-hub" }) {
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRepos() {
      try {
        const data = await fetchGitHubRepos(username);
        setRepos(data);
      } catch (err) {
        setError("Failed to load GitHub repos");
      } finally {
        setLoading(false);
      }
    }

    loadRepos();
  }, [username]);

  return (
    <WidgetContainer title="GitHub Feed">
      {loading && <p className="text-sm text-muted-foreground">Loading...</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}
      <ul className="space-y-2">
        {repos.map((repo) => (
          <li key={repo.id}>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {repo.name}
            </a>
            <p className="text-sm text-muted-foreground">
              {repo.description || "No description"}
            </p>
          </li>
        ))}
      </ul>
    </WidgetContainer>
  );
}
