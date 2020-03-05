import card from 'templates/card.mjs';
import loadingState from 'templates/loadingState.mjs'
import errorMsg from 'templates/errorMsg.mjs'
import seperator from 'templates/seperator.mjs'
import sortMenu from 'templates/sortMenu.mjs'
import filterMenu from 'templates/filterMenu.mjs'
import filterOption from 'templates/filterOption.mjs'

export function buildCard(data, target) {
    data.forEach(item => target.insertAdjacentHTML('beforeend', card(item)))
}

export function buildLoadingState(target) {
    target.insertAdjacentHTML('beforeend', loadingState())
}

export function buildErrorMsg(err, target) {
    target.insertAdjacentHTML('beforebegin', errorMsg(err))
    return document.querySelector('main > div:first-of-type')
}

export function buildSeperator(subject, target) {
    target.insertAdjacentHTML('beforeend', seperator(subject))
    return document.querySelector('main > section:last-of-type > div:first-of-type')
}

export function buildFilterMenu(target) {
    target.insertAdjacentHTML('beforeend', filterMenu())
}

export function buildFilterOption(section, target) {
    target.insertAdjacentHTML('beforeend', filterOption(section))
}