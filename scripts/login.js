'use strict';

const loginButton = document.getElementById('loginButton');
const adminButton = document.getElementById('adminButton');
const loginState = window.sessionStorage;

let sessionState = JSON.parse(loginState.getItem('loginState'));
let isLoggedIn = false;

loginButton.addEventListener('click', () => {
  if (sessionState !== null || sessionState !== undefined) {
    isLoggedIn = sessionState;
  }

  isLoggedIn = !isLoggedIn;

  if (isLoggedIn == true) {
    userLoggedIn();
    isLoggedIn = true;
    loginState.setItem('loginState', isLoggedIn);

  } else {
    userNotLoggedIn();
    isLoggedIn = false;
    loginState.setItem('loginState', isLoggedIn);
  }
});

function checkState() {
  if (sessionState === null || sessionState === undefined) {
    return;
  }

  if (sessionState === true) {
    userLoggedIn();

  } else {
    userNotLoggedIn();
  }
}

function userLoggedIn() {
  loginButton.innerHTML = 'Logga ut';
  adminButton.style.display = "block";
  loginButton.classList.add('active');
}

function userNotLoggedIn() {
  loginButton.innerHTML = 'Logga in';
  adminButton.style.display = 'none';
  loginButton.classList.remove('active')
}

checkState();