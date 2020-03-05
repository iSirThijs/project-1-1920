export function toggleContent(el) {
	const container = el.parentElement
	container.classList.toggle('hidden')
}

export function sortContent(e) {
	console.log('sort the content', e.target.value)
}

export function filterContent(e) {
	const filter = e.target.value

	console.log('filter the content', filter)

}