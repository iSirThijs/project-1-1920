import * as template from 'modules/template.mjs'
import {
	removeEl
} from 'modules/router.mjs'

export default function handleFetchError(err) {
	console.error('Error while fetching ', err)

	const loadingState = document.querySelector('main > div.loading')
	removeEl(loadingState)

	const main = document.querySelector('main')
	template.buildErrorMsg(err, main)
}