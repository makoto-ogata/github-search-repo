import Link from "next/link";

export const Header = () => {
	return (
		<header className='w-full bg-white dark:bg-black shadow'>
			<div className='text-3xl py-6 font-bold text-center text-gray-800 dark:text-gray-200'>
				<Link href='/'>GitHub Repository Search</Link>
			</div>
		</header>
	);
};
