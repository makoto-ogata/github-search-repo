import { SearchForm } from "@/app/components/SearchForm";
import { searchRepositories } from "@/lib/github";
import Link from "next/link";
import Image from "next/image";

interface Props {
	searchParams: Promise<{ q?: string }>;
}

export default async function Home({ searchParams }: Props) {
	const { q } = await searchParams;
	const repos = q ? await searchRepositories(q) : [];

	return (
		<main className='my-12 mx-auto w-full max-w-3xl px-4'>
			<SearchForm defaultValue={q ?? ""} />
			{q && repos.length > 0 && (
				<ul className='mt-8 w-full grid gap-4'>
					{repos.map((repo) => (
						<li key={repo.id}>
							<Link
								href={`/repos/${repo.owner.login}/${repo.name}`}
								className='font-medium py-4 break-all flex gap-3 w-full items-center justify-start rounded-3xl border border-gray-300 px-4 hover:bg-gray-50 dark:border-zinc-700 dark:hover:bg-zinc-800'>
								<Image
									src={repo.owner.avatar_url}
									alt={repo.owner.login}
									width={40}
									height={40}
									className='shrink-0'
								/>
								<div className='grow'>
									{repo.full_name}
									<p className='text-sm text-gray-500 mt-1'>
										{repo.description}
									</p>
									<div className='text-sm text-gray-400 mt-1'>
										{repo.language && (
											<span className='mr-4'>{repo.language}</span>
										)}
										<span>⭐ {repo.stargazers_count}</span>
									</div>
								</div>
							</Link>
						</li>
					))}
				</ul>
			)}
			{q && repos.length === 0 && (
				<p className='mt-8 text-center text-gray-500'>No repositories found.</p>
			)}
		</main>
	);
}
