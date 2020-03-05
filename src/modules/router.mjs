import recommendations from 'pages/recommendations.mjs';
import profile from 'pages/profile.mjs';
import setup from 'pages/setup.mjs';

export function recommendationsPage() {
	removeEl(document.querySelector('main'));
	const body = document.body;
	body.appendChild(recommendations());
}

export function profilePage() {
	removeEl(document.querySelector('main'));
	const body = document.body;
	body.appendChild(profile());
}

export function removeEl(target) {
	target.remove();
}

export function setupPage(step) {
	removeEl(document.querySelector('main'));
	const body = document.body;
	body.appendChild(setup(step));
}