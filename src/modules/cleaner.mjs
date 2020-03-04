export default function cleanData(data) {
	return data.map(item => {
		return {
			title: item.titles[0],
			author: item.authors[0],
			summary: item.summaries ? item.summaries[0] : 'Geen samenvatting',
			format: item.formats[0].text,
			year: parseInt(item.year),
			detailLink: item.detailLink
		}
	});
}