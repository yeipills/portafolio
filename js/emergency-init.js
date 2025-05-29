/**
 * Script de inicialización de emergencia
 * Fuerza la inicialización de efectos visuales si no se han cargado correctamente
 */

// Inicialización de emergencia después de 3 segundos
window.addEventListener('load', function() {
    setTimeout(function() {
        const isFormalTheme = document.body.classList.contains('formal-theme');
        
        if (isFormalTheme) {
            // Forzar tema formal
            const formalParticles = document.getElementById('formal-particles');
            if (formalParticles && window.FormalParticles && typeof FormalParticles.init === 'function') {
                formalParticles.style.display = 'block';
                FormalParticles.init(formalParticles, {}, true);
            }
        } else {
            // Forzar tema matrix
            const matrixGlitch = document.getElementById('page-matrix-glitch');
            if (matrixGlitch && window.MatrixGlitch && typeof MatrixGlitch.init === 'function') {
                matrixGlitch.style.display = 'block';
                MatrixGlitch.init(matrixGlitch, {}, true);
            }
        }
        
        // Si existe la función global de inicialización, usarla también
        if (window.forceInitEffects && typeof window.forceInitEffects === 'function') {
            window.forceInitEffects();
        }
    }, 3000);
}); 