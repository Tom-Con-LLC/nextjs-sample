'use client'

import { useState, useEffect } from 'react';

import TextContainer from '@/app/components/text-container'
import Link from 'next/link';

export default  function Page({ params }) {
	const [friend, setFriend] = useState([]);
	const [idToSearch, setIdToSearch] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	
	const fetchFriend = async () => {
		if (!idToSearch) {
			setError('Please enter a valid id.');
			return;
		}

		if (isNaN(Number(idToSearch))) {
			setError('That is not a valid id.');
			return;
		}

		setError(null);
		setIsLoading(true);
		const response = await fetch(`http://localhost:3001/api/friends/${idToSearch}`)
		if (!response.ok) {
				if (response.status === 404) {
					setError('Friend not found.')
				} else {
					setError('Error fetching friends data.');
				}
				return;
		}
		const { friend } = await response.json();
		setFriend(friend)
		setIsLoading(false);
	}

	return (
		<div>
			<div className="m-4">
				Search for a user by id:
				<input
					type="text"
					className=" ml-2 bg-white text-black rounded-md"
					onChange={(e) => setIdToSearch(e.target.value)}
				/>
				<button 
					className="ml-2 bg-white rounded-md text-black px-4"
					onClick={() => fetchFriend()}
				>
					Search
				</button>
			</div>
			{error ? (
				<div>
					<p>{error}</p>
					{/* <button onClick={() => fetchFriend()} className="bg-white text-black py-1 px-4">Retry</button> */}
				</div>
			) : (
				isLoading ? (<p>Loading...</p>) : (
					<p>{friend.name}</p>
				)
			)}
		</div>
	)

	// const { id } = await params;

	// const response = await fetch('http://localhost:3001/api/friends')

	// if (!response.ok) {
	// 	return (
	// 		<div>Error fetching friends data.</div>
	// 	)
	// }

	// const { friends } = await response.json();
	// if (isNaN(Number(id))) {
	// 	return (
	// 		<div>That's not a valid id.</div>
	// 	)
	// }

	// const foundFriend = friends.find((friend) => friend.id === Number(id))

	// if (!foundFriend) {
	// 	return (
	// 		<div>That is not one of my friends.</div>
	// 	)
	// }

	// return (
	// 	<div>
	// 		{friends.map((friend) => (
	// 			<Link key={friend.id} href={`/my-friends/${friend.id}`} className="text-blue-500 hover:underline">
	// 				{friend.name}
	// 			</Link>
	// 		))}
	// 		<TextContainer title={foundFriend.name} content={foundFriend.description} />
	// 	</div>
	// )
}