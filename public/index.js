import { innerCursor, outerCursor } from '../src/js/customCursor.js';

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
