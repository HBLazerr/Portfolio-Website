export let innerCursor, outerCursor;

export function initCustomCursor() {
    // CUSTOM CURSOR FUNCTIONS
    // Get cursor & hover elements from DOM
    innerCursor = document.querySelector('.inner-cursor');
    outerCursor = document.querySelector('.outer-cursor');
    const hoverElements = document.querySelectorAll('.hoverMe');

    if (!innerCursor || !outerCursor) return;

    // Initially hide the custom cursor
    innerCursor.style.visibility = 'hidden'; // hide
    outerCursor.style.visibility = 'hidden'; // hide

    // Create flag to track if cursor has moved
    let cursorMoved = false;

    // Function to update cursor position
    // Just need to update x and y pos
    function updateCursorPosition(x, y) {
        innerCursor.style.left = `${x}px`; // x pos
        innerCursor.style.top = `${y}px`; // y pos
        outerCursor.style.left = `${x}px`; // x pos
        outerCursor.style.top = `${y}px`; // y pos
    }

    // Function to show the custom cursor
    function showCursor() {
        innerCursor.style.visibility = 'visible'; // show
        outerCursor.style.visibility = 'visible'; // show
    }

    // Function to hide the custom cursor
    function hideCursor() {
        innerCursor.style.visibility = 'hidden'; // hide
        outerCursor.style.visibility = 'hidden'; // hide
    }

    // Add event listener for mouse move
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX; // x pos
        const y = e.clientY; // y pos

        // Update pos of the cursor
        updateCursorPosition(x, y);

        // If the cursor has not moved yet, show it
        if (!cursorMoved) {
            showCursor(); // show
            cursorMoved = true; // set flag
        }
    });

    // Add event listeners to each element with class 'hoverMe'
    hoverElements.forEach(element => {
        // Set cursor to none so the custom cursor is the only one
        element.style.cursor = 'none'; // none

        // Add 'grow' class to inner cursor on mouse hover
        element.addEventListener('mouseenter', () => {
            innerCursor.classList.add('grow'); // grow
        });

        // Remove 'grow' class from inner cursor on mouse leave
        element.addEventListener('mouseleave', () => {
            innerCursor.classList.remove('grow'); // remove
        });
    });

    // Hide custom cursor when mouse leaves viewport
    document.addEventListener('mouseleave', hideCursor); // hide

    // Show custom cursor when mouse enters viewport
    document.addEventListener('mouseenter', (e) => {
        // Update cursor position
        const x = e.clientX; // x pos
        const y = e.clientY; // y pos
        updateCursorPosition(x, y);
        showCursor(); // show
    });

    // Show custom cursor when window is focused
    window.addEventListener('focus', showCursor); // show
}

// Extra function to bind hoverMe behavior to dynamically loaded elements
export function bindHoverTargets() {
    const newHoverElements = document.querySelectorAll('.hoverMe');
    console.log('[CURSOR] bindHoverTargets() found:', newHoverElements.length, 'hoverMe elements');

    newHoverElements.forEach(element => {
        element.style.cursor = 'none'; // none

        element.addEventListener('mouseenter', () => {
            innerCursor.classList.add('grow'); // grow
        });

        element.addEventListener('mouseleave', () => {
            innerCursor.classList.remove('grow'); // remove
        });
    });
}

// Watch for hoverMe elements being added later (like from navbar injection)
export function observeHoverMeInjection() {
    const observer = new MutationObserver(() => {
        const newHoverElements = document.querySelectorAll('.hoverMe');
        console.log('[OBSERVER] Checking for .hoverMe — found:', newHoverElements.length);

        if (newHoverElements.length > 0) {
            bindHoverTargets(); // finally bind
            observer.disconnect(); // stop watching after it's done
        }
    });

    // Watch changes to the navbar container
    const target = document.getElementById('navbar-placeholder');
    if (target) {
        observer.observe(target, { childList: true, subtree: true });
    }
}
