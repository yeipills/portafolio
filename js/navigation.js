import utils from './utils.js';
import config from './config.js';

const navigation = {
    init() {
        try {
            // Wait for DOM to be ready
            const initNavigation = () => {
                const navLinks = document.querySelectorAll('.nav-link');
                console.log(`Navigation: Found ${navLinks.length} navigation links`);
                
                navLinks.forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const sectionId = link.getAttribute('data-section');
                        console.log(`Navigation: Clicked link for section: ${sectionId}`);
                        
                        if (!sectionId) {
                            console.warn('Navigation: No section ID found for link');
                            return;
                        }
                        
                        // Remove active class from all links
                        navLinks.forEach(l => l.classList.remove('active'));
                        // Add active class to clicked link
                        link.classList.add('active');
                        
                        // Scroll to section
                        utils.scrollToSection(sectionId);
                    });
                });
                
                // Initialize scroll highlighting
                window.addEventListener('scroll', utils.debounce(() => {
                    this.highlightCurrentSection();
                }, 100));
                
                // Set initial active section
                this.highlightCurrentSection();
                
                const exportPDF = document.getElementById('export-pdf');
                if (exportPDF) {
                    // No necesita evento click
                }
            };
            
            // Initialize immediately if DOM is ready, otherwise wait
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initNavigation);
            } else {
                initNavigation();
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
                'leadership-section',
                'projects-section',
                'education-section',
                'contact-section'
            ];
            const scrollPosition = window.scrollY + config.scrollOffset + 10;
            let currentSection = '';
            
            // Find the current section more reliably
            for (const sectionId of sections) {
                const section = document.getElementById(sectionId);
                if (!section) continue;
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                // Check if we're in this section
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    currentSection = sectionId.replace('-section', '');
                    break;
                }
            }
            
            // Default to profile section if at top
            if (!currentSection) {
                const firstSection = document.getElementById('profile-section');
                if (firstSection && scrollPosition < firstSection.offsetTop + firstSection.offsetHeight) {
                    currentSection = 'profile';
                }
            }
            
            // Update navigation highlighting
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                const linkSection = link.getAttribute('data-section');
                if (linkSection === currentSection) {
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