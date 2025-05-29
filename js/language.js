import utils from './utils.js';
import config from './config.js';

const language = {
    isStorageAvailable() {
        return utils.checkBrowserSupport().localStorage;
    },
    getSaved() {
        if (this.isStorageAvailable()) {
            return localStorage.getItem('portfolioLanguage') || 'es';
        }
        return 'es';
    },
    save(languageCode) {
        if (this.isStorageAvailable()) {
            try {
                localStorage.setItem('portfolioLanguage', languageCode);
                config.language = languageCode;
            } catch (e) {
                utils.logError('Language Save', e);
            }
        }
    },
    init() {
        try {
            const savedLanguage = this.getSaved();
            config.language = savedLanguage;
            if (savedLanguage === 'en') {
                this.applyTranslations();
            }
            const languageToggle = document.getElementById('language-toggle');
            if (languageToggle) {
                languageToggle.addEventListener('click', () => this.toggle());
                languageToggle.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        this.toggle();
                        e.preventDefault();
                    }
                });
                this.updateToggleText();
            }
        } catch (e) {
            utils.logError('Language Init', e);
        }
    },
    updateToggleText() {
        try {
            const languageToggle = document.getElementById('language-toggle');
            if (languageToggle) {
                languageToggle.textContent = config.language === 'es' ? 'ES | EN' : 'EN | ES';
                const newLang = config.language === 'es' ? 'inglés' : 'español';
                languageToggle.setAttribute('aria-label', `Cambiar idioma a ${newLang}`);
            }
        } catch (e) {
            utils.logError('Language Toggle Text', e);
        }
    },
    toggle() {
        try {
            // Aplicar efecto de transición suave al body en lugar de buscar un elemento específico
            document.body.classList.add('language-transition');
            
            setTimeout(() => {
                try {
                    const newLanguage = config.language === 'es' ? 'en' : 'es';
                    config.language = newLanguage;
                    this.save(newLanguage);
                    if (newLanguage === 'en') {
                        this.applyTranslations();
                    } else {
                        this.revertToSpanish();
                    }
                    this.updateToggleText();
                    const announcer = document.getElementById('a11y-announcer');
                    if (announcer) {
                        const message = newLanguage === 'es' ? 'Idioma cambiado a español' : 'Language changed to English';
                        announcer.textContent = message;
                    }
                } catch (e) {
                    utils.logError('Language Toggle Inner', e);
                }
                setTimeout(() => {
                    document.body.classList.remove('language-transition');
                }, 300);
            }, 300);
        } catch (e) {
            utils.logError('Language Toggle', e);
        }
    },
    applyTranslations() {
        try {
            document.querySelector('#terminal-title').textContent = document.body.classList.contains('formal-theme') ? 
                'Juan Pablo Rosas - Professional Portfolio' : 'dev@matrix:~/portfolio';
            this.translateElement('#access', '// ACCESS GRANTED');
            this.translateElement('#profile', '// PROFESSIONAL PROFILE');
            this.translateElement('#competencies', '// PROFESSIONAL COMPETENCIES');
            this.translateElement('#skills', '// TECHNICAL SKILLS');
            this.translateElement('#experience', '// PROFESSIONAL EXPERIENCE');
            this.translateElement('#projects', '// FEATURED PROJECTS');
            this.translateElement('#education', '// EDUCATION');
            this.translateElement('#contact', '// CONTACT');
            const navLinks = document.querySelectorAll('.nav-link');
            const navTranslations = {
                'profile': 'Profile',
                'skills': 'Skills',
                'experience': 'Experience',
                'projects': 'Projects',
                'education': 'Education',
                'contact': 'Contact'
            };
            navLinks.forEach(link => {
                const section = link.getAttribute('data-section');
                if (section && navTranslations[section]) {
                    link.textContent = navTranslations[section];
                }
            });
            const introElement = document.querySelector('#introduction');
            if (introElement) {
                introElement.innerHTML = `
                    <p>Welcome to Juan Pablo Rosas Martin's portfolio, Computer and Information Engineer.</p>
                    <p>Specialized in full-stack web development and cybersecurity.</p>
                    <p>Location: Concepción, Chile | Status: Available for hire</p>
                `;
            }
            const profileContent = document.querySelector('.profile-content');
            if (profileContent) {
                profileContent.innerHTML = `
                    <p>Computer and Information Engineer specialized in full-stack web development and cybersecurity.</p>
                    <p>Experience creating innovative technological solutions in academic and professional environments.</p>
                    <p>Renowned for working in multidisciplinary teams, effective technical communication, and quick adaptation to new technologies.</p>
                `;
            }
            const competencies = document.querySelectorAll('.competency');
            const competencyTranslations = [
                'Analytical problem solving',
                'Technical team leadership',
                'Effective technical communication',
                'Technological adaptability',
                'Project management',
                'Process automation'
            ];
            competencies.forEach((comp, index) => {
                if (competencyTranslations[index]) {
                    comp.textContent = competencyTranslations[index];
                }
            });
            const statusMessage = document.querySelector('.status-message');
            if (statusMessage) {
                statusMessage.textContent = '[STATUS: AVAILABLE FOR JOB OPPORTUNITIES]';
            }
            const terminalInput = document.getElementById('terminal-input');
            if (terminalInput) {
                terminalInput.placeholder = "Type 'help' to see available commands...";
                terminalInput.setAttribute('aria-label', "Interactive terminal. Type help to see available commands.");
            }
            
            if (window.terminal && typeof window.terminal.updateCommandsLanguage === 'function') {
                window.terminal.updateCommandsLanguage('en');
            }
        } catch (e) {
            utils.logError('Apply Translations', e);
        }
    },
    revertToSpanish() {
        try {
            // Revertir traducciones manualmente a español
            document.querySelector('#terminal-title').textContent = document.body.classList.contains('formal-theme') ? 
                'Juan Pablo Rosas - Portfolio Profesional' : 'dev@matrix:~/portfolio';
            this.translateElement('#access', '// ACCESO CONCEDIDO');
            this.translateElement('#profile', '// PERFIL PROFESIONAL');
            this.translateElement('#competencies', '// COMPETENCIAS PROFESIONALES');
            this.translateElement('#skills', '// HABILIDADES TÉCNICAS');
            this.translateElement('#experience', '// EXPERIENCIA PROFESIONAL');
            this.translateElement('#projects', '// PROYECTOS DESTACADOS');
            this.translateElement('#education', '// EDUCACIÓN');
            this.translateElement('#contact', '// CONTACTO');
            
            // Revertir navegación
            const navLinks = document.querySelectorAll('.nav-link');
            const navTranslations = {
                'profile': 'Perfil',
                'skills': 'Habilidades',
                'experience': 'Experiencia',
                'projects': 'Proyectos',
                'education': 'Educación',
                'contact': 'Contacto'
            };
            navLinks.forEach(link => {
                const section = link.getAttribute('data-section');
                if (section && navTranslations[section]) {
                    link.textContent = navTranslations[section];
                }
            });
            
            // Revertir introducción
            const introElement = document.querySelector('#introduction');
            if (introElement) {
                introElement.innerHTML = `
                    <p>Bienvenido al portfolio de <span class="shiny-text">Juan Pablo Rosas Martin</span>, Ingeniero en Computación e Informática.</p>
                    <p>Especializado en desarrollo web full-stack y ciberseguridad.</p>
                    <p>Localización: Concepción, Chile | Estado: Disponible para contratación</p>
                `;
            }
            
            // Revertir perfil
            const profileContent = document.querySelector('.profile-content');
            if (profileContent) {
                profileContent.innerHTML = `
                    <p>Ingeniero en Computación e Informática especializado en desarrollo web full-stack y ciberseguridad.</p>
                    <p>Experiencia creando soluciones tecnológicas innovadoras en entornos académicos y profesionales.</p>
                    <p>Destacado por trabajo en equipos multidisciplinarios, comunicación técnica efectiva y adaptación rápida a nuevas tecnologías.</p>
                `;
            }
            
            // Actualizar atributos de idioma
            document.documentElement.lang = 'es';
            document.querySelector('meta[property="og:title"]')?.setAttribute('content', 'Juan Pablo Rosas M. - Portfolio Profesional');
            document.querySelector('meta[property="og:description"]')?.setAttribute('content', 'Ingeniero en Computación e Informática especializado en desarrollo web full-stack y ciberseguridad');
            
        } catch (e) {
            utils.logError('Revert To Spanish', e);
        }
    },
    translateElement(selector, text) {
        const element = document.querySelector(selector);
        if (element) {
            element.textContent = text;
        }
    }
};

export default language; 