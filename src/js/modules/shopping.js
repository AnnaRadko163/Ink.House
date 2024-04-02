function shopping() {
  const productsBtn = document.querySelectorAll(".btn_products");
  const shop = document.querySelector(".header__shopping");
  const blockWithShop = document.querySelector(".product__shop-cart");
  const fullPrice = document.querySelector(".product-cart__fullPrice");
  let price = 0;

  shop.addEventListener("click", (e) => {
    shop.classList.toggle("active");
    blockWithShop.classList.toggle("none");
  });

  const priceWithoutSpaces = (str) => {
    return str.replace(/\s/g, "");
  };

  const normalPrice = (nbr) => {
    return String(nbr).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
  };

  const plusFullPrice = (currentPrice) => {
    return (price += currentPrice);
  };
  const minusFullPrice = (currentPrice) => {
    return (price -= currentPrice);
  };

  const printFullPrice = () => {
    fullPrice.textContent = `${normalPrice(price)} рублей`;
  };

  const generateCartProduct = (img, author, name, descr, price, id) => {
    return `
    <div data-id="${id}" class="product-cart">
      <img src="${img}" alt="картина" class="product__img_cart">
       <div class="product-cart__wrapper">
          <div class="product-cart__author">${author}</div>
          <div class="product-cart__name">${name}</div>
          <div class="product-cart__descr">${descr} </div>
          <div class="product-cart__price">${price} руб</div>
        </div>
        <div class="product-cart__delete"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></div>     
    </div>`;
  };

  productsBtn.forEach((el) => {
    el.addEventListener("click", (e) => {
      let self = e.currentTarget;

      let parent = self.closest(".product");
      console.log(parent);
      let id = parent.dataset.id;
      let img = parent.querySelector(".product__img").getAttribute("src");
      let author = parent.querySelector(".product__author").textContent;
      let name = parent.querySelector(".product__name").textContent;
      let descr = parent.querySelector(".product__descr").textContent;
      let price = parseInt(
        priceWithoutSpaces(parent.querySelector(".product__price").textContent)
      );
      plusFullPrice(price);
      printFullPrice();
      blockWithShop.insertAdjacentHTML("afterbegin", generateCartProduct(img, author, name, descr, price, id))

      self.disabled = true;
    });
  });
}

export default shopping;
