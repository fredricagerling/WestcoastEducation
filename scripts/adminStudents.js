'use strict';

const overviewTable = document.querySelector('#overviewTable');
const studentModal = document.querySelector('#studentModal');
const closeButton = document.querySelectorAll(".close");
const addStudentButton = document.getElementById('addNewStudent');
const modalTitle = document.getElementById('modalTitle');
const tableBody = document.querySelector('#overviewTable tbody');
const assignCourseButton = document.getElementById('assignCourse');
const assignCourseModal = document.getElementById('assignCourseModal');
const moreInfoModal = document.getElementById('moreInfoModal');
const form = document.querySelector('form');
const studentInfo = document.querySelectorAll('#firstName, #lastName, #address, #postalNo, #city, #email, #phone');

let studentToUpdate;
let $table;
let students = [];

assignCourseButton.addEventListener('click', () => {
  assignCourseModal.style.display = 'flex';
  loadCourses().then(data => populateCourseSelector(data)).catch(err => console.log(err))
});

addStudentButton.addEventListener('click', () => {
  studentModal.style.display = 'flex';
  modalTitle.innerHTML = 'Lägg till student';
  addForm.addEventListener('submit', submitForm.bind(this, 'addStudent', 'POST', form));
});

for (let i = 0; i < closeButton.length; i++) {
  closeButton[i].addEventListener('click', closeModalHandler);
}

const populateCourseSelector = (courses) => {
  const courseList = document.getElementById('courseContainer');
  const modalTitle = document.getElementById('addCourseToStudentTitle');
  const assignForm = document.querySelector('#assignCourseForm');
  const student = students.filter(f => f.studentId === studentToUpdate.id);

  modalTitle.innerHTML = `Tilldela kurs till ${studentToUpdate.fullName}`
  courseList.innerHTML = "";

  for (let course of courses) {
    var result = student[0].courses.find(title => title == course.title);

    if (result == undefined && course.isActive != false) {
      courseList.insertAdjacentHTML('beforeend',
        `<option value="${course.courseId}">${course.title}</option>`)
    }
  }
  assignForm.addEventListener('submit', submitForm.bind(this, 'assign', 'POST', assignForm));
}

function closeModalHandler() {
  const inputs = document.querySelectorAll('input');

  studentModal.style.display = 'none';
  assignCourseModal.style.display = 'none';
  moreInfoModal.style.display = 'none';

  for (let input of inputs) {
    input.value = null;
  }
};

function moreInfoHandler(student) {
  moreInfoModal.style.display = 'flex';
  const title = moreInfoModal.querySelector('h3');
  const fullAddress = document.getElementById('fullAddress');
  const courseList = document.getElementById('courseList');

  fullAddress.innerHTML = '';
  courseList.innerHTML = `<h3>Kurser:</h3>`

  title.innerHTML = `${student.firstName} ${student.lastName}`;
  fullAddress.insertAdjacentHTML('beforeend',
    `<div id="studentContactInfo">
      <div class="modal-student-info">
        <h3>Adress:</h3>
        <span>${student.address}</span>
        <span>${student.postalNo}</span>
        <span>${student.postalAddress}</span>
      </div>
      
      <div class="modal-student-info">
        <h3>Telefon:</h3>
        <span>${student.phoneNumber}</span>
        <h3>Email:</h3>
        <span>${student.email}</span>
      </div>
    </div>`)

  for (let i = 0; i < student.courses.length; i++) {
    courseList.insertAdjacentHTML('beforeend', `<span>${student.courses[i]}</span>`)
  }
}

function updateCourseHandler(student) {
  const [FirstName, LastName, Phone, Email, Address, PostalNo, City] = studentInfo;

  studentModal.style.display = 'flex';
  FirstName.value = student.firstName;
  LastName.value = student.lastName;
  Address.value = student.address;
  PostalNo.value = student.postalNo;
  City.value = student.postalAddress;
  Email.value = student.email;
  Phone.value = student.phoneNumber;
  studentToUpdate = { id: student.studentId, fullName: `${student.firstName} ${student.lastName}` };
  modalTitle.innerHTML = 'Redigera student';

  form.addEventListener('submit', submitForm.bind(this, 'updateStudent', 'PUT', form));
}

function createStudentTable(studentList) {
  tableBody.innerHTML = "";

  for (let student of studentList) {
    students.push(student);
    tableBody.insertAdjacentHTML('beforeend',
      `<tr id="student${student.studentId}">
        <td><i class="fas fa-info-circle" id="moreInfo${student.studentId}"></i>
        <td class="hide-colum-mobile">${student.studentId}</td>
        <td>${student.firstName} ${student.lastName}</td>
        <td class="hide-colum-mobile">${student.email}</td>
        <td class="hide-colum-mobile">${student.phoneNumber}</td>
        <td>${student.courses.length}</td>
        <td><i class="fas fa-edit" id="editStudent${student.studentId}"></i></td>
      </tr>`
    )
    const moreInfo = document.getElementById(`moreInfo${student.studentId}`);
    const editStudent = document.getElementById(`editStudent${student.studentId}`);

    moreInfo.addEventListener('click', moreInfoHandler.bind(this, student));
    editStudent.addEventListener('click', updateCourseHandler.bind(this, student));
  }

  searchTable();
  highlightTableRow();
  selectingCourse();
}

function selectingCourse() {
  $("tr").not(':first').click(
    function () {
      $('#overviewTable tbody').children().removeClass('selected');

      studentToUpdate = { id: parseInt(this.children[1].textContent), fullName: this.children[2].textContent };

      $(this).addClass('selected');
      assignCourseButton.removeAttribute('disabled');
    }
  );
}

loadStudents().then(data => createStudentTable(data)).catch(err => console.log(err));