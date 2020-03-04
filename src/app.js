import 'modules/routie.js';
import recommendations from 'pages/recommendations.mjs';
import profile from 'pages/profile.mjs';
import setup from 'pages/setup.mjs';
import { checkLocalStorage } from 'modules/localStorageHelper.mjs';
import * as route from 'modules/router.mjs';

routie({
	'': init,
	'profile': route.profilePage,
	'recommendations': route.recommendationsPage,
	'setup': () => routie('setup/welcome'),
	'setup/:step': route.setupPage
});

function init(){
	// temp clear of user data
	localStorage.removeItem('user');

	if (checkLocalStorage('user')) routie('profile');
	else {
		routie('setup');
	};
}