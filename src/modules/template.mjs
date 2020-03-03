import card from 'templates/card.mjs'

export default function buildCard(data, target) {
    target.insertAdjacentHTML('beforeend', card(data))
}