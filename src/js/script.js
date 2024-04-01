import "../index.html";
import '../sass/style.sass';
import cards from "./modules/cards";
import reproduction from "./modules/reproduction";
import shopping from "./modules/shopping";

window.addEventListener('DOMContentLoaded', () => {
    cards()
    reproduction()
    shopping()
})
