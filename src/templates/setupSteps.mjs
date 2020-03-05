export default function elements(data){
	const checkboxes = data.form.map((input => {
		return `<input type="checkbox" id=${input[0]} name=${input[0]}></input><label for=${input[0]}>${input[1]}</label>`
		;
	}));

	console.log(checkboxes);
	const heading = 
		`<h3>${data.title}</h3>
		<p>${data.description}</p>
		<form>${checkboxes.join('\n')}</form>`;

	return heading;
}