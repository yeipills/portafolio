import config from './config.js';

const utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    isLowPerformanceDevice() {
        // Detectar dispositivos de bajo rendimiento
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isLowEnd = navigator.hardwareConcurrency <= 4;
        return isMobile || isLowEnd;
    },
    downloadCV() {
        try {
            const notification = document.createElement('div');
            notification.className = 'pdf-notification';
            notification.innerHTML = 'Descargando CV...';
            document.body.appendChild(notification);
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 1500);
        } catch (e) {
            utils.logError('Download CV', e);
        }
    },
    scrollToSection(sectionId) {
        try {
            const section = document.getElementById(sectionId + '-section');
            if (!section) {
                console.warn(`Section ${sectionId}-section not found`);
                return;
            }
            const offsetTop = section.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: offsetTop - config.scrollOffset,
                behavior: 'smooth'
            });
        } catch (e) {
            utils.logError('Scroll To Section', e);
        }
    },
    checkBrowserSupport() {
        return {
            localStorage: typeof localStorage !== 'undefined',
            sessionStorage: typeof sessionStorage !== 'undefined',
            webGL: this.checkWebGLSupport()
        };
    },
    checkWebGLSupport() {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && 
                (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    },
    logError(context, error) {
        console.error(`[${context}] Error:`, error);
        // Aquí podrías agregar lógica para enviar errores a un servicio de monitoreo
    }
};

export default utils; 