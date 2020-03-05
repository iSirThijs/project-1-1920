export  const welcome =
	{
		title: 'Welkom bij OBA Jouw Boek',
		description: 'OBA jouw boek geeft aanbevelingen voor boeken op basis van data die de OBA over jou heeft. Welke data daarvoor gebruikt wordt mag jij bepalen.',
		form: []
	};

export const user = 
	{
		title: 'Persoonsgegevens',
		description: 'Persoonsgegevens gaan over wie jij bent, zoals hoe oud je bent of waar je woont',
		form: [['age', 'leeftijd'], ['city', 'woonplaats'], ['postalCode', 'postcode'], ['gender', 'geslacht']]
	};

export const loan = 
	{
		title: 'Persoonsgegevens',
		description: 'Persoonsgegevens gaan over wie jij bent, zoals hoe oud je bent of waar je woont',
		form: [['genres', 'Genres'], ['obaLocation', 'OBA locatie'], ['mediaType', 'Media Type'], ['loanCategory', 'Leen Categorie']]
	};
