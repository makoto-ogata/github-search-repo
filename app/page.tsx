import { SearchForm } from "@/app/components/SearchForm";
import { RepoList } from "@/app/components/RepoList";
import { searchRepositories } from "@/lib/github";

interface Props {
	searchParams: Promise<{ q?: string }>;
}

export default async function Home({ searchParams }: Props) {
	const { q } = await searchParams;
	const repos = q ? await searchRepositories(q) : [];

	return (
		<main className='my-12 mx-auto w-full max-w-3xl px-4'>
			<h1 className='sr-only'>GitHub Repository Search</h1>
			<SearchForm defaultValue={q ?? ""} />
			{q && repos.length > 0 && <RepoList repos={repos} />}
			{q && repos.length === 0 && (
				<p className='mt-8 text-center text-gray-500'>No repositories found.</p>
			)}
		</main>
	);
}
