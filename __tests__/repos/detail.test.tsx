import { render, screen } from "@testing-library/react";
import { RepoDetail } from "@/app/components/RepoDetail";
import { GitHubRepoDetail } from "@/lib/github";

const mockData: GitHubRepoDetail = {
	id: 1,
	name: "next.js",
	full_name: "vercel/next.js",
	description: "The React Framework",
	language: "TypeScript",
	stargazers_count: 100000,
	subscribers_count: 2000,
	forks_count: 5000,
	open_issues_count: 300,
	html_url: "https://github.com/vercel/next.js",
	owner: {
		login: "vercel",
		avatar_url: "https://avatars.githubusercontent.com/u/14985020",
		html_url: "https://github.com/vercel",
	},
};

describe("RepoDetail", () => {
	beforeEach(() => {
		render(<RepoDetail data={mockData} />);
	});
	it("リポジトリ名が表示される", () => {
		expect(screen.getByText("vercel/next.js")).toBeInTheDocument();
	});
	it("言語が表示される", () => {
		expect(screen.getByText("language: TypeScript")).toBeInTheDocument();
	});
	it("Star数が表示される", () => {
		expect(screen.getByText("100,000")).toBeInTheDocument();
	});
});
