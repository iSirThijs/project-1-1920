export default function makeApiUrl(user) {
	const cors = 'https://cors-anywhere.herokuapp.com/';
	const endpoint = 'https://zoeken.oba.nl/api/v1/search/?q=';
	const query = 'tolkien';
	const key = "ffbc1ededa6f23371bc40df1864843be";
	const url = `${cors}${endpoint}${query}&authorization=${key}&detaillevel=Default&output=json`;
	return url;
}