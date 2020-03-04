export default (err) => {
	return `
	<div id="error">
		<h4>Oops, er is iets misgegaan</h4>
		<p>We konden uw aanbevelingen niet voor u ophalen uit de OBA database!</p>
		<p>Klik op dit bericht om opnieuw te proberen. Als dat niet werkt kunt u het later nog een keer proberen.</p>
		<i>${err}</i>
	</div>
	`;
}