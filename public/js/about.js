document.addEventListener("DOMContentLoaded", function () {
    // Attaches two event listeners to video
    // Gets video element & assigns it to a variable
    const video = document.querySelector('video');
    if (video) {
        // click to mute/unmute
        video.addEventListener('click', function () {
            if (video.muted) {
                video.muted = false;
            } else {
                video.muted = true;
            }
        });

    }

    // Used to change icons in social grid (grid4)
    // Get the social icon & grid div elements
    const socialIcon = document.querySelector('.social-icon');
    const socialGrid = document.querySelector('.grid4');

    if (socialIcon && socialGrid) {
        // Create array of social media icons
        const icons = [
            { iconClass: 'fab fa-github', link: 'https://github.com/HBLazerr' },
            { iconClass: 'fab fa-linkedin', link: 'https://www.linkedin.com/in/lazerr' },
            { iconClass: 'fab fa-instagram', link: 'https://www.instagram.com/lazerrbuilt' }
        ];

        // For changing icons - this is like a counter
        let index = 0; // set to zero for first icon

        // Change icons function
        // Change icons every 1.5 seconds
        setInterval(() => {
            index = (index + 1) % icons.length;
            socialIcon.className = `social-icon ${icons[index].iconClass}`;
            socialGrid.dataset.link = icons[index].link; // store current link
        }, 1500);

        // Set starting icon & link
        socialIcon.className = `social-icon ${icons[0].iconClass}`;
        socialGrid.dataset.link = icons[0].link;

        // Make entire grid clickable
        socialGrid.addEventListener('click', () => {
            window.open(socialGrid.dataset.link, '_blank');
        });
    }

    // List of project links - (from Meet Daniel Project)
    const projects = [
        { name: 'Hearts Break Product Website', url: 'https://youtu.be/TxmiDwi8f_Q' },
        { name: 'Fair Game', url: 'https://fair-game.org' },
        { name: 'Rust Surveillance System', url: 'https://youtu.be/_MMuH-aQpq4' },
        { name: 'WeatherDAN Website', url: '/pages/portfolio.html' },
        { name: 'Meet Daniel', url: 'https://snack.expo.dev/@lazerr/meet-daniel' },
        { name: 'RiMo-Universe', url: 'https://snack.expo.dev/@lazerr/github.com-hblazerr-rimo-universe' },
        { name: 'Memory Lane', url: 'https://snack.expo.dev/@lazerr/memory-lane' },
        { name: 'POA Mobile App', url: 'https://snack.expo.dev/@lazerr/phantom-operations-agency' }
    ];

    // Shuffle helper
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const grid5 = document.querySelector('.grid5');
    const projLink = document.getElementById('project-link');
    let lastProjectName = null; // store previously shown project

    if (grid5 && projLink) {
        grid5.addEventListener('click', function () {
            let newProject;

            // Loop until we get a new project (not the same as last)
            do {
                shuffle(projects);
                newProject = projects[0];
            } while (newProject.name === lastProjectName);

            lastProjectName = newProject.name;

            projLink.innerHTML = `<a href="${newProject.url}" target="_blank" class="hoverMe">${newProject.name}</a>`;
        });
    }

    // This code runs when the DOM has finished loading
    // Highlight current page nav link
    const links = document.querySelectorAll('.nav-link');
    const currentURL = window.location.pathname;

    links.forEach(link => {
        if (link.getAttribute('href') === currentURL) {
            link.classList.add('active');
            link.setAttribute('aria-disabled', 'true');
            link.style.userSelect = 'none';
            link.style.color = '#ebebeb';
        }
    });
});

// Fullscreen Navigation Menu Function
function toggleMenu() {
    const menu = document.getElementById('fullscreen-nav');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}
