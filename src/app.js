import profilepage from 'templates/profilepage.mjs';

let mains = document.getElementsByTagName('main');
let main = mains[0];

main.insertAdjacentHTML('beforeend', profilepage());