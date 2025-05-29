/**
 * Configuración global del portfolio
 */

const config = {
    // Estado de carga de efectos
    isMatrixLoaded: false,
    isFormalLoaded: false,
    
    // Configuración de rendimiento
    animationEnabled: true,
    lowPerformanceMode: false,
    
    // Configuración de temas
    defaultTheme: 'formal',
    themeTransitionDuration: 300,
    themes: ['matrix', 'formal'],
    
    // Configuración de efectos
    matrixEffect: {
        enabled: true,
        columns: 50,
        speed: 1
    },
    
    formalEffect: {
        enabled: true,
        nodeCount: 80,
        connectionDistance: 150
    },

    matrixDensity: window.innerWidth <= 768 ? 15 : 30,
    commandHistory: [],
    historyIndex: -1,
    konami: {
        sequence: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],
        position: 0,
        enabled: false
    },
    secretCommands: {
        'neo': true,
        'matrix': true,
        'hack': true
    },
    language: 'es',
    scrollOffset: 80
};

export default config; 