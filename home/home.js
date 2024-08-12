/* 
Parallax Effect
- Handles mousemove event on landing page */
document.addEventListener('mousemove', (e) => {
    // Get 'parallax' & body elements from the DOM
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
