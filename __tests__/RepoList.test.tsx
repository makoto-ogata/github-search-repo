import { render, screen } from "@testing-library/react";
import { RepoList } from "@/app/components/RepoList";
import { GitHubRepo } from "@/lib/github";

const mockRepos: GitHubRepo[] = [
	{
		id: 1,
		name: "next.js",
		full_name: "vercel/next.js",
		html_url: "https://github.com/vercel/next.js",
		description: "The React Framework",
		language: "TypeScript",
		stargazers_count: 1000,
		owner: {
			login: "vercel",
			avatar_url: "https://avatars.githubusercontent.com/u/14985020",
			html_url: "https://github.com/vercel",
		},
	},
];

describe("RepoList", () => {
	beforeEach(() => {
		render(<RepoList repos={mockRepos} />);
	});
	it("リポジトリ名が表示される", () => {
		expect(screen.getByText("vercel/next.js")).toBeInTheDocument();
	});
	it("言語が表示される", () => {
		expect(screen.getByText("TypeScript")).toBeInTheDocument();
	});
});
