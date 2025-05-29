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
            const formalParticles = document.getElementById('formal-particles');
            const matrixCanvas = document.getElementById('matrix-canvas');

            if (formalParticles) {
                if (window.FormalParticles && typeof FormalParticles.cleanup === 'function') {
                    FormalParticles.cleanup();
                }
                formalParticles.innerHTML = '';
            }
            
            if (matrixCanvas) {
                if (window.MatrixGlitch && typeof MatrixGlitch.cleanup === 'function') {
                    MatrixGlitch.cleanup();
                }
                matrixCanvas.innerHTML = '';
            }

            // Cargar módulos necesarios según el tema
            if (isFormalTheme) {
                const particlesModule = await import('./formal-particles.js');
                window.FormalParticles = particlesModule.default;
                
                if (formalParticles) {
                    console.log("🔵 Inicializando partículas formales");
                    formalParticles.style.display = 'block';
                    if (matrixCanvas) matrixCanvas.style.display = 'none';
                    
                    particlesModule.default.init(formalParticles);
                }
            } else {
                const glitchModule = await import('./matrix-glitch.js');
                
                // Debug: verificar qué se importó
                console.log("📦 Matrix module imported:", glitchModule);
                console.log("🎯 default export:", glitchModule.default);
                console.log("🔍 available exports:", Object.keys(glitchModule));
                
                // Intentar usar el default, o buscar MatrixGlitch directamente
                const MatrixGlitch = glitchModule.default || glitchModule.MatrixGlitch || window.MatrixGlitch;
                
                if (!MatrixGlitch) {
                    throw new Error('No se pudo encontrar MatrixGlitch en el módulo importado');
                }
                
                window.MatrixGlitch = MatrixGlitch;
                
                if (matrixCanvas) {
                    console.log("🟢 Inicializando efecto Matrix");
                    matrixCanvas.style.display = 'block';
                    if (formalParticles) formalParticles.style.display = 'none';
                    
                    const options = {
                        density: 0.1, // Aumentada para más caracteres
                        speed: 2, // Un poco más rápido
                        maxLength: 30, // Columnas más largas
                        colors: [
                            'rgba(0, 255, 70, 0.4)',
                            'rgba(0, 255, 0, 0.35)',
                            'rgba(50, 255, 50, 0.3)'
                        ]
                    };
                    
                    MatrixGlitch.init(matrixCanvas, options);
                }
            }

            window.effects.initialized = true;
            console.log("✅ Efectos visuales inicializados correctamente");
        } catch (error) {
            console.error('❌ Error al inicializar efectos:', error);
            // Intentar recuperación
            const errorHandler = await import('./error-handler.js');
            errorHandler.default.handleEffectsError(error);
        }
    }

    // Inicializar cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initializeVisualEffects, 100);
    });

    // Reinicializar cuando cambie el tema
    document.body.addEventListener('classChange', () => {
        console.log("🔄 Cambio de tema detectado, reinicializando efectos...");
        initializeVisualEffects();
    });

    // Exponer función para reinicio manual
    window.forceInitEffects = initializeVisualEffects;
})();
