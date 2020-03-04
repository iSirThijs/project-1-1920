export default function cleanData(data) {
	return data.map(item => {
		return {
			title: item.titles ? item.titles[0] : 'Geen titel',
			author: item.author ? item.authors[0] : 'Geen auteur',
			summary:item.summaries ? item.summaries : 'Geen samenvatting',
			format:item.formats ? item.formats[0].text : 'Geen formaat',
			year:item.year ? parseInt(item.year) : 'Geen jaar',
			detailLink: item.detailLink
		};
	});
}