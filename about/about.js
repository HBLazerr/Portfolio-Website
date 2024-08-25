// Event listener thats triggered when the DOM finishs loading
// Attaches two event listeners to video
document.addEventListener("DOMContentLoaded", function () {
    // Gets video element & assigns it to a variable
    const video = document.querySelector('video');

    // Event listener for mouse entering/hovering over video
    video.addEventListener('mouseenter', function () {
        // If video not paused, unmute it
        if (!video.paused) {
            video.muted = false;
        } else {
            // Otherwise, play video and unmute
            video.play().then(() => {
                video.muted = false;
            });
        }
    });

    // Event listener for mouse leave/unhovering video
    video.addEventListener('mouseleave', function () {
        video.muted = true;
    });
});


// Event listener thats triggered when the DOM finishs loading
// Used to change icons in social grid (grid4)
document.addEventListener("DOMContentLoaded", function () {
    // Get the social icon & grid div elements
    const socialIcon = document.querySelector('.social-icon');
    const socialGrid = document.querySelector('.grid4');

    // Create array of social media icons
    const icons = [
        { iconClass: 'fab fa-github', link: 'https://github.com/HBLazerr' },
        { iconClass: 'fab fa-linkedin', link: 'www.linkedin.com/in/lazerr' },
        { iconClass: 'fab fa-instagram', link: 'https://www.instagram.com/lazerrbuilt' }
    ];
    // For changing icons - this is like a counter
    let index = 0; // set to zero for first icon


    // Change icons function
    function changeIcon() {
        // cycle through icons array
        index = (index + 1) % icons.length; // 0, 1, 2 then repeat

        socialIcon.className = `social-icon ${icons[index].iconClass}`; // Update icon's CLASS
        socialIcon.href = icons[index].link; // Update icon's LINK
    }

    // Set startinf icon
    socialIcon.className = `social-icon ${icons[0].iconClass}`;
    socialIcon.href = icons[0].link;

    // ELs for grid container - mouse enter/leave
    socialGrid.addEventListener('mouseenter', function () {
        socialGrid.timer = setInterval(changeIcon, 1500); // change icons every 1.5 secs
    });
    socialGrid.addEventListener('mouseleave', function () {
        clearInterval(socialGrid.timer); // STOP
        socialIcon.className = `social-icon ${icons[0].iconClass}`; // Reset to first icon (0 index)
        socialIcon.href = icons[0].link; // Reset link
    });
});

// List of project links - (from Meet Daniel Project)
const projects = [
    { name: 'Hearts Break Product Website', url: 'https://youtu.be/TxmiDwi8f_Q' },
    { name: 'Fair Game', url: 'https://fair-game.org' },
    { name: 'Rust Surveillance System', url: 'https://youtu.be/_MMuH-aQpq4' },
    { name: 'WeatherDAN Website', url: '/projects/webProjects.html' },
    { name: 'Meet Daniel', url: 'https://snack.expo.dev/@lazerr/meet-daniel' },
    { name: 'RiMo-Universe', url: 'https://snack.expo.dev/@lazerr/github.com-hblazerr-rimo-universe' },
    { name: 'Memory Lane', url: 'https://snack.expo.dev/@lazerr/memory-lane' },
    { name: 'POA Mobile App', url: 'https://snack.expo.dev/@lazerr/phantom-operations-agency' }
];

// Shuffles the array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Event listener for grid5 click
document.querySelector('.grid5').addEventListener('click', function () {
    shuffle(projects); // shuffles array
    // now set random project from shuffled array
    const randomProj = projects[0];

    // Get project link & assign to variable
    const projLink = document.getElementById('project-link');

    // Clear project link then set new link
    projLink.innerHTML = '';
    projLink.innerHTML = `<a href="${randomProj.url}" target="_blank" class="hoverMe">${randomProj.name}</a>`;
});


// Fullscreen Navigation Menu Function
function toggleMenu() {
    // Get fullscreen navigation menu & toggle its display prop
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
// Show custom cursor when mouse enters viewport
document.addEventListener('mouseenter', () => {
    innerCursor.style.display = 'block';
    outerCursor.style.display = 'block';
});


/* Remove custom cursor when mouse leaves iframe.
Adding this since custom cursor cannot be applied to iframes */

// Get iframe element
const iframe = document.querySelector('iframe');

// Hide cursor when mouse enters iframe
iframe.addEventListener('mouseover', () => {
    innerCursor.style.display = 'none';
    outerCursor.style.display = 'none';
});

// Show cursor when mouse leaves iframe
iframe.addEventListener('mouseleave', () => {
    innerCursor.style.display = 'block';
    outerCursor.style.display = 'block';
});
