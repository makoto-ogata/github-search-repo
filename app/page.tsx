import { SearchForm } from "@/app/components/SearchForm";
import { searchRepositories } from "@/lib/github";

interface Props {
	searchParams: Promise<{ q?: string }>;
}

export default async function Home({ searchParams }: Props) {
	const { q } = await searchParams;
	const repos = q ? await searchRepositories(q) : [];

	return (
		<div className='flex flex-col flex-1 items-center justify-start bg-zinc-50 font-sans dark:bg-black'>
			<main className='flex flex-1 w-full max-w-3xl flex-col items-center justify-start py-12 px-4 sm:px-16 bg-white dark:bg-black sm:items-start'>
				<SearchForm defaultValue={q ?? ""} />
				{q && repos.length > 0 && (
					<ul className='mt-8 w-full divide-y divide-gray-200'>
						{repos.map((repo) => (
							<li key={repo.id} className='py-4'>
								<a
									href={`/repos/${repo.owner.login}/${repo.name}`}
									className='text-blue-600 hover:underline font-medium'>
									{repo.full_name}
								</a>
								<p className='text-sm text-gray-500 mt-1'>{repo.description}</p>
								<div className='text-sm text-gray-400 mt-1'>
									{repo.language && (
										<span className='mr-4'>{repo.language}</span>
									)}
									<span>⭐ {repo.stargazers_count}</span>
								</div>
							</li>
						))}
					</ul>
				)}
				{q && repos.length === 0 && (
					<p className='mt-8 text-center text-gray-500'>
						No repositories found.
					</p>
				)}
			</main>
		</div>
	);
}
