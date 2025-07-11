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
            const targetElementId = sectionId + '-section';
            const section = document.getElementById(targetElementId);
            
            if (!section) {
                console.warn(`Section ${targetElementId} not found`);
                // Try alternative approach - scroll to element with href
                const altTarget = document.querySelector(`#${sectionId}`);
                if (altTarget) {
                    altTarget.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                return;
            }
            
            // Use offsetTop for more reliable positioning
            const offsetTop = section.offsetTop;
            const targetPosition = offsetTop - config.scrollOffset;
            
            console.log(`Scrolling to section: ${sectionId}, target: ${targetElementId}, position: ${targetPosition}`);
            
            // Ensure smooth scrolling works
            try {
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            } catch (scrollError) {
                console.warn('Smooth scroll failed, using fallback:', scrollError);
                window.scrollTo(0, Math.max(0, targetPosition));
            }
            
            // Fallback for browsers that don't support smooth scroll
            if (!window.CSS || !window.CSS.supports('scroll-behavior', 'smooth')) {
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 500; // 500ms
                let start = null;
                
                const step = (timestamp) => {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const scrollY = startPosition + (distance * (progress / duration));
                    
                    window.scrollTo(0, scrollY);
                    
                    if (progress < duration) {
                        requestAnimationFrame(step);
                    }
                };
                
                requestAnimationFrame(step);
            }
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