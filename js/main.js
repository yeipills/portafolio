/**
 * Portfolio - Juan Pablo Rosas Martin
 * Script principal para interactividad y animaciones
 * Versión depurada con mejoras de rendimiento, accesibilidad y responsividad
 */

// Importar módulos refactorizados
import config from './config.js';
import utils from './utils.js';
import theme from './theme.js';
import language from './language.js';
import matrix from './matrix-background.js';
import terminal from './terminal.js';
import navigation from './navigation.js';
import ui from './ui.js';
import './init-effects.js';
import './components.js';

const PortfolioApp = (() => {
    const init = () => {
        try {
            theme.init();
            terminal.init();
            ui.init();
            language.init();
            navigation.init();
        } catch (e) {
            utils.logError('App Init', e);
            alert('Ha ocurrido un error al inicializar la aplicación. Intente recargar la página.');
        }
    };
    return { init };
})();

document.addEventListener('DOMContentLoaded', PortfolioApp.init);