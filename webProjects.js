const sections = document.querySelectorAll('.section');
const indicators = document.querySelectorAll('.indicator');
const container = document.querySelector('.container');

container.addEventListener('scroll', () => {
    const scrollPosition = container.scrollTop;

    sections.forEach((section, index) => {
        const sectionPosition = section.offsetTop;

        if (scrollPosition >= sectionPosition && scrollPosition < sectionPosition + section.clientHeight) {
            indicators.forEach(indicator => indicator.classList.remove('active'));
            indicators[index].classList.add('active');
        }
    });
});

indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
        const targetSection = document.querySelector(`#${indicator.dataset.section}`);

        container.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    });
});
