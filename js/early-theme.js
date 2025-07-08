/**
 * Early theme initialization to prevent flash
 * This script runs immediately to set the correct theme before visual effects load
 */

(function() {
    'use strict';
    
    function getSavedTheme() {
        try {
            return localStorage.getItem('portfolioTheme') || 'formal';
        } catch (e) {
            return 'formal';
        }
    }
    
    function applyThemeImmediate(themeName) {
        const body = document.body;
        if (!body) return;
        
        // Remove existing theme classes
        body.classList.remove('formal-theme', 'matrix-theme');
        
        // Apply new theme
        if (themeName === 'formal') {
            body.classList.add('formal-theme');
        } else {
            body.classList.add('matrix-theme');
        }
        
        // Update terminal title if it exists
        const terminalTitle = document.getElementById('terminal-title');
        if (terminalTitle) {
            terminalTitle.textContent = themeName === 'matrix' ? 
                'dev@matrix:~/portfolio' : 
                'dev@formal:~/portfolio';
        }
    }
    
    // Apply theme as soon as possible
    document.addEventListener('DOMContentLoaded', function() {
        const savedTheme = getSavedTheme();
        applyThemeImmediate(savedTheme);
    });
    
    // Also try to apply immediately if DOM is already loaded
    if (document.readyState === 'loading') {
        // DOM is still loading, wait for DOMContentLoaded
    } else {
        // DOM is already loaded
        const savedTheme = getSavedTheme();
        applyThemeImmediate(savedTheme);
    }
})();