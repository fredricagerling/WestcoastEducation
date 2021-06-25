'use strict';
const courses = document.querySelector('#coursesContainer');
const displayAmountOfCourses = document.querySelector('#info-text');
const allCoursesButton = document.querySelector('#showAllCourses');
const bestSellersButton = document.querySelector('#bestSellers');
const courseInfo = document.getElementById('courseDetailsModal');
const courseDescription = document.getElementById('courseDescription');
const closeDetailsButton = document.getElementById('closeDescription');
closeDetailsButton.addEventListener('click', () => {
  courseInfo.style.display = 'none';
});

let selectedCategory = 'Visa alla';

bestSellersButton.addEventListener('click', () => {
  bestsellerCourses().then(data => createCourseContainer(data)).catch(err => console.log(err));

  selectedCategory = 'Bästsäljare';
});

allCoursesButton.addEventListener('click', () => {
  loadCourses().then(data => createCourseContainer(data)).catch(err => console.log(err));

  selectedCategory = 'Visa alla';
});

function createCourseContainer(courseList) {
  courses.innerHTML = '';

  let counter = 0;

  for (let i = 0; i < courseList.length; i++) {
    if (courseList[i].isActive !== false) {
      counter++;
    }
  }
  updateTextParagraph(counter);

  for (let i = 0; i < courseList.length; i++) {
    if (courseList[i].isActive == false) {
      continue;
    }
    else {
      displayCourse(courseList[i]);
    }
  }
}

function displayCourse(course) {
  courses.insertAdjacentHTML(
    'beforeend',

    `<div class="course" id="courseBox${course.courseId}">
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
      <button class="add-to-cart btn" id="purchaseCourse${course.courseId}">Köp</button>
    </div>`);


  const purchaseButton = document.getElementById(`purchaseCourse${course.courseId}`);
  const courseBox = document.getElementById(`courseBox${course.courseId}`);

  if (loggedInUser != null) {
    const result = loggedInUser.courses.find(title => title == course.title);
    if (result) {
      purchaseButton.disabled = true;
    }
  }

  purchaseButton.addEventListener('click', addCourseToCart.bind(this, course));
  courseBox.addEventListener('click', detailedInfoHandler.bind(this, course));
}

function detailedInfoHandler(course, e) {
  const title = courseInfo.querySelector('.modal-title');
  if (!e.target.classList.contains('add-to-cart')) {
    title.innerHTML = `${course.title}`
    courseDescription.innerHTML = `${course.description}`;
    courseInfo.style.display = "flex";
  }
}

function updateTextParagraph(count) {
  let text;

  switch (selectedCategory) {
    case 'Bästsäljare':
      text = 'Det här är våra tre högst rankade kurser';
      break;
    case 'Visa alla':
      text = `Vi har ${count} stycken tillgängliga video on demand kurser i vårat bibliotek`;
      break;
    default: text = `Vi har ${count} stycken tillgängliga video on demand kurser inom ${selectedCategory}`;
  }
  displayAmountOfCourses.innerHTML = text;
}


loadCourses().then(data => createCourseContainer(data)).catch(err => console.log(err));