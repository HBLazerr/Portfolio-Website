// Get all needed elements
const sections = document.querySelectorAll('.section');
const indicators = document.querySelectorAll('.indicator');
const container = document.querySelector('.container');

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
    viewButton.onclick = function() {
        window.open(data.url, '_blank');
    };
}


// Initialize content so first section shows on page load
updateContent(0);

// Handle scroll event
container.addEventListener('scroll', () => {
    const scrollPosition = container.scrollTop;

    sections.forEach((section, index) => {
        const sectionPosition = section.offsetTop;

        if (scrollPosition >= sectionPosition && scrollPosition < sectionPosition + section.clientHeight) {
            indicators.forEach(indicator => indicator.classList.remove('active'));
            indicators[index].classList.add('active');
            updateContent(index);
        }
    });
});

// Handle indicator click
indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
        const targetSection = document.querySelector(`#${indicator.dataset.section}`);

        container.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    });
});
