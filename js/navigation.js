import utils from './utils.js';
import config from './config.js';

const navigation = {
    init() {
        try {
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const sectionId = link.getAttribute('data-section');
                    if (!sectionId) return;
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    utils.scrollToSection(sectionId);
                });
            });
            window.addEventListener('scroll', utils.debounce(() => {
                this.highlightCurrentSection();
            }, 100));
            const exportPDF = document.getElementById('export-pdf');
            if (exportPDF) {
                // No necesita evento click
            }
        } catch (e) {
            utils.logError('Navigation Init', e);
        }
    },
    highlightCurrentSection() {
        try {
            const sections = [
                'profile-section',
                'skills-section',
                'experience-section',
                'projects-section',
                'education-section',
                'contact-section'
            ];
            const scrollPosition = window.scrollY + config.scrollOffset + 10;
            let currentSection = '';
            for (const sectionId of sections) {
                const section = document.getElementById(sectionId);
                if (!section) continue;
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    currentSection = sectionId.replace('-section', '');
                    break;
                }
            }
            if (!currentSection && scrollPosition < document.getElementById('profile-section').offsetTop) {
                currentSection = 'profile';
            }
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                if (link.getAttribute('data-section') === currentSection) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        } catch (e) {
            utils.logError('Highlight Section', e);
        }
    }
};

export default navigation; 