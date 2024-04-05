import "../index.html";
import '../sass/style.sass';
import cards from "./modules/cards";
import reproduction from "./modules/reproduction";
import shopping from "./modules/shopping";
import modal from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    cards()
    modal('[data-modal]','.modal', 'form' )
    reproduction()
    shopping()
    
})
