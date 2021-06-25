'use strict';

async function loadCourseCategories() {
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

async function loadStudent(studentId) {
  const url = `https://localhost:5503/api/students/${studentId}`;
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

async function submitForm(submit, method, form, id) {
  const data = new FormData(form);
  const value = Object.fromEntries(data.entries());
  let viewModel, url;

  if (submit === 'assign') {
    viewModel = new StudentCourses(value);
    url = 'https://localhost:5503/api/studentscourses';
  } else if (submit === 'addStudent' && method === 'POST') {
    viewModel = new Student(value);
    url = 'https://localhost:5503/api/students';
  } else if (submit === 'updateStudent' && method === 'PUT') {
    viewModel = new Student(value);
    url = `https://localhost:5503/api/students/${id}`;
  } else if (submit === 'updateCourse' && method === 'PUT') {
    viewModel = new UpdateCourse(value);
    url = `https://localhost:5503/api/courses/${id}`
  } else if (submit === 'addCourse' && method === 'POST') {
    viewModel = new AddCourse(value);
    url = `https://localhost:5503/api/courses`
  }
  postToDatabase(url, method, viewModel);
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

  return response;
}

async function filterCourses(course) {
  const url = `https://localhost:5503/api/courses/category/${course}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

async function bestsellerCourses() {
  const url = `https://localhost:5503/api/courses/bestsellers/topthree`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}