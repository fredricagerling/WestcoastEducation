const baseUrl = 'http://localhost:3000/courses';

const courses = document.querySelector('#coursesContainer');
const displayAmountOfCourses = document.querySelector('#info-text');

const allCoursesButton = document.querySelector('#showAllCourses').addEventListener('click', () => {
    loadCoarses().then(data => createCourseContainer(data)).catch(err => console.log(err));

    selectedCategory = 'Visa alla';
});

const bestSellersButton = document.querySelector('#bestSellers').addEventListener('click', () => {
    bestsellerCourses().then(data => createCourseContainer(data)).catch(err => console.log(err));

    selectedCategory = 'Bästsäljare';
});

let selectedCategory = 'Visa alla';

async function bestsellerCourses() {
    const url = `${baseUrl}?_sort=score&_order=desc&_limit=3`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

async function filterCourses(course) {
    const url = `${baseUrl}?courseType_like=${course}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

async function loadCoarses() {
    const url = `${baseUrl}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

function createCourseContainer(courseList) {
    courses.innerHTML = '';
    updateTextParagraph(courseList.length)

    for (let course of courseList) {
        displayCourse(course);
    }
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
}

function updateTextParagraph(count) {
    let text;

    switch (selectedCategory) {
        case 'Bästsäljare':
            text = 'Det här är våra tre högst rankade kurser';
            break;
        case 'Visa alla':
            text = `Vi har ${count} stycken video on demand kurser i vårat bibliotek`;
            break;
        default: text = `Vi har ${count} stycken video on demand kurser inom ${selectedCategory}`;
    }
    displayAmountOfCourses.innerHTML = text;
}

loadCoarses().then(data => createCourseContainer(data)).catch(err => console.log(err));