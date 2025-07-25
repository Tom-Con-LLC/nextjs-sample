import TextContainer from '@/app/components/text-container'
import Link from 'next/link';

export default async function Page({ params }) {
	const { id } = await params;

	const response = await fetch('http://localhost:3001/api/friends')

	if (!response.ok) {
		return (
			<div>Error fetching friends data.</div>
		)
	}

	const { friends } = await response.json();
	if (isNaN(Number(id))) {
		return (
			<div>That's not a valid id.</div>
		)
	}

	const foundFriend = friends.find((friend) => friend.id === Number(id))

	if (!foundFriend) {
		return (
			<div>That is not one of my friends.</div>
		)
	}

	return (
		<div>
			{friends.map((friend) => (
				<Link key={friend.id} href={`/my-friends/${friend.id}`} className="text-blue-500 hover:underline">
					{friend.name}
				</Link>
			))}
			<TextContainer title={foundFriend.name} content={foundFriend.description} />
		</div>
	)
}