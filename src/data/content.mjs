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
		title: 'Leengeschiedenis',
		description: 'Leengeschiedenis gaat over wat jij doet bij de OBA. Bijvoorbeeld de boeken die jij leent, welke genres jij het meeste leest of welke OBA locaties jij bezoekt',
		form: [['genres', 'Genres'], ['obaLocation', 'OBA locatie'], ['mediaType', 'Media Type'], ['loanCategory', 'Leen Categorie']]
	};

export const final = 
	{
		title: 'Bedankt',
		description: 'Je profiel is klaar en kan nu gebruikt worden om jou aanbevelingen te doen. Op jouw profiel pagina kan je altijd de toestemmingen aan of uitzetten. ',
		form: []
	};

	
