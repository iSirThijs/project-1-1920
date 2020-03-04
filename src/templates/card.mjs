export default (data) => {
	return `
	<a href="${data.detailLink}" target="_blank">
		<article class="card">
			<h4>${data.title}</h4>
			<p>${data.author}</p>
			<p>${data.summary}</p>
		</article>
	</a>
	`;
}