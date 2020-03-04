export  const welcome =
	`<h3>Welkom</h3>
	<p>OBA jouw boek geeft aanbevelingen voor boeken op basis van data die de OBA over jou heeft. Welke data daarvoor gebruikt wordt mag jij bepalen.</p>
	`;

export const user = `
	<h3>Persoonsgegevens</h3>
	<p>Persoonsgegevens gaan over wie jij bent, zoals hoe oud je bent of waar je woont</p>
	<form>
		<input type="checkbox" id="age" name="age">
		<label for="age">Leeftijd</label>
		<input type="checkbox" id="city" name="city">
		<label for="city">Woonplaats</label>
		<input type="checkbox" id="postalCode" name="postalCode">
		<label for="postalcode">Postcode</label>
		<input type="checkbox" id="gender" name="gender">
		<label for="gender">geslacht</label>
	</form>`;

export const loan = `
	<h3>Leengeschiedenis</h3>
	<p>Leengeschiedenis gaat over wat je bij de OBA hebt geleend, zoals het soort boek of welke auteurs je leest</p>
	<form>
		<input type="checkbox" id="genres" name="genres">
		<label for="genres">Genres</label>
		<input type="checkbox" id="obaLocation" name="obaLocation">
		<label for="obaLocation">OBA locaties</label>
		<input type="checkbox" id="mediaType" name="mediaType">
		<label for="mediaType">Media type</label>
		<input type="checkbox" id="loanCategory" name="loanCategory">
		<label for="loanCategory">Categorie</label>
	</form>
	`;

// export default function(data){
// 	const title = `<h3>${data.title}</h3>`
// 	const description = `<p>${data.description}</p>'
// 	<form>
// 		<input type="checkbox" id="${id}" name="${id}">
// 		<label for="genres">Genres</label>
// 		<input type="checkbox" id="obaLocation" name="obaLocation">
// 		<label for="obaLocation">OBA locaties</label>
// 		<input type="checkbox" id="mediaType" name="mediaType">
// 		<label for="mediaType">Media type</label>
// 		<input type="checkbox" id="loanCategory" name="loanCategory">
// 		<label for="loanCategory">Categorie</label>
// 	</form>
// 	`;
// }