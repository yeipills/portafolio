import utils from './utils.js';
import config from './config.js';

const theme = {
    isStorageAvailable() {
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return true;
        } catch (e) {
            return false;
        }
    },
    
    getSaved() {
        if (this.isStorageAvailable()) {
            return localStorage.getItem('portfolioTheme') || 'formal';
        }
        return 'formal';
    },
    
    save(themeName) {
        if (this.isStorageAvailable()) {
            localStorage.setItem('portfolioTheme', themeName);
        }
    },
    
    updateToggleText() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.textContent = document.body.classList.contains('formal-theme') ? 'Matrix' : 'Formal';
        }
    },
    
    async applyTheme(themeName) {
        // Preparar la transición
        const transitionDuration = 600; // ms
        const body = document.body;
        
        // Crear un overlay para la transición suave
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: black;
            opacity: 0;
            transition: opacity ${transitionDuration}ms ease;
            z-index: 9999;
            pointer-events: none;
        `;
        body.appendChild(overlay);
        
        // Fade out
        await new Promise(resolve => {
            requestAnimationFrame(() => {
                overlay.style.opacity = '1';
                setTimeout(resolve, transitionDuration);
            });
        });
        
        // Aplicar el tema
        body.classList.remove('formal-theme', 'matrix-theme');
        if (themeName === 'formal') {
            body.classList.add('formal-theme');
        } else {
            body.classList.add('matrix-theme');
        }
        
        // Actualizar terminal si existe
        const terminalTitle = document.getElementById('terminal-title');
        if (terminalTitle) {
            terminalTitle.textContent = themeName === 'matrix' ? 
                'dev@matrix:~/portfolio' : 
                'dev@formal:~/portfolio';
        }
        
        // Reinicializar efectos
        if (window.forceInitEffects) {
            await window.forceInitEffects();
        }
        
        // Guardar tema
        this.save(themeName);
        this.updateToggleText();
        
        // Fade in
        await new Promise(resolve => {
            requestAnimationFrame(() => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.remove();
                    resolve();
                }, transitionDuration);
            });
        });
        
        // Emitir evento de cambio de tema
        const event = new CustomEvent('themeChanged', { 
            detail: { theme: themeName } 
        });
        document.dispatchEvent(event);
    },
    
    toggle() {
        const currentTheme = document.body.classList.contains('formal-theme') ? 'matrix' : 'formal';
        this.applyTheme(currentTheme);
    },
    
    init() {
        try {
            const savedTheme = this.getSaved();
            this.applyTheme(savedTheme);
            
            // Configurar el botón de cambio de tema
            const themeToggle = document.getElementById('theme-toggle');
            if (themeToggle) {
                themeToggle.addEventListener('click', () => this.toggle());
            }
            
        } catch (error) {
            console.error('Error al inicializar el tema:', error);
            // Fallback al tema formal
            this.applyTheme('formal');
        }
    }
};

export default theme;