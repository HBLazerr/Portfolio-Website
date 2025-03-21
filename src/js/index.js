/* 
Parallax Effect
- Handles mousemove event on landing page */
document.addEventListener('mousemove', (e) => {
    innerCursor.style.display = 'block';
    outerCursor.style.display = 'block';

    // Get 'parallax' & body elements from DOM
    const parallax = document.querySelector('.parallax');
    const body = document.body;

    // Set half width & height of the window
    const _w = window.innerWidth / 2;
    const _h = window.innerHeight / 2;

    // Get x & y coords of mouse relative to the viewport
    const _mouseX = e.clientX;
    const _mouseY = e.clientY;

    // Depth of parallax element calculation
    const _depthX = (_mouseX - _w) * 0.05;
    const _depthY = (_mouseY - _h) * 0.05;

    // Adjust background position dynamically, starting slightly above the bottom
    const verticalOffset = -400; // Increase this value to move the image further up
    const _depth = `calc(50% + ${_depthX}px) calc(100% - ${verticalOffset}px + ${_depthY}px)`;

    // Translation values to px for the parallax element
    const x = `${_depthX * 0.4}px`;
    const y = `${_depthY * 0.4}px`;

    // Apply to parallax div and the body
    parallax.style.transform = `translate(${x}, ${y})`;
    body.style.backgroundPosition = _depth;
});

// Set initial background position slightly above the bottom
const initialVerticalOffset = -400; // Match this value to the offset above
document.body.style.backgroundPosition = `center calc(100% - ${initialVerticalOffset}px)`;


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