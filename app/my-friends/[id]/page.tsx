import TextContainer from '@/app/components/text-container'

const friends = [
	{ id: 1, name: 'Bark', description: `He is one of my oldest friends. He is 80. I met him when I needed to buy a mountain and he happened to be selling one. But he tricked me and we ended up as roommates on his little mound of sand.` },
	{ id: 2, name: 'Cloud', description: `She was my real estate broker and was in cahoots with Bark. She somehow managed to access my MBoB and now she forces me to be her friend for pocket money.` }
]

export default async function Page({ params }) {
	const { id } = await params;

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
			<TextContainer title={foundFriend.name} content={foundFriend.description} />
		</div>
	)
}