import 'modules/routie.js';
import recommendations from 'pages/recommendations.mjs';
import profile from 'pages/profile.mjs';
import setup from 'pages/setup.mjs';
import { checkLocalStorage } from 'modules/localStorageHelper.mjs';

routie({
	'': init,
	'profile': profilePage,
	'recommendations': recommendationsPage,
	'setup': () => routie('setup/welcome'),
	'setup/:step': setupPage,
});

function init(){
	// temp clear of user data
	localStorage.removeItem('user');

	if (checkLocalStorage('user')) routie('profile');
	else {
		routie('setup');
	};
}

function recommendationsPage() {
	removeOldPage();
	const body = document.body;
	body.appendChild(recommendations());
}

function profilePage() {
	removeOldPage();
	const body = document.body;
	body.appendChild(profile());
}

function setupPage(step) {
	removeOldPage();
	const body = document.body;
	body.appendChild(setup(step));
}

function removeOldPage(){
	const main = document.querySelector('main');
	main.remove();
}