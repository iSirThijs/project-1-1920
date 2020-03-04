import card from 'templates/card.mjs';
import errorMsg from 'templates/errorMsg.mjs'

export function buildCard(data, target) {
    data.forEach(item => {
        target.insertAdjacentHTML('beforeend', card(item))
    });
}

export function buildErrorMsg(err, target) {
    target.insertAdjacentHTML('beforebegin', errorMsg(err))
    return document.querySelector('main > div:first-of-type')
}