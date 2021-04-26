'use strict';

const emptyCart = document.getElementById('emptyCart');
const shoppingCartDisplay = document.getElementById('shoppingCart');
const courseContainer = document.getElementById('courseContainer');
const purchaseButton = document.getElementById('commitPurchase');
const printTotalPrice = document.getElementById('totalPrice');
const myStorage = window.sessionStorage;

purchaseButton.addEventListener('click', confirmPurchase);

let calculateTotal = 0;
let cartArray = [];

function populateCart() {
  cartArray = JSON.parse(myStorage.getItem('cartItems'));

  if (cartArray != null) {
    unsetEmptyCart();

    for (let i = 0; i < cartArray.length; i++) {
      createCartItem(cartArray[i], i)
    }
  }
  updateCartTotal();
}

function createCartItem(cartItem, i){
  courseContainer.insertAdjacentHTML(
    'beforeend',
    `<div class="cart-item" id="item${cartItem.courseNumber}"}>
      <div class="cart-item-description">
        <p>${cartItem.title}</p>
        <p>av ${cartItem.teacher}</p>
      </div>
      <p class="coursePrice">${cartItem.price}<span> kr</span></p>
    </div>`);

  calculateTotal += cartItem.price;
  createDeleteButton(cartItem, i);
}

function createDeleteButton(course, i) {
  const button = document.createElement('button');
  button.innerHTML = '&times;';

  button.addEventListener('click', () => {
    console.log(cartArray.splice(i, 1));
    myStorage.setItem(`cartItems`, JSON.stringify(cartArray))
    location.reload();
  });

  const cartItem = document.getElementById(`item${course.courseNumber}`);
  cartItem.appendChild(button);
}

function updateCartTotal() {
  printTotalPrice.innerText = calculateTotal;
}

function unsetEmptyCart() {
  if (!emptyCart.classList.contains('hidden')) {
    emptyCart.classList.add('hidden');
  }
  if (purchaseButton.disabled == true) {
    purchaseButton.removeAttribute('disabled');
  }
}

function confirmPurchase() {
  myStorage.clear();
  location.reload();
}

populateCart();