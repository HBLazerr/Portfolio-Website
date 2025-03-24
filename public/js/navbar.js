import { bindHoverTargets } from "../js/customCursor.js";

export function injectNavbar() {
    fetch('../components/navbar.html')
        .then(res => {
            if (!res.ok) throw new Error(`Failed to fetch navbar.html: ${res.status}`);
            return res.text();
        })
        .then(html => {
            const container = document.getElementById('navbar-placeholder');
            container.innerHTML = html;

            requestAnimationFrame(() => {
                const currentURL = window.location.pathname;
                const currentPage = currentURL.split('/').pop(); // get just 'about.html', etc.
                const links = document.querySelectorAll('.nav-link');

                links.forEach(link => {
                    const linkHref = link.getAttribute('href').split('/').pop();

                    if (linkHref === currentPage) {
                        link.classList.add('active');
                        link.setAttribute('aria-disabled', 'true');
                        link.style.userSelect = 'none';
                        link.style.color = '#ebebeb';
                        link.classList.remove('hoverMe'); // remove hover effect for current page
                    }
                });

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
