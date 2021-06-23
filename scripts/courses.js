'use strict';
const courses = document.querySelector('#coursesContainer');
const displayAmountOfCourses = document.querySelector('#info-text');
const allCoursesButton = document.querySelector('#showAllCourses');
const bestSellersButton = document.querySelector('#bestSellers');
const courseInfo = document.querySelector('#courseInfo');

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
  // Kolla om kursen är aktiv
  updateTextParagraph(courseList.length)

  // if(loggedInUser != null)

  //     var result = loggedInUser.courses.find(title => title == course.title);


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
      <button class="add-to-cart btn" id="purchaseCourse${course.courseId}">Köp</button>
    </div>`);

    const purchaseButton = document.getElementById(`purchaseCourse${course.courseId}`);
    
    purchaseButton.addEventListener('click', addCourseToCart.bind(course));
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


loadCourses().then(data => createCourseContainer(data)).catch(err => console.log(err));


// function createEvent(index, course) {
//   const courseBox = document.getElementsByClassName('course')[index];
//   courseBox.addEventListener('click', (e) => {
//     if (!e.target.classList.contains('add-to-cart')) {
//       courseInfo.innerHTML = '';
//       courseInfo.style.display = "flex";
//       courseInfo.insertAdjacentHTML(
//         'beforeend',

//         `<div class="modal-content">
//           <div class="modal-header">
//           <h3 class="modal-title">${course.title}</h3><span class="close close-description">&times;</span>
//           </div>
//           <div class="course-details"><h3>Kursbeskrivning:</h3><span>${course.description}</span>
//           </div>
//         </div>`);

//       const closeDetailsButton = document.querySelector('.close-description');
//       closeDetailsButton.addEventListener('click', () => {
//         courseInfo.style.display = 'none';

//       });
//     }
//   });
// }

// function createPurchaseButton(index, course) {
//   const button = document.createElement('button');
//   button.textContent = 'Köp';
//   button.classList.add('add-to-cart');
//   button.classList.add('btn');
//   button.addEventListener('click', () => {
//     addCourseToCart(course);

//   });

//   const courseContainer = document.getElementsByClassName('course')[index];
//   courseContainer.appendChild(button);
// }