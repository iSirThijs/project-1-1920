import { getStoredData } from 'modules/localStorageHelper.mjs';
import setupStep from 'templates/setupSteps.mjs';
import { updateProfile } from 'modules/user.mjs'; 
import * as content from 'data/content.mjs';

export default () => {
	const user = getStoredData('user');
	const main = document.createElement('main');
	main.classList.add('profile');
	main.appendChild(createUserSection('user', user));
	main.appendChild(createUserSection('loan', user));



	return main;
};


function createUserSection(category, user) {

	const section = document.createElement('section');
	section.classList.add('setup-step');

	let el = setupStep(content[category]) ;
	section.insertAdjacentHTML('beforeend', el );

	const checkboxes = section.querySelectorAll('input[type="checkbox"]');
	// (checkboxes);
	checkboxes.forEach((checkbox) => {
		let checkboxID = checkbox.getAttribute('id');

		if ( Array.isArray(user[checkboxID]) && user[checkboxID].length > 0) checkbox.checked = true;
		else if(!Array.isArray(user[checkboxID]) && user[checkboxID]) checkbox.checked = true;
		else checkbox.checked = false;

		checkbox.addEventListener('change', (event) => {
			const key = event.target.name;
			const checked = event.target.checked;

			updateProfile(key, checked);
		});
	});

	return section;

}