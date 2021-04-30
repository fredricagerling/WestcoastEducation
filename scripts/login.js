'use strict';

const loginButton = document.getElementById('loginButton');
const adminButton = document.getElementById('adminButton');
const loginState = window.sessionStorage;

let isLoggedIn = false;
// Gör en ny knapp bara lel
loginButton.addEventListener('click', () => {
  let sessionState = loginState.getItem('loginState');
  sessionState = JSON.parse(sessionState)
  
  if (sessionState !== null || sessionState !== undefined) {
    isLoggedIn = sessionState;
  }

  isLoggedIn = !isLoggedIn;


  if (isLoggedIn == true) {
    loginButton.innerHTML = 'Logga ut';
    adminButton.style.display = "block";
    loginButton.classList.add('active');
    isLoggedIn = true;
    loginState.setItem('loginState', isLoggedIn);
    console.log(isLoggedIn + 'är true')

  } else {
    loginButton.innerHTML = 'Logga in';
    adminButton.style.display = 'none';
    loginButton.classList.remove('active');
    isLoggedIn = false;
    loginState.setItem('loginState', isLoggedIn);
    console.log(isLoggedIn + 'är false')
  }
  console.log(loginState.getItem('loginState'))

});

function checkState() {
  let sessionState = loginState.getItem('loginState');
  sessionState = JSON.parse(sessionState)

  console.log(sessionState);
  if (sessionState === null || sessionState === undefined) {
    return;
  }

  if (sessionState === true) {
    loginButton.innerHTML = 'Logga ut';
    adminButton.style.display = "block";
    loginButton.classList.add('active');

  } else {
    loginButton.innerHTML = 'Logga in';
    adminButton.style.display = 'none';
    loginButton.classList.remove('active');
    console.log('nu är vi här!')
    console.log(sessionState);
  }
}

checkState();