import json from "./db.json";

function cards() {
  class MenuCard {
    constructor(id, src, alt, author, name, descr, price, key) {
      this.id = id;
      this.src = src;
      this.alt = alt;
      this.author = author;
      this.name = name;
      this.descr = descr;
      this.price = price;
      this.key = key;
      this.render();
    }
    render() {
      document.querySelector(this.id).innerHTML += `
            <div data-id="${this.key}" class="product">
                <img src=${this.src} alt="${this.alt}" class="product__img">
                <div class="product__author">${this.author}</div>
                <div class="product__name">${this.name}</div>
                <div class="product__descr">${this.descr} </div>
                <div class="product__price">${this.price} руб</div>
                  <button class="btn btn_mini  btn_products ">В корзину</button>
                  <div class="product__change product__change_max none  ">
                    <button class="btn btn_change minus">-</button> 
                    <div class="product__change__number">1</div>
                    <button class="btn btn_change plus">+</button>               
                  </div>
            </div>`;
    }
  }

  const data = json.cards;
  data.forEach(({ id, src, alt, author, name, descr, price, key }) => {
    new MenuCard(id, src, alt, author, name, descr, price, key);
  });
}

export default cards;
