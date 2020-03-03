import { checkLocalStorage, storeData } from 'modules/localStorageHelper.mjs';

export function setEmptyUser(){
	const emptyUser = {
		userID: 83913,
		age: null,
		city: null,
		postalCode: null,
		gender: null,
		genres: [],
		obaLocation: [],
		mediaType: [],
		loanCategory: []
	};

	if(!checkLocalStorage()) storeData('user', emptyUser);
}