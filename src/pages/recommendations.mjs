import {
	getStoredData
} from 'modules/localStorageHelper.mjs';
import * as api from 'modules/api.mjs';
import fetcher from 'modules/fetcher.mjs';

export default async () => {
	const main = document.createElement('main');
	const section = document.createElement('section');
	main.appendChild(section);
	console.log('Recommendations page');


	return main;
};

