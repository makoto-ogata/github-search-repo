import Link from "next/link";
import Image from "next/image";
import { GitHubRepo } from "@/lib/github";

interface Props {
	repos: GitHubRepo[];
}

export const RepoList = ({ repos }: Props) => {
	return (
		<ul className='mt-8 w-full grid gap-4'>
			{repos.map((repo) => (
				<li key={repo.id}>
					<Link
						href={`/repos/${repo.owner.login}/${repo.name}`}
						className='font-medium py-4 break-all flex gap-3 w-full items-center justify-start rounded-3xl
  border border-gray-300 px-4 hover:bg-gray-50 dark:border-zinc-700 dark:hover:bg-zinc-800'>
						<Image
							src={repo.owner.avatar_url}
							alt={repo.owner.login}
							width={40}
							height={40}
							className='shrink-0'
						/>
						<div className='grow'>
							{repo.full_name}
							<p className='text-sm text-gray-500 mt-1'>{repo.description}</p>
							<div className='text-sm text-gray-600 mt-1'>
								{repo.language && <span className='mr-4'>{repo.language}</span>}
								<span>⭐ {repo.stargazers_count.toLocaleString()}</span>
							</div>
						</div>
					</Link>
				</li>
			))}
		</ul>
	);
};
