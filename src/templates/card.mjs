export default (data) => {
    return `
    <article>
        <h4>${data.title}</h>
        <p>${data.author}</p>
        <p>${data.summary}</p>
    </article>
    `
}