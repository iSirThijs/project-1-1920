import * as template from 'modules/template.mjs'

export default function handleFetchError(err) {
	console.error('Error while fetching ', err)

	const section = document.querySelector('main section')
	const errorBox = template.buildErrorMsg(err, section)

	//Add reload function
	errorBox.addEventListener('click', () => location.reload())
}