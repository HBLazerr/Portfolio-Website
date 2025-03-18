










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
            link.style.color = '#ebebeb';
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
