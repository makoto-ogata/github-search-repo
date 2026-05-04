type GitHubRepo = {
	id: number;
	full_name: string;
	description: string | null;
	language: string | null;
	stargazers_count: number;
	owner: {
		login: string;
		avatar_url: string;
	};
};

type GitHubRepoDetail = GitHubRepo & {
	subscribers_count: number;
	forks_count: number;
	open_issues_count: number;
};

export async function searchRepositories(q: string): Promise<GitHubRepo[]> {
	const res = await fetch(`https://api.github.com/search/repositories?q=${q}`);
	const data = await res.json();
	return data.items;
}

export async function getRepository(
	owner: string,
	repo: string,
): Promise<GitHubRepoDetail> {
	const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
	return res.json();
}
