import json from "./db.json";

function cards() {
   
        
    class MenuCard {
        constructor(id, src, alt, author, name, descr, price) {
            this.id = id;
            this.src = src;
            this.alt = alt;
            this.author = author;
            this.name = name;
            this.descr = descr;
            this.price = price;
            this.render();
        }
        render() {
            
            document.querySelector(this.id).innerHTML += `
            <div class="reproduction-item">
                <img src=${this.src} alt="${this.alt} class="reproduction-item__img">
                <div class="reproduction-item__author">${this.author}</div>
                <div class="reproduction-item__name">${this.name}</div>
                <div class="reproduction-item__descr">${this.descr} </div>
                <div class="reproduction-item__price">${this.price}</div>
                    <button class="btn btn_mini">В корзину</button>
            </div>`
        }
    }

    
    const data = json.cards
    data.forEach(({id, src, alt, author, name, descr, price}) => {
        new MenuCard(id, src, alt, author, name, descr, price)
    })



}

export default cards;
