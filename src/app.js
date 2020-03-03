import 'modules/routie.js';
import recommendations from 'pages/recommendations.mjs';
import profile from 'pages/profile.mjs';

routie({
	'profile': () => profilePage,
	'recommendations': recommendationsPage
});

routie('profile');

profilePage();


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

function removeOldPage(){
	const main = document.querySelector('main');
	main.remove();
}
