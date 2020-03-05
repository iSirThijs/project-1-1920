export function toggleContent(el) {
	const container = el.parentElement
	container.classList.toggle('hidden')
}

export function sortContent(e) {
	console.log('sort the content', e.target.value)
}

export function filterContent(e) {
	const filter = e.target.value

	const targetedSection = document.querySelector(`[filterGenre="${filter}"]`)
	targetedSection.parentElement.classList.toggle('filtered')
}