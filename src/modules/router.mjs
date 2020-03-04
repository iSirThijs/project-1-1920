import recommendations from 'pages/recommendations.mjs';
import profile from 'pages/profile.mjs';

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