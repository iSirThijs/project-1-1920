import {
	getStoredData
} from 'modules/localStorageHelper.mjs'
import apiUrlMaker from 'modules/apiUrlMaker.mjs'
import fetcher from 'modules/fetcher.mjs'
import cleaner from 'modules/cleaner.mjs'
import template from 'modules/template.mjs'

export default () => {
	const main = document.createElement('main');
	const section = document.createElement('section')
	main.appendChild(section)

	const user = getStoredData('user')
	const url = apiUrlMaker(user)
	const config = {
		Authorization: `Bearer 3374c8bacbdd81eef70e7bb33d451efd`
	};
	fetcher(url, config)
		.then(data => cleaner(data.results))
		.then(cleanData => template(cleanData, section))
		.catch(err => console.log(err))

	return main;
};