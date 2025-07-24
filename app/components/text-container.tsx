export default function TextContainer ({ content, title }) {
	return (
		<section className="p-4 border my-2 rounded-md">
			<h3 className="text-xl font-semibold">{title}</h3>
			<p>{content}</p>
		</section>
	)
}