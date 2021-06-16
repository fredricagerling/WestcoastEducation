'use strict';

async function loadCourseTypes() {
  const url = 'https://localhost:5503/api/categories';
  const response = await fetch(url);

  if (!response.ok) {
      throw new Error(response.statusText);
  }

  return response.json();
}

async function loadCourses() {
  const url = `https://localhost:5503/api/courses`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

async function loadStudents() {
  const url = `https://localhost:5503/api/students`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

async function loadTeachers() {
  const url = `https://localhost:5503/api/teachers`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

async function submitForm(submit, method, form) {
  const data = new FormData(form);
  const value = Object.fromEntries(data.entries());
  let viewModel, url;

  if (submit === 'assign') {
    viewModel = new CoursesStudentsViewModel(value);
    url = 'https://localhost:5503/api/studentscourses';
  } else if (submit === 'addStudent' && method === 'POST') {
    viewModel = new StudentViewModel(value);
    url = 'https://localhost:5503/api/students';
  } else if (submit === 'updateStudent' && method === 'PUT') {
    viewModel = new StudentViewModel(value);
    url = `https://localhost:5503/api/students/${studentToUpdate.id}`;
  } else if(submit === 'updateCourse' && method === 'PUT'){
    viewModel = new UpdateCourseViewModel(value);
    url = `https://localhost:5503/api/courses/${courseToUpdate}`
  } else if(submit === 'addCourse' && method === 'POST'){
    viewModel = new AddCourseViewModel(value);
    url = `https://localhost:5503/api/courses`
  }
  postToDatabase(url, method, viewModel);
  location.reload();
}

async function postToDatabase(url, method, viewModel) {
  const response = await fetch(url, {
    method: method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(viewModel)
  });

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json();
}