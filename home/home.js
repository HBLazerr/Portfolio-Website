/* 
Parallax Effect
- Handles mousemove event on landing page */
document.addEventListener('mousemove', (e) => {
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
    const _depth = `${50 - (_mouseX - _w) * 0.05}% ${50 - (_mouseY - _h) * 0.05}%`;
    /* The further the mouse is from the center of the viewport, 
    the more the parallax element will move */

    // Translation values to px
    const x = `${(_mouseX - _w) * 0.02}px`;
    const y = `${(_mouseY - _h) * 0.02}px`;

    // Apply to parallax div and the body
    parallax.style.transform = `translate(${x}, ${y})`;
    body.style.backgroundPosition = _depth;
});



/* CUSTOM CURSOR FUNCTIONS */
// Get cursor & hover elements from DOM
let innerCursor = document.querySelector('.inner-cursor');
let outerCursor = document.querySelector('.outer-cursor');
let hoverMe = document.querySelector('.parallax');

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

// Add 'grow' class to inner cursor on mouse hover
// hoverMe = whichever element you want the cursor to expand on
hoverMe.addEventListener('mouseover', () => {
    innerCursor.classList.add('grow');
})
// Remove 'grow' class from inner cursor on mouse leave so that cursor does not stay 'enlarged'
hoverMe.addEventListener('mouseleave', () => {
    innerCursor.classList.remove('grow');
})
