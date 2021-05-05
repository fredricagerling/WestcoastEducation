'use strict';

const baseUrl = 'http://localhost:3000/';
const addNewCourseButton = document.querySelector('#addNewCourse');
const addCourses = document.querySelector('#addCourseModal');
const closeButton = document.querySelector(".close");
const form = document.querySelector('form');
const options = document.querySelector('#category');

form.addEventListener('submit', submitForm);

async function loadCourseTypes() {
  const url = `${baseUrl}courseTypes`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

function populateDropDownBox(courseTypes) {
  options.innerHTML = '';
  options.insertAdjacentHTML('beforeend',
    `<option hidden disabled selected value>- Välj kategori -</option>`);

  for (let type of courseTypes) {
    createOption(type.type);
  }
}

function createOption(courseType) {
  options.insertAdjacentHTML('beforeend',
    `<option value="${courseType}">${courseType}</option>`);
}

closeButton.addEventListener('click', () => {
  addCourses.style.display = 'none';
})

addNewCourseButton.addEventListener('click', () => {
  addCourses.style.display = 'flex';
})

async function submitForm(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const value = Object.fromEntries(data.entries());

  const newCourse = new Course(value);
  postToDatabase(newCourse);
}

async function postToDatabase(newCourse) {
  const response = await fetch(`${baseUrl}courses`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newCourse)
  });

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json();
}

class Course {
  constructor(course) {
    this.title = course.title;
    this.courseNumber = parseInt(course.courseNumber);
    this.teacher = course.teacher;
    this.courseType = course.category;
    this.length = parseInt(course.length);
    this.score = 0;
    this.price = parseInt(course.price);
    this.description = course.description;
    this.date = new Date().toISOString().slice(0, 10);
  }
}

loadCourseTypes().then(data => populateDropDownBox(data)).catch(err => console.log(err));