import card from 'templates/card.mjs';
import errorMsg from 'templates/errorMsg.mjs'
import seperator from 'templates/seperator.mjs'

export function buildCard(data, target) {
    data.forEach(item => target.insertAdjacentHTML('beforeend', card(item)))
}

export function buildErrorMsg(err, target) {
    target.insertAdjacentHTML('beforebegin', errorMsg(err))
    return document.querySelector('main > div:first-of-type')
}

export function buildSeperator(subject, target) {
    target.insertAdjacentHTML('beforeend', seperator(subject))
    return document.querySelector('main > section:last-of-type > div:first-of-type')
}