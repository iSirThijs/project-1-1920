import {
	getStoredData
} from 'modules/localStorageHelper.mjs'
import apiUrlMaker from 'modules/apiUrlMaker.mjs'
import fetcher from 'modules/fetcher.mjs'

export default () => {
	const main = document.createElement('main');
	const section = document.createElement('section')
	main.appendChild(section)
	console.log('Recommendations page');

	const user = getStoredData('user')
	const url = apiUrlMaker(user)
	const config = {
		Authorization: `Bearer 3374c8bacbdd81eef70e7bb33d451efd`
	};
	fetcher(url, config)
		.then(data => console.log(data.results))






	return main;
};