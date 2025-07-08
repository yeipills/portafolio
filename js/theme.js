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
    
    applyThemeImmediate(themeName) {
        // Apply theme immediately without animation (for initial load)
        const body = document.body;
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
        
        // Guardar tema
        this.save(themeName);
        this.updateToggleText();
        
        // Emitir evento de cambio de tema
        const event = new CustomEvent('themeChanged', { 
            detail: { theme: themeName } 
        });
        document.dispatchEvent(event);
    },
    
    async applyTheme(themeName, immediate = false) {
        if (immediate) {
            this.applyThemeImmediate(themeName);
            return;
        }
        
        // Rest of the animated theme application
        await this.applyThemeWithTransition(themeName);
    },
    
    async applyThemeWithTransition(themeName) {
        // Preparar la transición - reducida para menos parpadeo
        const transitionDuration = 200; // ms
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
        
        // Limpiar efectos actuales ANTES de cambiar el tema
        await this.cleanupCurrentEffects();
        
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
        
        // Inicializar efectos del nuevo tema
        await this.initializeThemeEffects(themeName);
        
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
    
    async cleanupCurrentEffects() {
        console.log('🧹 Limpiando efectos actuales...');
        
        // Limpiar efectos Matrix
        if (window.MatrixGlitch && typeof window.MatrixGlitch.cleanup === 'function') {
            window.MatrixGlitch.cleanup();
        }
        
        // Limpiar efectos Formal
        if (window.FormalParticles && typeof window.FormalParticles.cleanup === 'function') {
            window.FormalParticles.cleanup();
        }
        
        // Limpiar contenedores más agresivamente
        const containers = ['matrix-canvas', 'formal-particles', 'page-matrix-glitch'];
        containers.forEach(containerId => {
            const container = document.getElementById(containerId);
            if (container) {
                // Cancelar cualquier animación activa
                const canvases = container.querySelectorAll('canvas');
                canvases.forEach(canvas => {
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                    }
                });
                
                // Limpiar completamente el contenedor
                container.innerHTML = '';
                container.style.display = 'none';
            }
        });
        
        // Tiempo reducido para minimizar parpadeo
        await new Promise(resolve => setTimeout(resolve, 30));
    },
    
    async initializeThemeEffects(themeName) {
        console.log(`🎨 Inicializando efectos para tema: ${themeName}`);
        
        try {
            if (themeName === 'formal') {
                // Importar y inicializar efectos formales
                const particlesModule = await import('./formal-particles.js');
                window.FormalParticles = particlesModule.default;
                
                const container = document.getElementById('formal-particles');
                if (container) {
                    container.style.display = 'block';
                    window.FormalParticles.init(container, {}, true);
                }
            } else {
                // Importar y inicializar efectos Matrix
                const matrixModule = await import('./matrix-glitch.js');
                window.MatrixGlitch = matrixModule.default;
                
                const container = document.getElementById('page-matrix-glitch');
                if (container) {
                    container.style.display = 'block';
                    window.MatrixGlitch.init(container, {
                        density: 0.1,
                        speed: 2,
                        maxLength: 30,
                        colors: [
                            'rgba(0, 255, 70, 0.7)',
                            'rgba(0, 255, 0, 0.6)',
                            'rgba(50, 255, 50, 0.65)'
                        ]
                    }, true);
                }
            }
            
            console.log(`✅ Efectos de tema ${themeName} inicializados correctamente`);
        } catch (error) {
            console.error(`❌ Error al inicializar efectos de tema ${themeName}:`, error);
        }
    },
    
    toggle() {
        const currentTheme = document.body.classList.contains('formal-theme') ? 'matrix' : 'formal';
        this.applyTheme(currentTheme);
    },
    
    init() {
        try {
            const savedTheme = this.getSaved();
            // Apply theme immediately on init to prevent flash
            this.applyTheme(savedTheme, true);
            
            // Configurar el botón de cambio de tema
            const themeToggle = document.getElementById('theme-toggle');
            if (themeToggle) {
                themeToggle.addEventListener('click', () => this.toggle());
            }
            
        } catch (error) {
            console.error('Error al inicializar el tema:', error);
            // Fallback al tema formal
            this.applyTheme('formal', true);
        }
    }
};

export default theme;