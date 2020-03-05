export default () => {
	return `
	<div class="sortMenu">
		<h6>Sorteer</h6>
		<form>
			<input type="radio" name="sort" id="new" value="new" checked>
			<label for="new">Nieuw eerst</label>
			<input type="radio" name="sort" id="old" value="old" >
			<label for="old">Oud eerst</label>
		</form>
	</div>
	`;
}