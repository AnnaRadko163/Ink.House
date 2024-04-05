function shopping() {
  const productsBtn = document.querySelectorAll(".btn_products"),
    shop = document.querySelector(".header__shopping"),
    blockWithShop = document.querySelector(".product-cart_list"),
    fullPrice = document.querySelector(".product-cart__block-price__fullPrice"),
    plusProduct = document.querySelectorAll(".plus"),
    minusProduct = document.querySelectorAll(".minus"),
    shopFull = document.querySelector('.header__shopping__full')
  let price = 0;

  function priceWithoutSpaces (str) {
    return str.replace(/\s/g, "");
  };

  function normalPrice (nbr) {
    return String(nbr).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
  };

  function plusFullPrice (currentPrice) {
    return (price += currentPrice);
  };
  function minusFullPrice (currentPrice) {
    return (price -= currentPrice);
  };

  function printFullPrice () {
    fullPrice.textContent = `${normalPrice(price)} рублей`;
    if (price < 1 ){
      document.querySelector(".product__shop-cart__no").classList.remove('none')
      document.querySelector(".product-cart__block-price").classList.add('none')
    }

  };

  function generateCartProduct (img,  name, descr, price, id, quantity) {
    return `
    <div data-id="${id}" data-quantity="${quantity}" class="product-cart">
      <img src="${img}" alt="картина" class="product__img_cart">
       <div class="product-cart__wrapper">

          <div class="product-cart__name">${name}</div>
          <div class="product-cart__descr">${descr} </div>
          <div class="product-cart__price">${price} руб</div>
          <div class="product__change">
                    <button  class="btn btn_change btn_change_mini minus">-</button> 
                    <div class="product__change__number">1</div>
                    <button class="btn btn_change plus btn_change_mini">+</button>               
                  </div>
        </div>
        <div ><svg class="product-cart__delete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path class="product-cart__delete" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></div>     
    </div>`;
  };

  function increasingQuantityProduct (productParent) {
    let id = productParent.dataset.id 
    let parent = document.querySelectorAll(`[data-id='${id}']`)
    plusFullPrice(parseInt(
      priceWithoutSpaces(document.querySelector(`[data-id='${id}']`).querySelector(".product-cart__price").textContent)
    ))
    printFullPrice();
    parent.forEach((e) => {
      let quantity = +e.dataset.quantity
      quantity += 1
      e.dataset.quantity = quantity
      e.querySelector('.product__change__number').textContent = quantity
    })
  }

  function reducingQuantityProduct (productParent) {
    let id = productParent.dataset.id 
    if(+(document.querySelector(`[data-id='${id}']`)).dataset.quantity < 2) {
       deleteProducts(document.querySelector(`[data-id='${id}']`))
    } else {
      minusFullPrice(parseInt(
      priceWithoutSpaces(document.querySelector(`[data-id='${id}']`).querySelector(".product-cart__price").textContent)
    ))
    printFullPrice();
    let parents = document.querySelectorAll(`[data-id='${id}']`)
    parents.forEach((e) => {
      let quantity = +e.dataset.quantity
      quantity -= 1
      e.dataset.quantity = quantity
      e.querySelector('.product__change__number').textContent = quantity}
    )}
  }
  function deleteProducts (productParent) {

    let id = productParent.dataset.id 
    let quantity = +document.querySelector(`[data-id='${id}']`).dataset.quantity
    let parent = document.querySelectorAll(`[data-id='${id}']`)
    parent.forEach((e) => {
      e.dataset.quantity = 1
      e.querySelector('.product__change__number').textContent = 1
    })
    
    document
      .querySelector(`.product[data-id='${id}']`)
      .querySelector(".btn_products").classList.remove('none')
    document
      .querySelector(`.product[data-id='${id}']`).querySelector('.product__change').classList.add('none')
      console.log(quantity)
    let currentPrice = parseInt(
      priceWithoutSpaces(
        productParent.querySelector(".product-cart__price").textContent
      ) 
    );

    minusFullPrice((quantity*currentPrice));
    printFullPrice();
    productParent.remove();
  };

  shop.addEventListener("click", (e) => {
    shop.classList.toggle("active");
    document.querySelector('.product__shop-cart').classList.toggle("none");
    if (price > 0) {
      shopFull.classList.toggle("none")
    }
    
  });

  productsBtn.forEach((el) => {
    el.addEventListener("click", (e) => {
      let self = e.currentTarget;
      let parent = self.closest(".product");
      let id = parent.dataset.id;
      parent.dataset.quantity = 1
      let quantity = parent.dataset.quantity 
      let img = parent.querySelector(".product__img").getAttribute("src");
      let name = parent.querySelector(".product__name").textContent;
      let descr = parent.querySelector(".product__descr").textContent;
      let price = parseInt(
        priceWithoutSpaces(parent.querySelector(".product__price").textContent)
      );
      document.querySelector(".product__shop-cart__no").classList.add('none')
      document.querySelector(".product-cart__block-price").classList.remove('none')
      if (!(shop.classList.contains ("active"))){
        shopFull.classList.remove("none")
      }
      
      plusFullPrice(price);
      printFullPrice();
      blockWithShop.insertAdjacentHTML(
        "afterbegin",
        generateCartProduct(img,  name, descr, price, id, quantity )
      );
      parent.querySelector('.product__change').classList.remove("none")

      self.classList.add('none');

    });
  });

  blockWithShop.addEventListener("click", (e) => {
    if (e.target.classList.contains("product-cart__delete")) {
      deleteProducts(e.target.closest(".product-cart"));
    }
  });

  blockWithShop.addEventListener("click", (e) => {
    if (e.target.classList.contains("plus")) {
      increasingQuantityProduct(e.target.closest("[data-id]"));
    }
    if (e.target.classList.contains("minus")) {
      reducingQuantityProduct(e.target.closest("[data-id]"));
    }
  });
  plusProduct.forEach((e) => {
    e.addEventListener("click", (e) => {
      increasingQuantityProduct(e.target.closest("[data-id]"));
    })
  })
  minusProduct.forEach((e) => {
    e.addEventListener("click", (e) => {
      reducingQuantityProduct(e.target.closest("[data-id]"));
    })
  })
}

export default shopping;
