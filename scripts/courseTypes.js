const categories = document.querySelector('#courseCategories');

async function loadCoarseTypes() {
    const url = 'http://localhost:3000/courseTypes';
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

function createFilterButton(courseTypes) {
    for (let type of courseTypes) {
        displayFilterButton(type.type);
    }
}

function displayFilterButton(courseType) {
    let button = document.createElement('button');

    button.textContent = courseType;
    button.classList.add('filter-button');
    button.id = `${courseType}Button`;
    categories.appendChild(button);

    button.addEventListener('click', () => {
        filterCourses(courseType).then(data => createCourseContainer(data)).catch(err => console.log(err));
        selectedCategory = courseType;
    });
}


loadCoarseTypes().then(data => createFilterButton(data)).catch(err => console.log(err));