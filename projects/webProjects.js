// Get & assign all needed elements into variables
const sections = document.querySelectorAll('.section');
const indicators = document.querySelectorAll('.indicator');
const container = document.querySelector('.container');

// Get & assign all section data variables
const nameElement = document.getElementById('name');
const typeElement = document.getElementById('type');
const toolsElement = document.getElementById('tools');
const statusElement = document.getElementById('status');
const durationElement = document.getElementById('duration');
const yearElement = document.getElementById('year');
const descriptionElement = document.getElementById('description');
const projectNameElement = document.querySelector('.project-name');
const projectDescElement = document.querySelector('.project-desc');
const projectInfoElement = document.querySelector('.project-info');
const viewButton = document.querySelector('.view-button');


// Define section data
const sectionData = {
    section1: {
        name: "WeatherDAN",
        type: "WEB",
        tools: "NODE",
        status: "COMPLETED",
        duration: "9 HRS",
        year: "2024",
        description: "Anim sunt mollit minim mollit voluptate nulla non. Esse consectetur quis cupidatat ea ipsum laboris tempor ullamco consectetur amet nisi est eu reprehenderit.",
        url: "https://youtu.be/PVRaxcB78IE",
        dimmedColor: "rgba(8, 246, 111, .6)",
        mainColor: "rgb(8, 246, 111)",
    },
    section2: {
        name: "Movie LSTER",
        type: "WEB",
        tools: "HTML/CSS/JS",
        status: "COMPLETED",
        duration: "5 HRS",
        year: "2024",
        description: "Occaecat qui reprehenderit fugiat ea ea voluptate. Pariatur non occaecat incididunt exercitation ut culpa deserunt mollit magna deserunt consectetur elit et.",
        url: "https://hblazerr.github.io/CSC256/Movie%20List/index.html",
        dimmedColor: "rgba(171, 173, 177, .6)",
        mainColor: "rgb(171, 173, 177)",
    },
    section3: {
        name: "FairGame\u2122",
        type: "RESPONSIVE",
        tools: "VERCEL",
        status: "IN PROGRESS",
        duration: "20 HRS",
        year: "2024",
        description: "Commodo aliqua ipsum voluptate non. Et mollit ipsum esse duis et commodo amet cillum enim. Ad nisi dolor cillum nulla duis culpa. Qui cupidatat eu ad eiusmod labore anim elit occaecat adipisicing nostrud est sit aliqua adipisicing. ",
        url: "https://fair-game.org",
        dimmedColor: "rgba(222, 38, 38, .6)",
        mainColor: "rgb(222, 38, 38)",
    },
    section4: {
        name: "Meet Daniel",
        type: "WEB",
        tools: "HTML/CSS/JS",
        status: "COMPLETED",
        duration: "4 HRS",
        year: "2024",
        description: "Occaecat qui reprehenderit fugiat ea ea voluptate. Pariatur non occaecat incididunt exercitation ut culpa deserunt mollit magna deserunt consectetur elit et.",
        url: "https://hblazerr.github.io/CSC256/Meet%20Daniel/index.html",
        dimmedColor: "rgba(255, 255, 255, .6)",
        mainColor: "rgb(255, 255, 255)",
    },
    section5: {
        name: "Hearts Break Clothing",
        type: "WEB",
        tools: "HTML/CSS/JS",
        status: "COMPLETED",
        duration: "6 HRS",
        year: "2023",
        description: "Labore laborum reprehenderit velit incididunt adipisicing nulla aute ipsum ea incididunt aute. Voluptate magna exercitation velit dolor reprehenderit magna commodo eiusmod amet mollit.",
        url: "https://hblazerr.github.io/CSC256/Movie%20List/index.html",
        dimmedColor: "rgba(199, 58, 68, .6)",
        mainColor: "rgb(199, 58, 68)",
    }
};



function updateContent(index) {
    const sectionKey = `section${index + 1}`;
    const data = sectionData[sectionKey];

    // Update project content based on sectionData
    nameElement.textContent = data.name;
    typeElement.textContent = data.type;
    toolsElement.textContent = data.tools;
    statusElement.textContent = data.status;
    durationElement.textContent = data.duration;
    yearElement.textContent = data.year;
    descriptionElement.textContent = data.description;

    // Update CSS variables for colors
    document.documentElement.style.setProperty('--dimmed-color', data.dimmedColor);
    document.documentElement.style.setProperty('--full-color', data.mainColor);

    // Update text color
    projectNameElement.style.color = data.mainColor;
    projectDescElement.style.color = data.mainColor;
    projectInfoElement.style.color = data.mainColor;

    // Update View button link
    viewButton.onclick = function () {
        window.open(data.url, '_blank');
    };
}

// Initialize content so first section shows on page load
updateContent(0);


// Handle scroll event
container.addEventListener('scroll', () => {
    // Attach scroll event listener to container
    const scrollPosition = container.scrollTop; // Gets current scroll position

    // Iterate through each section
    sections.forEach((section, index) => {
        const sectionPosition = section.offsetTop; // Gets top position of each section

        // Eval if user scrolled to a section
        if (scrollPosition >= sectionPosition && scrollPosition < sectionPosition + section.clientHeight) {
            indicators.forEach(indicator => indicator.classList.remove('active')); // Removes 'active' class from all indicators so only the current one is 'active'
            indicators[index].classList.add('active'); // Add 'active' class to corresponding indicator


            // Update content based on current section
            updateContent(index);
        }
    });
});

// Handle indicator click
indicators.forEach(indicator => {
    // Runs action when indicator bubble is clicked
    indicator.addEventListener('click', () => {
        // Get section corresponding to clicked indicator
        const targetSection = document.querySelector(`#${indicator.dataset.section}`);

        // Scrolls to top of target section 
        // Added smooth animation
        container.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    });
});


// Fullscreen Navigation Menu Function
function toggleMenu() {
    // Get the fullscreen navigation menu & toggle its display prop
    const menu = document.getElementById('fullscreen-nav');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

// This code runs when the DOM has finished loading
document.addEventListener("DOMContentLoaded", function () {
    // Gets all elements with the class 'nav-link'
    const links = document.querySelectorAll('.nav-link');
    // Gets the current URL path
    const currentURL = window.location.pathname;

    // Loops through each 'nav-link' element
    links.forEach(link => {
        // Eval if the 'href' of each 'nav-link' element matches current URL path
        if (link.getAttribute('href') === currentURL) {
            // If so, add class 'active' to the element
            // This way class will be marked as active
            link.classList.add('active');
            link.setAttribute('aria-disabled', 'true');

            // Disable text selection & show as grey
            link.style.userSelect = 'none';
            link.style.color = 'grey';
        }
    });
});


/* CUSTOM CURSOR FUNCTIONS */
// Get cursor & hover elements from DOM
let innerCursor = document.querySelector('.inner-cursor');
let outerCursor = document.querySelector('.outer-cursor');
let hoverElements = document.querySelectorAll('.hoverMe');

// Create event listener for mouse movement
document.addEventListener('mousemove', moveCursor);

// Update position of inner n outer cursor based on mouse pos
function moveCursor(e) {
    // Get mouse pos
    let x = e.clientX;
    let y = e.clientY;

    // Update pos of inner cursor
    innerCursor.style.left = `${x}px`;
    innerCursor.style.top = `${y}px`;

    // Update pos of outer cursor
    outerCursor.style.left = `${x}px`;
    outerCursor.style.top = `${y}px`;
}

// For each element with class 'hoverMe', add event listeners
// to grow and shrink inner cursor on mouseover and leave
hoverElements.forEach(element => {
    element.style.cursor = 'none';

    // Add 'grow' class to inner cursor on mouse hover
    element.addEventListener('mouseover', () => {
        innerCursor.classList.add('grow');
    });
    // Remove 'grow' class from inner cursor on mouse leave so that cursor does not stay 'enlarged'
    element.addEventListener('mouseleave', () => {
        innerCursor.classList.remove('grow');
    });
});

// Remove custom cursor when mouse leaves viewport
document.addEventListener('mouseleave', () => {
    innerCursor.style.display = 'none';
    outerCursor.style.display = 'none';
});

document.addEventListener('mouseenter', () => {
    innerCursor.style.display = 'block';
    outerCursor.style.display = 'block';
});

window.addEventListener('load', () => {
    innerCursor.style.display = 'block';
    outerCursor.style.display = 'block';
});
