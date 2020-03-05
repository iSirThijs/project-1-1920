import {
	getStoredData
} from 'modules/localStorageHelper.mjs'
import * as priorities from 'modules/priorities.mjs'
import apiUrlMaker from 'modules/apiUrlMaker.mjs'
import fetcher from 'modules/fetcher.mjs'
import cleaner from 'modules/cleaner.mjs'
import * as template from 'modules/template.mjs'
import error from 'modules/error.mjs'
import * as interaction from 'modules/interactions.mjs'
import {
	removeEl
} from 'modules/router.mjs'

export default () => {
	const main = document.createElement('main');

	const user = getStoredData('user')
	const genrePriorities = priorities.genre(user)

	template.buildLoadingState(main)
	const loadingState = main.querySelector('div')

	const fetches = genrePriorities.map(subject => {
		const url = apiUrlMaker(subject)
		const config = {
			Authorization: `Bearer 3374c8bacbdd81eef70e7bb33d451efd`
		};
		return fetcher(url, config)
	});

	Promise.all(fetches)
		.then(data => buildContent(data, main, genrePriorities))
		.then(() => removeEl(loadingState))
		.then(() => buildInteractionMenu(main))
		.catch(err => error(err))

	return main;
};


function buildContent(data, main, genrePriorities) {
	data.forEach((data, i) => {
		const section = document.createElement('section')
		main.appendChild(section)

		const seperator = template.buildSeperator(genrePriorities[i], section)
		seperator.addEventListener('click', () => interaction.toggleContent(seperator))

		const cleanData = cleaner(data.results)
		template.buildCard(cleanData, section)
	});
}


function buildInteractionMenu(main) {
	const aside = document.createElement('aside')
	main.prepend(aside)

	template.buildSortMenu(aside)
	aside.querySelectorAll('.sortMenu input').forEach(label => label.addEventListener('change', () => interaction.sortContent()))

	template.buildFilterMenu(aside)
	aside.querySelectorAll('.filterMenu input').forEach(label => label.addEventListener('change', () => interaction.filterContent()))
}