'use strict';
const baseUrl = 'https://localhost:5503/api/courses';

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
const courseInfo = document.querySelectorAll('#editTitle, #editCourseLevel, #editActivity, #editDescription, #editScore, #editPrice, #editLength, #editCourseNumber');

let courseToUpdate;

addCourseButton.addEventListener('click', addCourseToDB);

function addCourseToDB() {
  addCourse.style.display = 'flex';
  addForm.addEventListener('submit', submitForm.bind(this, 'addCourse', 'POST', addForm));
}

for (let i = 0; i < closeButton.length; i++) {
  closeButton[i].addEventListener('click', closeModal);
}

function closeModal() {
  const inputs = document.querySelectorAll('input');

  editCourse.style.display = 'none';
  addCourse.style.display = 'none';

  for (let input of inputs) {
    input.value = null;
  }
};

function updateCourse(course) {
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

function createStudentTable(courseList) {
  tableBody.innerHTML = "";

  for (let course of courseList) {
    var isActive = course.isActive ? "Ja" : "Nej";

    tableBody.insertAdjacentHTML('beforeend',
      `<tr>
        <td><i class="fas fa-info-circle"></i>
        <td>${course.courseId}</td>
        <td>${course.title}</td>
        <td>${course.teacher}</td>
        <td>${course.students.length}</td>
        <td>${isActive}</td>
        <td><i class="fas fa-edit" id="editCourse${course.courseId}"></i></td>
      </tr>`
    )
    const editCourse = document.querySelector(`#editCourse${course.courseId}`);
    editCourse.addEventListener('click', updateCourse.bind(this, course));
  }

  searchTable();
  highlightTableRow();
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

loadCourses().then(data => createStudentTable(data)).catch(err => console.log(err));
loadCourseTypes().then(data => populateCategoryDropDown(data)).catch(err => console.log(err));
loadTeachers().then(data => populateTeacherDropDown(data)).catch(err => console.log(err));
