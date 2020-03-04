import {
	getStoredData
} from 'modules/localStorageHelper.mjs'
import * as priorities from 'modules/priorities.mjs'
import apiUrlMaker from 'modules/apiUrlMaker.mjs'
import fetcher from 'modules/fetcher.mjs'
import cleaner from 'modules/cleaner.mjs'
import * as template from 'modules/template.mjs'
import error from 'modules/error.mjs'
import * as interaction from 'modules/interaction.mjs'

export default () => {
	const main = document.createElement('main');

	const user = getStoredData('user')
	const genrePriorities = priorities.genre(user)

	const fetches = genrePriorities.map(subject => {
		const url = apiUrlMaker(subject)
		const config = {
			Authorization: `Bearer 3374c8bacbdd81eef70e7bb33d451efd`
		};
		return fetcher(url, config)
	});

	Promise.all(fetches)
		.then(fetchResults => {
			fetchResults.forEach((data, i) => {
				const section = document.createElement('section')
				main.appendChild(section)

				const seperator = template.buildSeperator(genrePriorities[i], section)
				seperator.addEventListener('click', () => interaction.toggleContent(seperator))

				const cleanData = cleaner(data.results)
				template.buildCard(cleanData, section)
			});
		})
		.catch(err => error(err))

	return main;
};