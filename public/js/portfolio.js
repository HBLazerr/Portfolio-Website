// import external data
import { projectData } from "./projectData.js";

let currentProjectList = Object.values(projectData); // defaults to full list

// Get & assign all needed elements into variables
let sections = document.querySelectorAll('.section');
let indicators = document.querySelectorAll('.indicator');
const container = document.querySelector('.container');
const resetFiltersBtn = document.getElementById('reset-filters');
const centerNoResults = document.getElementById('center-no-results');

const nameElement = document.getElementById('name');
const typeElement = document.getElementById('type');
const toolsElement = document.getElementById('tools');
const objectivesElement = document.getElementById('objectives');
const durationElement = document.getElementById('duration');
const yearElement = document.getElementById('year');
const descriptionElement = document.getElementById('description');
const projectNameElement = document.querySelector('.project-name');
const projectDescElement = document.querySelector('.project-desc');
const projectInfoElement = document.querySelector('.project-info');
const viewButton = document.querySelector('.view-button');

// Modal DOM elements
const modal = document.getElementById('project-modal');
const modalName = document.getElementById('modal-name');
const modalRole = document.getElementById('modal-role');
const modalObjectives = document.getElementById('modal-objectives');
const modalImages = document.getElementById('modal-images');
const sourceBtn = document.getElementById('source-button');
const demoBtn = document.getElementById('demo-button');
const extrasBtn = document.getElementById('extras-button');


const selectedFilters = new Set();
const filterTiles = document.querySelectorAll('.filter-tile');
const filterToggle = document.getElementById('filter-toggle');
const filterPanel = document.getElementById('filter-panel');

//  Scroll + indicator behavior
function bindScrollAndIndicators() {
    container.onscroll = () => {
        const scrollPosition = container.scrollTop + container.clientHeight / 2;
        sections.forEach((section, index) => {
            const sectionPosition = section.offsetTop;
            if (scrollPosition >= sectionPosition && scrollPosition < sectionPosition + section.clientHeight) {
                indicators.forEach(ind => ind.classList.remove('active'));
                indicators[index].classList.add('active');
                updateContentFromProject(currentProjectList[index]);
            }
        });
    };

    indicators.forEach((indicator, index) => {
        indicator.onclick = () => {
            const targetSection = document.querySelector(`#${indicator.dataset.section}`);
            container.scrollTo({ top: targetSection.offsetTop, behavior: 'smooth' });
        };
    });
}

//  Filter application
function applyFilterByValue(filterValue) {
    selectedFilters.clear();
    filterTiles.forEach(tile => {
        let tileText = tile.textContent.trim().toLowerCase();
        tile.classList.remove('selected');

        let normalized = tileText.replace('obj.', 'obj').replace(/\s+/g, '');
        if (normalized === filterValue) {
            selectedFilters.add(normalized);
            tile.classList.add('selected');
        }
    });

    const filteredProjects = Object.values(projectData).filter(matchesFilters);
    rebuildSections(filteredProjects);

    if (selectedFilters.size > 0) {
        filterToggle.classList.add('active-filters');
    } else {
        filterToggle.classList.remove('active-filters');
    }
}

//  Handle tile clicks
filterTiles.forEach(tile => {
    tile.addEventListener('click', () => {
        let filterValue = tile.textContent.trim().toLowerCase();

        if (filterValue.startsWith('obj.')) {
            filterValue = filterValue.replace('obj.', 'obj').replace(/\s+/g, '');
        }

        tile.classList.toggle('selected');

        if (selectedFilters.has(filterValue)) {
            selectedFilters.delete(filterValue);
        } else {
            selectedFilters.add(filterValue);
        }

        const filteredProjects = Object.values(projectData).filter(matchesFilters);
        rebuildSections(filteredProjects);

        if (selectedFilters.size > 0) {
            filterToggle.classList.add('active-filters');
        } else {
            filterToggle.classList.remove('active-filters');
        }
    });
});

//  Apply initial filter if ?objective=3 is present
const params = new URLSearchParams(window.location.search);
const selectedObjective = params.get('objective');
const normalizedObjective = selectedObjective ? `obj${selectedObjective}` : null;

if (normalizedObjective) {
    applyFilterByValue(normalizedObjective);

    // Clean URL after using the param
    window.history.replaceState({}, document.title, window.location.pathname);
} else {
    rebuildSections(Object.values(projectData));
}

//  Content filler
function updateContentFromProject(project) {
    nameElement.textContent = project.name;
    typeElement.textContent = project.type;
    toolsElement.textContent = project.tools;
    objectivesElement.textContent = (project.objectives || [])
        .map(obj => obj.replace(/obj/i, '').padStart(2, '0'))
        .join(', ');

    durationElement.textContent = project.duration;
    yearElement.textContent = project.year;
    descriptionElement.textContent = project.description;

    document.documentElement.style.setProperty('--dimmed-color', project.dimmedColor);
    document.documentElement.style.setProperty('--full-color', project.mainColor);

    projectNameElement.style.color = project.mainColor;
    projectDescElement.style.color = project.mainColor;
    projectInfoElement.style.color = project.mainColor;

    viewButton.onclick = () => window.open(project.url, '_blank');
}

//  Reset filters
resetFiltersBtn.addEventListener('click', () => {
    selectedFilters.clear();
    filterTiles.forEach(tile => tile.classList.remove('selected'));
    rebuildSections(Object.values(projectData));
    centerNoResults.style.display = 'none';
    filterToggle.classList.remove('active-filters');
});

//  Matches filters
function matchesFilters(project) {
    if (selectedFilters.size === 0) return true;
    const projectTypes = [project.type.toLowerCase()];
    const projectObjectives = project.objectives?.map(obj => obj.toLowerCase()) || [];
    const projectAttributes = [...projectTypes, ...projectObjectives];
    return [...selectedFilters].some(filter => projectAttributes.includes(filter));
}


//  Rebuild sections after filter
function rebuildSections(filteredProjects) {
    container.innerHTML = '';
    document.querySelector('.carousel-indicator').innerHTML = '';

    if (filteredProjects.length === 0) {
        nameElement.textContent = '';
        typeElement.textContent = '';
        toolsElement.textContent = '';
        objectivesElement.textContent = '';
        durationElement.textContent = '';
        yearElement.textContent = '';
        descriptionElement.textContent = '';

        projectNameElement.classList.add('hidden');
        projectDescElement.classList.add('hidden');
        projectInfoElement.classList.add('hidden');
        document.querySelector('.project-button').classList.add('hidden');


        viewButton.onclick = null;
        centerNoResults.style.display = 'block';
        return;
    }

    currentProjectList = filteredProjects;

    projectNameElement.classList.remove('hidden');
    projectDescElement.classList.remove('hidden');
    projectInfoElement.classList.remove('hidden');
    document.querySelector('.project-button').classList.remove('hidden');
    centerNoResults.style.display = 'none';

    filteredProjects.forEach((project, i) => {
        const section = document.createElement('div');
        section.className = 'section';
        section.id = `section${i + 1}`;

        const content = document.createElement('div');
        content.className = 'content';

        const projectImage = document.createElement('div');
        projectImage.className = 'project-image ';
        projectImage.id = `proImg${i + 1}`;
        projectImage.style.background = project.gradient;

        const img = document.createElement('img');
        img.className = 'hoverMe';
        img.src = project.image;
        img.alt = project.name;


        img.addEventListener('click', () => {

            // Set basic info
            modalName.textContent = project.name;
            modalRole.textContent = project.role || 'Solo Developer';
            modalObjectives.textContent = (project.objectives || [])
                .map(obj => obj.replace(/obj/i, '').padStart(2, '0'))
                .join(', ');


            // Clear previous images
            modalImages.innerHTML = '';
            (project.screenshots || [project.image]).forEach(src => {
                const imgEl = document.createElement('img');
                imgEl.src = src;
                imgEl.alt = project.name;
                modalImages.appendChild(imgEl);
            });

            // Buttons
            sourceBtn.onclick = () => window.open(project.source || '#', '_blank');
            demoBtn.onclick = () => window.open(project.url || '#', '_blank');
            extrasBtn.onclick = () => window.open(project.extra || '#', '_blank');

            // Show the modal
            modal.classList.remove('hidden');
        });



        projectImage.appendChild(img);
        content.appendChild(projectImage);
        section.appendChild(content);
        container.appendChild(section);

        const indicator = document.createElement('div');
        indicator.className = 'indicator hoverMe';
        indicator.dataset.section = `section${i + 1}`;
        document.querySelector('.carousel-indicator').appendChild(indicator);
    });

    sections = document.querySelectorAll('.section');
    indicators = document.querySelectorAll('.indicator');
    bindScrollAndIndicators();

    container.scrollTo({ top: 0, behavior: 'auto' });

    updateContentFromProject(filteredProjects[0]);
    if (indicators[0]) indicators[0].classList.add('active');
}

//  Filter toggle
filterToggle.addEventListener('click', () => {
    const isPanelOpen = filterPanel.style.display === 'flex';
    filterPanel.style.display = isPanelOpen ? 'none' : 'flex';
    filterToggle.classList.toggle('active', !isPanelOpen);
});

//  Click outside to close panel
document.addEventListener('click', (event) => {
    const isClickInsidePanel = filterPanel.contains(event.target);
    const isClickOnToggle = filterToggle.contains(event.target);
    if (!isClickInsidePanel && !isClickOnToggle) {
        filterPanel.style.display = 'none';
        filterToggle.classList.remove('active');
    }
});



// Enable scroll from anywhere on the page when modal is hidden
window.addEventListener('wheel', (e) => {
    const modalIsHidden = modal.classList.contains('hidden');
    if (modalIsHidden) {
        e.preventDefault(); // stop default window scroll
        container.scrollBy({
            top: e.deltaY,
            behavior: 'auto'
        });
    }
}, { passive: false }); // passive false is needed to call preventDefault



// Modal 
// Close modal on click of X or outside
document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('project-modal').classList.add('hidden');
});

document.getElementById('project-modal').addEventListener('click', (e) => {
    if (e.target.id === 'project-modal') {
        e.target.classList.add('hidden');
    }
});



