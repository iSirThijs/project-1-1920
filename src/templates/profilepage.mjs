export default user => {
	return `
	<section id="user" class="profile-section">
      <h2>Persoonsgegevens</h2>
      <form>
        <label for="age">Leeftijd</label>
        <input type="checkbox" name="age" id="age">
        <label for="city">Woonplaats</label>
        <input type="checkbox" name="city" id="city">
        <label for="postcode">Postcode</label>
        <input type="checkbox" name="postcode" id="postcode">
        <label for="geslacht">Geslacht</label>
		<input type="checkbox" name="geslacht" id="geslacht">
		<button type="submit">Save</button>
      </form>
	</section>
	<section id="loan-history" class="profile-section">
	<h2>Persoonsgegevens</h2>
	<form>
	  <label for="genres">Genres</label>
	  <input type="checkbox" name="genres" id="genres">
	  <label for="oba-location">OBA locaties</label>
	  <input type="checkbox" name="oba-location" id="oba-location">
	  <label for="mediatype">Mediasoort</label>
	  <input type="checkbox" name="mediatype" id="mediatype">
	  <label for="loan-category">Categorie</label>
	  <input type="checkbox" name="loan-category" id="loan-category">
	  <button type="submit">Save</button>
	</form>
  </section>
  `;
}