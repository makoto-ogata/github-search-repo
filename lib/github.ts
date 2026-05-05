interface GitHubRepo {
	id: number;
	name: string;
	html_url: string;
	full_name: string;
	description: string | null;
	language: string | null;
	stargazers_count: number;
	owner: {
		login: string;
		html_url: string;
		avatar_url: string;
	};
}

interface GitHubRepoDetail extends GitHubRepo {
	subscribers_count: number;
	forks_count: number;
	open_issues_count: number;
}

export async function searchRepositories(q: string): Promise<GitHubRepo[]> {
	const res = await fetch(
		`https://api.github.com/search/repositories?q=${encodeURIComponent(q)}`,
		{
			headers: { "User-Agent": "github-search-repo" },
		},
	);
	if (!res.ok) throw new Error("GitHub API error: " + res.status);
	const data = (await res.json()) as { items?: GitHubRepo[] };
	return data.items ?? [];
}

export async function getRepository(
	owner: string,
	repo: string,
): Promise<GitHubRepoDetail> {
	const res = await fetch(
		`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`,
		{
			headers: { "User-Agent": "github-search-repo" },
		},
	);
	if (!res.ok) throw new Error("GitHub API error: " + res.status);
	return res.json();
}
