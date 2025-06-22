export async function fetchGitHubRepos(username: string) {
  const res = await fetch(`https://api.github.com/users/${username}/repos`, {
    headers: {
      Accept: "application/vnd.github+json",
    },
    next: { revalidate: 60 }, 
  });

  if (!res.ok) {
    throw new Error("Failed to fetch GitHub repos");
  }

  const data = await res.json();
  return data.slice(0, 5); 
}
