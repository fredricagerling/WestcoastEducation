'use strict';

const emptyCart = document.getElementById('emptyCart');
const shoppingCartDisplay = document.getElementById('shoppingCart');
const courseContainer = document.getElementById('courseContainer');
const purchaseButton = document.getElementById('commitPurchase');
const printTotalPrice = document.getElementById('totalPrice');
const sessionStorage = window.sessionStorage;
const modal = document.getElementById("purchaseConfirmed");
const closeButton = document.querySelector(".close");
const cartItem = document.querySelector('.cart-item-description');

purchaseButton.addEventListener('click', confirmPurchase);

closeButton.addEventListener('click', () => {
  modal.style.display = "none";
  location.reload();
})

modal.addEventListener('click', () => {
  modal.style.display = "none";
  location.reload();
})

let calculateTotal = 0;
let cartArray = [];

function populateCart() {
  cartArray = JSON.parse(sessionStorage.getItem('cartItems'));
  if (cartArray != null && cartArray.length > 0) {
    unsetEmptyCart();

    for (let i = 0; i < cartArray.length; i++) {
      createCartItem(cartArray[i], i)
    }
  }
  updateCartTotal();
}

function createCartItem(cartItem, index){
  courseContainer.insertAdjacentHTML(
    'beforeend',
    `<div class="cart-item" id="courseItem${cartItem.courseId}"}>
      <div class="cart-item-description">
        <p>${cartItem.title}</p>
        <p>av ${cartItem.teacher}</p>
      </div>
      <p class="coursePrice">${cartItem.price}<span> kr</span></p>
    </div>`);

  calculateTotal += cartItem.price;
  createDeleteButton(cartItem, index);
}

function createDeleteButton(course, index) {
  const button = document.createElement('button');
  button.innerHTML = '&times;';

  button.addEventListener('click', () => {
    console.log(cartArray.splice(index, 1));
    sessionStorage.setItem(`cartItems`, JSON.stringify(cartArray))
    location.reload();
  });

  const cartItem = document.getElementById(`courseItem${course.courseId}`);
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
  sessionStorage.clear();
  modal.style.display = 'flex';
}

populateCart();