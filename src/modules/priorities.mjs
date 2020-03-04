export function genre(user) {
	if (user.genres.length === 0) {
		const goodDefaultSubjects = ['historische romans', 'sprookjes', 'romantische verhalen', 'oorlog', 'verhalenbundel']
		const randomNum = Math.floor(Math.random() * 5)
		return [goodDefaultSubjects[randomNum]]
	} else {
		const numberOfBooks = user.genres.reduce((acc, item) => acc + item[1], 0)
		const treshold = (numberOfBooks > 5) ? 0.2 : 0
		const importantGenres = []

		user.genres.forEach(genre => (genre[1] / numberOfBooks >= treshold) ? importantGenres.push(genre[0]) : false)
		return importantGenres
	}
}