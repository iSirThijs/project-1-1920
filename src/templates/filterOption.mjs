export default (section) => {
	const genre = section.querySelector('.seperator h2').textContent
	return `
	<input type="checkbox" id="filterOption${genre}" value="${genre}" checked>
	<label for="filterOption${genre}">${genre}</label>
	`;
}