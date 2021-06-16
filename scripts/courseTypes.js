'use strict';

const categories = document.querySelector('#courseCategories');

function createFilterButton(courseTypes) {
    for (let type of courseTypes) {
        displayFilterButton(type.categoryName);
    }
}

function displayFilterButton(courseType) {
    let button = document.createElement('button');

    button.textContent = courseType;
    button.classList.add('filter-button');
    categories.appendChild(button);

    button.addEventListener('click', () => {
        filterCourses(courseType).then(data => createCourseContainer(data)).catch(err => console.log(err));
        selectedCategory = courseType;
    });
}

loadCourseTypes().then(data => createFilterButton(data)).catch(err => console.log(err));