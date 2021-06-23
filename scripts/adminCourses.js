'use strict';
const overviewTable = document.querySelector('#overviewTable');
const editCourse = document.querySelector('#editCourseModal');
const addCourse = document.querySelector('#addCourseModal')
const closeButton = document.querySelectorAll(".close");
const addCourseButton = document.getElementById('addNewCourse');
const modalTitle = document.getElementById('modalTitle');
const tableBody = document.querySelector('#overviewTable tbody');
const addForm = document.getElementById('addForm');
const editForm = document.getElementById('editForm');
const teacherDropdown = document.getElementById('teacher');
const categoryDropdown = document.getElementById('category');
const moreInfoModal = document.getElementById('moreInfoModal');
const courseInfo = document.querySelectorAll('#editTitle, #editCourseLevel, #editActivity, #editDescription, #editScore, #editPrice, #editLength, #editCourseNumber');

let courseToUpdate;

for (let i = 0; i < closeButton.length; i++) {
  closeButton[i].addEventListener('click', closeModalHandler);
}

addCourseButton.addEventListener('click', postCourseHandler);

function createCourseTable(courseList) {
  tableBody.innerHTML = '';

  for (let course of courseList) {
    var isActive = course.isActive ? 'Ja' : 'Nej';

    tableBody.insertAdjacentHTML('beforeend',
      `<tr>
        <td><i class="fas fa-info-circle" id="moreInfo${course.courseId}"></i>
        <td class="hide-colum-mobile">${course.courseId}</td>
        <td>${course.title}</td>
        <td class="hide-colum-mobile">${course.teacher}</td>
        <td class="hide-colum-mobile">${course.students.length}</td>
        <td>${isActive}</td>
        <td><i class="fas fa-edit" id="editCourse${course.courseId}"></i></td>
      </tr>`
    )
    const moreInfo = document.getElementById(`moreInfo${course.courseId}`);
    const editCourse = document.querySelector(`#editCourse${course.courseId}`);

    moreInfo.addEventListener('click', moreInfoHandler.bind(this, course));
    editCourse.addEventListener('click', updateCourseHandler.bind(this, course));
  }

  searchTable();
  highlightTableRow();
  selectingCourse();
}

function moreInfoHandler(course) {
  moreInfoModal.style.display = 'flex';
  const title = moreInfoModal.querySelector('h3');
  const courseDetails = document.getElementById('courseDetails');
  title.innerHTML = `${course.title}`;

  const activity = course.isActive ? 'Ja' : 'Nej';
  
  courseDetails.innerHTML = 
    `<div><h3>Beskrivning:</h3><p>${course.description}</p>
      <section>
        <div><h3>KursId:</h3><p>${course.courseId}</p></div>
        <div><h3>Kursnummer:</h3><p>${course.courseNumber}</p></div>
        <div><h3>Aktiv:</h3><p>${activity}</p></div>
        <div><h3>Nivå:</h3><p>${course.courseLevel}</p></div>
        <div><h3>Lärare:</h3><p>${course.teacher}</p></div>
        <div><h3>Längd:</h3><p>${course.length} timmar</p></div>
        <div><h3>Pris:</h3><p>${course.price}</p></div>
        <div><h3>Betyg:</h3><p>${course.score}/5</p></div>
      </section>
    <div>`;
}

function postCourseHandler() {
  addCourse.style.display = 'flex';
  addForm.addEventListener('submit', submitForm.bind(this, 'addCourse', 'POST', addForm));
}

function updateCourseHandler(course) {
  console.log(course.isActive);
  const [Title, Activity, CourseLevel, Description, Score, Price, Length, CourseNumber] = courseInfo;

  editCourse.style.display = 'flex';
  Title.value = course.title;
  CourseLevel.value = course.courseLevel;
  Activity.value = course.isActive;
  Description.value = course.description;
  Score.value = course.score;
  Price.value = course.price;
  Length.value = course.length;
  CourseNumber.value = course.courseNumber;
  courseToUpdate = course.courseId;

  editForm.addEventListener('submit', submitForm.bind(this, 'updateCourse', 'PUT', editForm));
}

function populateTeacherDropDown(teachers) {
  teacherDropdown.innerHTML = '';
  teacherDropdown.insertAdjacentHTML('beforeend',
    `<option hidden disabled selected value>- Välj lärare -</option>`);

  for (let teacher of teachers) {
    teacherDropdown.insertAdjacentHTML('beforeend',
      `<option value="${teacher.name}">${teacher.name}</option>`);
  }
}

function populateCategoryDropDown(categories) {
  categoryDropdown.innerHTML = '';
  categoryDropdown.insertAdjacentHTML('beforeend',
    `<option hidden disabled selected value>- Välj kategori -</option>`);

  for (let category of categories) {
    categoryDropdown.insertAdjacentHTML('beforeend',
      `<option value="${category.categoryName}">${category.categoryName}</option>`);
  }
}

function closeModalHandler() {
  const inputs = document.querySelectorAll('input');

  editCourse.style.display = 'none';
  addCourse.style.display = 'none';
  moreInfoModal.style.display = 'none';

  for (let input of inputs) {
    input.value = null;
  }
};

function selectingCourse() {
  $("tr").not(':first').click(
    function () {
      $('#overviewTable tbody').children().removeClass('selected');

      $(this).addClass('selected');
    }
  );
}

loadCourses().then(data => createCourseTable(data)).catch(err => console.log(err));
loadCourseCategories().then(data => populateCategoryDropDown(data)).catch(err => console.log(err));
loadTeachers().then(data => populateTeacherDropDown(data)).catch(err => console.log(err));