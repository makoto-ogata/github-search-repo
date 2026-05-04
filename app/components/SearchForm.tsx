"use client";
import { useRouter } from "next/navigation";

interface Props {
	defaultValue?: string;
}

export const SearchForm = ({ defaultValue }: Props) => {
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const query = formData.get("q")?.toString()?.trim() || "";
		router.push(query ? "/?q=" + encodeURIComponent(query) : "/");
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='flex w-full max-w-3xl items-center gap-4'>
			<label htmlFor='q' className='sr-only'>
				Search repositories
			</label>
			<input
				id='q'
				type='text'
				name='q'
				placeholder='Search GitHub repositories...'
				className='flex-1 rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
				defaultValue={defaultValue}
			/>
			<button
				type='submit'
				className='rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
				Search
			</button>
		</form>
	);
};
