'use client'

export default function Button({ children, handleClick }) {
	return (
		<button
			className="px-4 py-1 rounded-md bg-white hover:bg-gray-100 transition-colors text-gray-800"
			onClick={handleClick}
		>
			{children}
		</button>
	);
}