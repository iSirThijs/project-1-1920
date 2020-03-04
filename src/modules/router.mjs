import recommendations from 'pages/recommendations.mjs';
import profile from 'pages/profile.mjs';
import setup from 'pages/setup.mjs';

export function recommendationsPage() {
	removeOldPage();
	const body = document.body;
	body.appendChild(recommendations());
}

export function profilePage() {
	removeOldPage();
	const body = document.body;
	body.appendChild(profile());
}

function removeOldPage() {
	const main = document.querySelector('main');
	main.remove();
}

export function setupPage(step) {
	removeOldPage();
	const body = document.body;
	body.appendChild(setup(step));
}
