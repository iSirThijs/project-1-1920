export default () => {
	return `
	<div class="filterMenu">
		<h6>Filter</h6>
		<form>
			<input type="radio" name="sort" id="bbb" value="bbb" checked>
			<label for="bbb">Nieuw eerst</label>
			<input type="radio" name="sort" id="aaa" value="aaa" >
			<label for="aaa">Oud eerst</label>
		</form>
	</div>
	`;
}