'use strict';

const baseUrl = 'http://localhost:3000/courses';
const sessionCart = window.sessionStorage;
const courses = document.querySelector('#coursesContainer');
const displayAmountOfCourses = document.querySelector('#info-text');
const allCoursesButton = document.querySelector('#showAllCourses');
const bestSellersButton = document.querySelector('#bestSellers');
const confirmationMessage = document.querySelector("#confirmation");
const closeButton = document.querySelector(".close");
const cartItem = document.querySelector('.cart-item-description');

let cartArray = [];
let selectedCategory = 'Visa alla';

bestSellersButton.addEventListener('click', () => {
  bestsellerCourses().then(data => createCourseContainer(data)).catch(err => console.log(err));

  selectedCategory = 'Bästsäljare';
});

allCoursesButton.addEventListener('click', () => {
  loadCoarses().then(data => createCourseContainer(data)).catch(err => console.log(err));

  selectedCategory = 'Visa alla';
});


closeButton.addEventListener('click', () => {
  confirmationMessage.style.display = "none";
})

confirmationMessage.addEventListener('click', () => {
  confirmationMessage.style.display = "none";
})

async function loadCoarses() {
  const url = `${baseUrl}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

function createCourseContainer(courseList) {
  courses.innerHTML = '';
  updateTextParagraph(courseList.length)

  for (let i = 0; i < courseList.length; i++) {
    displayCourse(courseList[i]);
    createPurchaseButton(i, courseList[i]);
  }
}

function createPurchaseButton(index, course) {
  const button = document.createElement('button');
  button.textContent = 'Lägg i kundkorg';
  button.classList.add('add-to-cart');
  button.addEventListener('click', () => {

    addCourseToCart(course);
  });

  const courseContainer = document.getElementsByClassName('course')[index];
  courseContainer.appendChild(button);
}

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


function displayCourse(course) {
  courses.insertAdjacentHTML(
    'beforeend',

    `<div class="course">
        <h3>${course.title}</h3>
        <h4>Kategori: ${course.courseType}</h4>
        <h4>Lärare: ${course.teacher}</h4>
        <h4>Betyg: ${course.score}</h4>
        <p>${course.description}</p>
      </div>`);
}

function updateTextParagraph(count) {
  let text;

  switch (selectedCategory) {
    case 'Bästsäljare':
      text = 'Det här är våra tre högst rankade kurser';
      break;
    case 'Visa alla':
      text = `Vi har ${count} stycken video on demand kurser i vårat bibliotek`;
      break;
    default: text = `Vi har ${count} stycken video on demand kurser inom ${selectedCategory}`;
  }
  displayAmountOfCourses.innerHTML = text;
}

async function bestsellerCourses() {
  const url = `${baseUrl}?_sort=score&_order=desc&_limit=3`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

async function filterCourses(course) {
  const url = `${baseUrl}?courseType_like=${course}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

function checkSessionStorage() {
  const sessionStorageCart = JSON.parse(sessionCart.getItem('cartItems'));

  if (sessionStorageCart != null) {
    console.log(sessionStorageCart)
    cartArray = [...sessionStorageCart];
    console.log(cartArray);
  }
}

loadCoarses().then(data => createCourseContainer(data)).catch(err => console.log(err));
checkSessionStorage();