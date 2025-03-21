










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

// Initially hide the custom cursor
innerCursor.style.display = 'none';
outerCursor.style.display = 'none';

// Create a flag to track if the cursor has moved
let cursorMoved = false;

// Event listener for mouse movement
document.addEventListener('mousemove', (e) => {
    // Show the custom cursor only after the first movement
    if (!cursorMoved) {
        innerCursor.style.display = 'block';
        outerCursor.style.display = 'block';
        cursorMoved = true; // Set the flag to true
    }

    // Update cursor positions
    let x = e.clientX;
    let y = e.clientY;

    innerCursor.style.left = `${x}px`;
    innerCursor.style.top = `${y}px`;

    outerCursor.style.left = `${x}px`;
    outerCursor.style.top = `${y}px`;
});

// For each element with class 'hoverMe', add event listeners
hoverElements.forEach(element => {
    element.style.cursor = 'none';

    // Add 'grow' class to inner cursor on mouse hover
    element.addEventListener('mouseover', () => {
        innerCursor.classList.add('grow');
    });

    // Remove 'grow' class from inner cursor on mouse leave
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
document.addEventListener('mouseenter', (e) => {
    // Show the custom cursor if the cursor is already in the frame
    innerCursor.style.display = 'block';
    outerCursor.style.display = 'block';

    // Update cursor positions immediately
    let x = e.clientX;
    let y = e.clientY;

    innerCursor.style.left = `${x}px`;
    innerCursor.style.top = `${y}px`;

    outerCursor.style.left = `${x}px`;
    outerCursor.style.top = `${y}px`;
});