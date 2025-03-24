import { bindHoverTargets } from "/src/js/customCursor.js";

export function injectNavbar() {
    fetch('/src/components/navbar.html')
        .then(res => {
            if (!res.ok) throw new Error(`Failed to fetch navbar.html: ${res.status}`);
            return res.text();
        })
        .then(html => {
            const container = document.getElementById('navbar-placeholder');
            container.innerHTML = html;

            requestAnimationFrame(() => {
                const currentURL = window.location.pathname;
                const links = document.querySelectorAll('.nav-link');

                // Highlight the current page link
                links.forEach(link => {
                    if (link.getAttribute('href') === currentURL) {
                        link.classList.add('active');
                        link.setAttribute('aria-disabled', 'true');
                        link.style.userSelect = 'none';
                        link.style.color = '#ebebeb';

                        // Remove hoverMe from only the current page's link
                        link.classList.remove('hoverMe');
                    }
                });

                // Bind hoverMe behavior to remaining elements
                bindHoverTargets();
            });
        })
        .catch(err => {
            console.error('[NAVBAR] Navbar fetch failed:', err);
        });
}

// Make toggleMenu available globally
window.toggleMenu = function () {
    const menu = document.getElementById('fullscreen-nav');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
};
