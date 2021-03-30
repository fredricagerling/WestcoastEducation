const courses = document.querySelector('#coursesContainer');
const text = document.querySelector('#test');
const categories = document.querySelector('#courseCategories');
const filterButtons = document.querySelector('.filter-button');

const showAllCourses = document.querySelector('#showAllCourses').addEventListener('click', () => {
    loadCoarses().then(data => createCourseContainer(data)).catch(err => console.log(err));
});

const bestSellersButton = document.querySelector('#bestSellers').addEventListener('click', () => {
    bestsellerCourses().then(data => createCourseContainer(data)).catch(err => console.log(err));

});

let courseCategories = [];

const baseUrl = 'http://localhost:3000/courses';

function updateTextParagraph(count) {
    text.innerHTML = `Choose from ${count} online video courses with new additions published every month`;
}

function createCourseContainer(courseList) {

    courses.innerHTML = '';
    updateTextParagraph(courseList.length)
    for (let course of courseList) {
        displayCourse(course);
    }

}

async function loadCoarses() {
    const url = `${baseUrl}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

function displayCourse(course) {
    courses.insertAdjacentHTML(
        'beforeend',

        `<div class="course">
            <h3>${course.title}</h3>
            <h4>Kategori: ${course.courseType}</h4>
            <h4>Lärare: ${course.teacher}</h4>
            <h4>Betyg: ${course.score}</h4>
            <p>${course.description}</p>
        </div>`);

    if (!courseCategories.includes(course.courseType)) {
        courseCategories.push(course.courseType);
        createFilterButton(course.courseType);
    }
}

async function bestsellerCourses() {

    const url = `${baseUrl}?_sort=score&_order=desc`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

async function filterCourses(course) {

    const url = `${baseUrl}?q=${course}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    
    return response.json();
}

function createFilterButton(course) {

    var btn = document.createElement("BUTTON");
    var t = document.createTextNode(course);

    btn.setAttribute("class", "filter-button");
    // btn.setAttribute("class", `${course}-button`);
    btn.addEventListener('click', () => {
        filterCourses(course).then(data => createCourseContainer(data)).catch(err => console.log(err));
    });

    btn.appendChild(t);
    categories.appendChild(btn);
}


loadCoarses().then(data => createCourseContainer(data)).catch(err => console.log(err));