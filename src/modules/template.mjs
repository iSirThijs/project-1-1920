import card from 'templates/card.mjs';

export default function buildCard(data, target) {
    data.forEach(item => {
        target.insertAdjacentHTML('beforeend', card(item))
    });
}