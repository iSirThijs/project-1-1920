import 'modules/routie.js';
import * as route from 'modules/router.mjs'
import {
	setEmptyUser
} from 'modules/user.mjs';

routie({
	'': init,
	'profile': route.profilePage,
	'recommendations': route.recommendationsPage
});


function init() {
	setEmptyUser();
	routie('profile');
}