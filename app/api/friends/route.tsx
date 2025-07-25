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
	const friends = await kn('friends').select('*');
  return Response.json({ friends })
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