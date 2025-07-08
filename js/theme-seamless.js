// Parche para eliminación de parpadeo en cambio de temas
const seamlessTheme = {
    // Sobrescribir el método de transición para hacerlo instantáneo
    applyThemeSeamless(themeName) {
        const body = document.body;
        
        // Cambio instantáneo de tema
        body.classList.remove('formal-theme', 'matrix-theme');
        if (themeName === 'formal') {
            body.classList.add('formal-theme');
        } else {
            body.classList.add('matrix-theme');
        }
        
        // Actualizar texto del toggle
        if (window.theme && window.theme.updateToggleText) {
            window.theme.updateToggleText();
        }
        
        // Guardar preferencia
        if (window.theme && window.theme.save) {
            window.theme.save(themeName);
        }
        
        // Disparar evento personalizado
        const event = new CustomEvent('themeChanged', {
            detail: { theme: themeName }
        });
        document.dispatchEvent(event);
    }
};

// Sobrescribir el método de cambio de tema cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Remover event listeners anteriores
        themeToggle.replaceWith(themeToggle.cloneNode(true));
        const newThemeToggle = document.getElementById('theme-toggle');
        
        // Agregar nuevo event listener sin parpadeo
        newThemeToggle.addEventListener('click', () => {
            const isMatrix = document.body.classList.contains('matrix-theme');
            const newTheme = isMatrix ? 'formal' : 'matrix';
            seamlessTheme.applyThemeSeamless(newTheme);
        });
    }
});

export default seamlessTheme;