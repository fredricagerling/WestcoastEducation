'use strict';

const baseUrl = 'https://localhost:5503/api/courses';
const courses = document.querySelector('#coursesContainer');
const displayAmountOfCourses = document.querySelector('#info-text');
const allCoursesButton = document.querySelector('#showAllCourses');
const bestSellersButton = document.querySelector('#bestSellers');
const courseInfo = document.querySelector('#courseInfo');

let selectedCategory = 'Visa alla';

bestSellersButton.addEventListener('click', () => {
  bestsellerCourses().then(data => createCourseBox(data)).catch(err => console.log(err));

  selectedCategory = 'Bästsäljare';
});

allCoursesButton.addEventListener('click', () => {
  loadStudents().then(data => createCourseBox(data)).catch(err => console.log(err));

  selectedCategory = 'Visa alla';
});

function createCourseBox(courseList) {
  courses.innerHTML = '';
  updateTextParagraph(courseList.length)

  for (let i = 0; i < courseList.length; i++) {
    displayCourse(courseList[i]);
    createPurchaseButton(i, courseList[i]);
    createEvent(i, courseList[i]);
  }
}

function createEvent(index, course) {
  const courseBox = document.getElementsByClassName('course')[index];
  courseBox.addEventListener('click', (e) => {
    if (!e.target.classList.contains('add-to-cart')) {
      courseInfo.innerHTML = '';
      courseInfo.style.display = "flex";
      courseInfo.insertAdjacentHTML(
        'beforeend',

        `<div class="modal-content">
          <div class="modal-header">
          <h3 class="modal-title">${course.title}</h3><span class="close close-description">&times;</span>
          </div>
          <div class="course-details"><h3>Kursbeskrivning:</h3><span>${course.description}</span>
          </div>
        </div>`);

      const closeDetailsButton = document.querySelector('.close-description');
      closeDetailsButton.addEventListener('click', () => {
        courseInfo.style.display = 'none';

      });
    }
  });
}

function createPurchaseButton(index, course) {
  const button = document.createElement('button');
  button.textContent = 'Köp';
  button.classList.add('add-to-cart');
  button.classList.add('btn');
  button.addEventListener('click', () => {
    addCourseToCart(course);

  });

  const courseContainer = document.getElementsByClassName('course')[index];
  courseContainer.appendChild(button);
}

function displayCourse(course) {
  courses.insertAdjacentHTML(
    'beforeend',

    `<div class="course">
        <div class="course-info">
        <h3>${course.title}</h3>
        <h4>Kategori: ${course.category}</h4>
        <h4>Skapare: ${course.teacher}</h4>
        <div class="course-info-second"><span>${course.date.slice(0, 10)}</span>
        <span class="separator"> &#9679; </span>
        <span>Betyg: ${course.score}</span>
        <span class="separator"> &#9679; </span>
        <span>${course.length} timmar</span></div>
      </div>
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

loadCourses().then(data => createCourseBox(data)).catch(err => console.log(err));