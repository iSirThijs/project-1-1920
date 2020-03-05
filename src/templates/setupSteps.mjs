export default function elements(data){
	const checkboxes = data.form.map((input => {
		return `<label for=${input[0]}>${input[1]}<label>
		<input type="checkbox" id=${input[0]} name=${input[0]}>`;
	}));

	const heading = 
		`<h3>${data.title}</h3>
		<p>${data.description}</p>
		<form>${checkboxes.join('')}</form>`;

	return heading;
}