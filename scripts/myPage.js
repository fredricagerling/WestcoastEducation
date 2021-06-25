const studentInfo = document.querySelectorAll('#firstName, #lastName, #address, #postalNo, #city, #email, #phone');
const courseList = document.getElementById('courseContainer');
const form = document.querySelector('form');

if(!loggedInUser){
  window.location.replace("http://127.0.0.1:3000/app/public/index.html");
}

function setStudentValues() {
  const [FirstName, LastName, Phone, Email, Address, PostalNo, City] = studentInfo;

  FirstName.value = loggedInUser.firstName;
  LastName.value = loggedInUser.lastName;
  Address.value = loggedInUser.address;
  PostalNo.value = loggedInUser.postalNo;
  City.value = loggedInUser.postalAddress;
  Email.value = loggedInUser.email;
  Phone.value = loggedInUser.phoneNumber;

  courseList.innerHtml = '';
  for (let i = 0; i < loggedInUser.courses.length; i++) {

    courseList.insertAdjacentHTML('beforeend',
      `<option value="${loggedInUser.courses[i]}">${loggedInUser.courses[i]}</option>`)

  }

  form.addEventListener('submit', updateStudent);
}

function updateStudent(){
  submitForm('updateStudent', 'PUT', form, loggedInUser.studentId);
  location.reload();
}

setStudentValues();