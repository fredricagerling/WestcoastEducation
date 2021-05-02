'use strict';

const sessionCart = window.sessionStorage;
const cartItem = document.querySelector('.cart-item-description');
const confirmationMessage = document.querySelector("#confirmation");
const closeButton = document.querySelector(".close");

let cartArray = [];

closeButton.addEventListener('click', () => {
  confirmationMessage.style.display = "none";
})

function addCourseToCart(course) {
  if (cartArray.some(e => e.id === course.id)) {
    return;
  }

  cartArray.push(course)
  sessionCart.setItem(`cartItems`, JSON.stringify(cartArray));
  updateCartCounter();
  confirmationMessage.style.display = "flex";

  cartItem.innerHTML =
    ` <p>${course.title}</p>
          <span>av ${course.teacher}</span>
        </div>`;
}

function checkSessionStorage() {
  const sessionStorageCart = JSON.parse(sessionCart.getItem('cartItems'));

  if (sessionStorageCart != null) {
    cartArray = [...sessionStorageCart];
  }
}

checkSessionStorage();