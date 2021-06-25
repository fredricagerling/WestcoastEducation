'use strict';

const sessionCart = window.sessionStorage;
const cartItem = document.querySelector('.cart-item-description');
const confirmationMessage = document.querySelector("#confirmation");
const closeButton = document.querySelectorAll(".close");
const confirmationNotLoggedIn = document.querySelector('#confirmationNotLoggedIn');

let cartArray = [];

for (let i = 0; i < closeButton.length; i++) {
  closeButton[i].addEventListener('click', closeModalHandler);
}

function closeModalHandler() {
  confirmationMessage.style.display = 'none';
  confirmationNotLoggedIn.style.display = 'none';
}

function addCourseToCart(course) {
  if (!loggedInUser) {
    confirmationNotLoggedIn.style.display = 'flex';
    return;
  }

  if (cartArray.some(e => e.courseId === course.courseId)) {
    return;
  }

  cartArray.push(course)
  sessionCart.setItem(`cartItems`, JSON.stringify(cartArray));
  updateCartCounter();
  confirmationMessage.style.display = "flex";

  cartItem.innerHTML =
    `<p>${course.title}</p>
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