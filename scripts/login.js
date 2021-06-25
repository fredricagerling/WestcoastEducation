const loginButton = document.getElementById('loginButton');
const loginModal = document.getElementById('loginModal');
const userDropDown = document.getElementById('user');
const confirmLoginButton = document.getElementById('confirmLogin');
const sessionLogin = window.sessionStorage;
const userMessage = document.getElementById('userMessage');
const closeLoginButton = document.getElementById('closeLogin');
const myPageButton = document.getElementById('myPage');

closeLoginButton.addEventListener('click', closeLoginModalHandler);

let loggedInUser;

loginButton.addEventListener('click', loginHandler);

function loginHandler() {
  if (loggedInUser) {
    sessionLogin.removeItem(`loggedInUser`);
    loggedInUser = null;
    location.reload();
  } else {
    setUserLoggedInMessage();
    loginModal.style.display = 'flex';
  }
}
function setUserLoggedInMessage() {
  if (loggedInUser != null) {
    userMessage.innerHTML = `Du är inloggad som ${loggedInUser.firstName} ${loggedInUser.lastName}`;
  }
}
function closeLoginModalHandler() {

  loginModal.style.display = 'none';
  location.reload();
}

function loginUserHandler() {

  loadStudent(userDropDown.value).then(data => loginUser(data)).catch(err => console.log(err));

}
function loginUser(student) {
  if (student.length > 0) { return; }
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
  if (loggedInUser) {

    loadStudent(loggedInUser.studentId).then(data => setUser(data)).catch(err => console.log(err));

    const initials = `${loggedInUser.firstName.slice(0, 1)} ${loggedInUser.lastName.slice(0, 1)}`;
    loginButton.innerHTML = 'Logga ut';
    myPageButton.innerHTML = initials;
    myPageButton.style.display = 'block';
  }
  else {
    loginButton.innerHTML = 'Logga in'
    myPageButton.style.display = 'none';
    sessionLogin.removeItem('cartItems');
  }
}

function setUser(data) {
  sessionLogin.setItem(`loggedInUser`, JSON.stringify(data));
  loggedInUser = JSON.parse(sessionLogin.getItem(`loggedInUser`));
}

checkIfUserIsLoggedIn();
loadStudents().then(data => populateUserDropdown(data)).catch(err => console.log(err));