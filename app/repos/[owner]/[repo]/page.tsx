import { getRepository } from "@/lib/github";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({
	params,
}: {
	params: Promise<{ owner: string; repo: string }>;
}) {
	const { owner, repo } = await params;
	const data = await getRepository(owner, repo).catch(() => notFound());

	return (
		<div className='flex flex-col flex-1 items-center justify-start bg-zinc-50 font-sans dark:bg-black'>
			<main className='flex flex-1 w-full max-w-3xl flex-col items-center justify-start py-12 px-4 sm:px-16 bg-white dark:bg-zinc-900 sm:items-start'>
				<h1 className='text-2xl font-bold flex gap-2'>
					<a
						href={data.owner.html_url}
						className='shrink-0'
						target='_blank'
						rel='noreferrer'>
						<Image
							src={data.owner.avatar_url}
							alt={data.owner.login}
							className='inline-block rounded-full'
							width={40}
							height={40}
						/>
					</a>
					<a
						href={data.html_url}
						className='text-blue-600 hover:underline font-medium break-all'
						target='_blank'
						rel='noreferrer'>
						{data.full_name}
					</a>
				</h1>
				{data.language && (
					<p className='text-sm text-gray-500 mt-3'>
						language: {data.language}
					</p>
				)}
				<dl className='mt-4 w-full border border-gray-300 rounded divide-y divide-gray-300 dark:border-zinc-700 dark:divide-zinc-700'>
					<div className='flex items-center justify-between px-4 py-2'>
						<dt className='font-medium text-gray-500'>stars</dt>
						<dd className='font-bold text-2xl'>
							{data.stargazers_count.toLocaleString()}
						</dd>
					</div>
					<div className='flex items-center justify-between px-4 py-2'>
						<dt className='font-medium text-gray-500'>subscribers</dt>
						<dd className='font-bold text-2xl'>
							{data.subscribers_count.toLocaleString()}
						</dd>
					</div>
					<div className='flex items-center justify-between px-4 py-2'>
						<dt className='font-medium text-gray-500'>forks</dt>
						<dd className='font-bold text-2xl'>
							{data.forks_count.toLocaleString()}
						</dd>
					</div>
					<div className='flex items-center justify-between px-4 py-2'>
						<dt className='font-medium text-gray-500'>open issues</dt>
						<dd className='font-bold text-2xl'>
							{data.open_issues_count.toLocaleString()}
						</dd>
					</div>
				</dl>
			</main>
		</div>
	);
}
