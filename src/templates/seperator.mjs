import {
	getStoredData
} from 'modules/localStorageHelper.mjs'

export default (subject) => {
	const user = getStoredData('user')

	return `
	<div class="seperator" filterGenre="${subject}">
		<h2>${subject}</h2>
		<p>${user.genres.length === 0 ? 'Random categorie opgehaald' : 'Gebaseerd op uw leengeschiedenis'}</p>
	</div>
	`;
}