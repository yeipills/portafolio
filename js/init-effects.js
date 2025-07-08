/**
 * init-effects.js
 * Script para garantizar que los efectos visuales se inicialicen correctamente
 */

(function() {
    'use strict';
    
    window.effects = {
        matrix: null,
        formal: null,
        initialized: false
    };

    async function initializeVisualEffects() {
        console.log("⚡ Inicializando efectos visuales...");
        
        const isFormalTheme = document.body.classList.contains('formal-theme');
        console.log("📋 Tema detectado:", isFormalTheme ? "formal" : "matrix");

        try {
            // Limpiar efectos existentes
            await cleanupAllEffects();

            // Cargar módulos necesarios según el tema
            if (isFormalTheme) {
                await initializeFormalEffects();
            } else {
                await initializeMatrixEffects();
            }

            window.effects.initialized = true;
            console.log("✅ Efectos visuales inicializados correctamente");
        } catch (error) {
            console.error('❌ Error al inicializar efectos:', error);
            // Intentar recuperación
            try {
                const errorHandler = await import('./error-handler.js');
                errorHandler.default.handleEffectsError(error);
            } catch (handlerError) {
                console.error('❌ Error en el manejador de errores:', handlerError);
            }
        }
    }

    async function cleanupAllEffects() {
        console.log("🧹 Limpiando todos los efectos...");
        
        // Limpiar efectos Matrix
        if (window.MatrixGlitch && typeof window.MatrixGlitch.cleanup === 'function') {
            window.MatrixGlitch.cleanup();
        }
        
        // Limpiar efectos Formal
        if (window.FormalParticles && typeof window.FormalParticles.cleanup === 'function') {
            window.FormalParticles.cleanup();
        }
        
        // Limpiar contenedores
        const containers = ['matrix-canvas', 'formal-particles', 'page-matrix-glitch'];
        containers.forEach(containerId => {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = '';
                container.style.display = 'none';
            }
        });
        
        // Esperar un poco para asegurar que las animaciones se detengan
        await new Promise(resolve => setTimeout(resolve, 50));
    }

    async function initializeFormalEffects() {
        console.log("🔵 Inicializando efectos formales...");
        
        const particlesModule = await import('./formal-particles.js');
        window.FormalParticles = particlesModule.default;
        
        const container = document.getElementById('formal-particles');
        if (container) {
            container.style.display = 'block';
            window.FormalParticles.init(container, {}, true);
        }
    }

    async function initializeMatrixEffects() {
        console.log("🟢 Inicializando efectos Matrix...");
        
        const matrixModule = await import('./matrix-glitch.js');
        window.MatrixGlitch = matrixModule.default;
        
        const container = document.getElementById('page-matrix-glitch');
        if (container) {
            container.style.display = 'block';
            
            const options = {
                density: 0.1,
                speed: 2,
                maxLength: 30,
                colors: [
                    'rgba(0, 255, 70, 0.4)',
                    'rgba(0, 255, 0, 0.35)',
                    'rgba(50, 255, 50, 0.3)'
                ]
            };
            
            window.MatrixGlitch.init(container, options, true);
        }
    }

    // Inicializar cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', () => {
        // Wait for theme to be applied first
        setTimeout(initializeVisualEffects, 200);
    });

    // Reinicializar cuando cambie el tema
    document.addEventListener('themeChanged', () => {
        console.log("🔄 Cambio de tema detectado, reinicializando efectos...");
        setTimeout(initializeVisualEffects, 100);
    });

    // Exponer función para reinicio manual
    window.forceInitEffects = initializeVisualEffects;
})();
