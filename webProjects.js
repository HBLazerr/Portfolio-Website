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
        duration: "1.5 WEEKS",
        year: "2024",
        description: "Here I will write and talk about the project like what it is and what it does. Lorem Ipsum to see how far it goes for now but not long otherwise lose attention.",
        url: "https://fair-game.org",
        dimmedColor: "rgba(0,0,0,.6)",
        fullColor: "rgba(0,0,0,1)",
        textColor: "green"
    },
    section2: {
        name: "Another Project",
        type: "MOBILE",
        tools: "REACT NATIVE",
        status: "IN PROGRESS",
        duration: "6 MONTHS",
        year: "2022",
        description: "Description for another project. Lorem Ipsum continues here.",
        url: "https://rogierdeboeve.com/spritexmarvel/",
        dimmedColor: "rgba(198,0,0,.6)",
        fullColor: "rgba(198,0,0,1)",
        textColor: "pink"
    },
    section3: {
        name: "Third Project",
        type: "DESKTOP",
        tools: "ELECTRON",
        status: "PLANNED",
        duration: "1 YEAR",
        year: "2023",
        description: "Details about the third project. Lorem Ipsum for placeholder.",
        url: "https://cssgridgenerator.io/",
        dimmedColor: "rgba(0,76,153,.6)",
        fullColor: "rgba(0,76,153,1)",
        textColor: "purple"
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
    document.documentElement.style.setProperty('--full-color', data.fullColor);

    // Update text color
    projectNameElement.style.color = data.textColor;
    projectDescElement.style.color = data.textColor;
    projectInfoElement.style.color = data.textColor;

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
