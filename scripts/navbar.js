'use strict';

const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
const shoppingCart = document.getElementById('cartCounter');

function navSlide() {
  burger.addEventListener('click', () => {

    slider();
    nav.classList.toggle('nav-active');
    burger.classList.toggle('cross');

    fadeInLinks();
  });
}

function slider() {
  if (nav.classList.contains('nav-active')) {
    nav.style.animation = `navbarFadeOut 0.3s ease backwards`;
  } else {
    nav.style.animation = `navbarFadeIn 0.3s ease forwards`;
  }
}

function fadeInLinks() {
  navLinks.forEach(link => {
    if (link.style.animation) {
      link.style.animation = '';
    } else {
      link.style.animation = `navLinkFade 0.4s ease forwards 0.2s`
    }
  });
}

function updateCartCounter() {
  const itemsInCart = JSON.parse(window.sessionStorage.getItem('cartItems'));
  if (itemsInCart != null) {
    shoppingCart.textContent = itemsInCart.length;
    console.log(itemsInCart.length);
  }
}

navSlide();
updateCartCounter();