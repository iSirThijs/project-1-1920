import setupStep from 'templates/setupSteps.mjs';
import { updateProfile, setEmptyUser } from 'modules/user.mjs'; 
import { getStoredData } from 'modules/localStorageHelper.mjs';
import * as content from 'data/content.mjs';


export default (nextStep) => {
	// ('Setup Page');
	if(nextStep === 'welcome') setEmptyUser();
	const main = document.createElement('main');
	main.classList.add('setup');
	const section = createSetupStep(nextStep);

	main.appendChild(section);

	return main;
};

function createSetupStep(nextStep) {
	const user = getStoredData('user');

	const section = document.createElement('section');
	section.classList.add('setup-step');

	let el = setupStep(content[nextStep]) ;
	section.insertAdjacentHTML('beforeend', el );

	const links = createLinks(nextStep);
	section.appendChild(links);

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


function createLinks(nextStep){
	const div = document.createElement('div');

	switch(nextStep){
	case 'welcome' : {
		div.insertAdjacentHTML('beforeend','<a href=\'#setup/user\'>Volgende</a>');
		break;
	}
	case 'user' : {
		div.insertAdjacentHTML('beforeend','<a href=\'#setup/welcome\'>Vorige</a><a href=\'#setup/loan\'>Volgende</a>');
		break;
	}
	case 'loan' : {
		div.insertAdjacentHTML('beforeend','<a href=\'#setup/loan\'>Vorige</a><a href=\'#setup/final\'>Volgende</a>');
		break;
	}
	case 'final' : {
		div.insertAdjacentHTML('beforeend','<a href=\'#profile\'>Ga naar profiel</a><a href=\'#recommendations\'>Ga naar aanbevelingen</a>');
		break;
	}
	}
	return div;
	
}
