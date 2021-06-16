'use strict';

const overviewTable = document.querySelector('#overviewTable');
const studentModal = document.querySelector('#studentModal');
const closeButton = document.querySelectorAll(".close");
const addStudentButton = document.getElementById('addNewStudent');
const modalTitle = document.getElementById('modalTitle');
const tableBody = document.querySelector('#overviewTable tbody');
const assignCourseButton = document.getElementById('assignCourse');
const assignCourseModal = document.querySelector('#assignCourseModal');
const form = document.querySelector('form');
const studentInfo = document.querySelectorAll('#firstName, #lastName, #address, #postalNo, #city, #email, #phone');

let studentToUpdate;
let $table;
let students = [];

assignCourseButton.addEventListener('click', () => {
  assignCourseModal.style.display = 'flex';
  loadCourses().then(data => populateCourseSelector(data)).catch(err => console.log(err))
});

const populateCourseSelector = (courses) => {
  const addCourseToStudentForm = document.getElementById('courseContainer');
  const addCourseToStudentTitle = document.getElementById('addCourseToStudentTitle');
  const assignForm = document.querySelector('#assignCourseForm');

  assignForm.addEventListener('submit', submitForm.bind(this, 'assign', 'POST', assignForm));

  addCourseToStudentTitle.innerHTML = `Tilldela kurs till ${studentToUpdate.fullName}`
  addCourseToStudentForm.innerHTML = "";

  const student = students.filter(f => f.studentId === studentToUpdate.id);

  for (let course of courses) {
    var result = student[0].courses.find(title => title == course.title);

    if (result == undefined && course.isActive != false) {
      addCourseToStudentForm.insertAdjacentHTML('beforeend',
        `<option value="${course.courseId}">${course.title}</option>`)
    }
  }
}

for (let i = 0; i < closeButton.length; i++) {
  closeButton[i].addEventListener('click', closeModal);
}

addStudentButton.addEventListener('click', () => {
  studentModal.style.display = 'flex';
  modalTitle.innerHTML = 'Lägg till student';
  addForm.addEventListener('submit', submitForm.bind(this, 'addStudent', 'POST', form));
});

function closeModal() {
  const inputs = document.querySelectorAll('input');

  studentModal.style.display = 'none';
  assignCourseModal.style.display = 'none';

  for (let input of inputs) {
    input.value = null;
  }
};

function updateCourse(student) {
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
        <td><i class="fas fa-info-circle"></i>
        <td>${student.studentId}</td>
        <td>${student.firstName} ${student.lastName}</td>
        <td>${student.email}</td>
        <td>${student.phoneNumber}</td>
        <td>${student.courses.length}</td>
        <td><i class="fas fa-edit" id="editStudent${student.studentId}"></i></td>
      </tr>`
    )
    const editStudent = document.querySelector(`#editStudent${student.studentId}`);
    editStudent.addEventListener('click', updateCourse.bind(this, student));
  }

  searchTable();
  highlightTableRow();
  selectingStudent();
}

function selectingStudent() {
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