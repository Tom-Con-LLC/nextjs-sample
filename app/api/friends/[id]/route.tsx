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


export async function GET(req: Request, { params }) {
	const { id } = await params;
	const friend = await kn('friends').where('id', Number(id)).first();
	return Response.json({ friend })
}