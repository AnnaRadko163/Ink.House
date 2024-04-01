function shopping() {
  const shop = document.querySelector(".header__shopping");
  let cart = false;
  let blockWithBasket = document.createElement("div");
  blockWithBasket.classList.add("shop-cart", "none");
  shop.after(blockWithBasket);

  shop.addEventListener("click", (e) => {
    shop.classList.toggle("active");
    blockWithBasket.classList.toggle("none");
    cart = !cart;
    console.log(cart);

  });
}

export default shopping;
