const loginButton = document.getElementById('loginButton');
const loginModal = document.getElementById('loginModal');
const userDropDown = document.getElementById('user');
const confirmLoginButton = document.getElementById('confirmLogin');
const sessionLogin = window.sessionStorage;
const userMessage = document.getElementById('userMessage');
const closeLoginButton = document.getElementById('closeLogin');

closeLoginButton.addEventListener('click', closeLoginModalHandler);

let loggedInUser;

loginButton.addEventListener('click', loginHandler);

function loginHandler() {

  setUserLoggedInMessage();
  loginModal.style.display = 'flex';
}
function setUserLoggedInMessage(){
  if (loggedInUser != null) {
    userMessage.innerHTML = `Du är inloggad som ${loggedInUser.firstName} ${loggedInUser.lastName}`;
    //Sätt in utloggningsknapp
  }
}
function closeLoginModalHandler(){
  
  loginModal.style.display = 'none';
}

function loginUserHandler() {

  loadStudent(userDropDown.value).then(data => loginUser(data)).catch(err => console.log(err));
  
}
function loginUser(student) {
  sessionLogin.setItem(`loggedInUser`, JSON.stringify(student));
  loggedInUser = JSON.parse(sessionLogin.getItem('loggedInUser'));
  setUserLoggedInMessage();
}

function populateUserDropdown(students) {
  userDropDown.innerHTML = '';
  
  userDropDown.insertAdjacentHTML('beforeend',
    `<option hidden disabled selected value>- Välj Student -</option>`);

  for (let student of students) {
    userDropDown.insertAdjacentHTML('beforeend',
      `<option value="${student.studentId}">${student.firstName} ${student.lastName}</option>`);
  }
  confirmLoginButton.addEventListener('click', loginUserHandler)
}

function checkIfUserIsLoggedIn() {
  loggedInUser = JSON.parse(sessionLogin.getItem(`loggedInUser`));
}

checkIfUserIsLoggedIn();
loadStudents().then(data => populateUserDropdown(data)).catch(err => console.log(err));