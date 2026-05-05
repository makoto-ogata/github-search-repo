import { getRepository } from "@/lib/github";
import { notFound } from "next/navigation";
import { RepoDetail } from "@/app/components/RepoDetail";

export default async function Page({
	params,
}: {
	params: Promise<{ owner: string; repo: string }>;
}) {
	const { owner, repo } = await params;
	const data = await getRepository(owner, repo).catch(() => notFound());

	return (
		<main className='my-12 mx-auto w-full max-w-3xl px-4'>
			<RepoDetail data={data} />
		</main>
	);
}
