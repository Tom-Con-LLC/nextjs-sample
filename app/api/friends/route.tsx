import knex from 'knex';

const kn = knex({
	client: 'pg',
	connection: {
		host: 'localhost',
		user: process.env.PG_USER,
		password: process.env.PG_PASS,
		database: process.env.PG_DB,
		port: 5432
	},
})

export async function GET() {
	if (Math.random() >= 0.75) {
		// return Response.json({ message: 'Bag'}, { status: 400 });
		const friends = await new Promise((res) => setTimeout(async () => {
			const inner = await kn('friends').select('*');
			res(inner);
		}, 5000))
		
		return Response.json({ friends })
	} else {
			await new Promise((res) => setTimeout(async () => {
			
			res(false);
			}, 2000))
			return Response.json({ message: "error" }, { status: 400 });
	}
}

export async function POST(request: Request) {
	const { name, description } = await request.json();
	if (!name || !description) {
		return Response.json({ error: 'Name and description are required.' }, { status: 400 });
	}

	const [createdFriend] = await kn('friends')
		.insert({ name, description})
		.returning('*')
	
	return Response.json({ friend: createdFriend }, { status: 201 });
}