import * as template from 'modules/template.mjs'

export default function handleFetchError(err) {
	console.error('Error while fetching ', err)

	const main = document.querySelector('main')
	const errorBox = template.buildErrorMsg(err, main)

	//Add reload function
	errorBox.addEventListener('click', () => location.reload())
}