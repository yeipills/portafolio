import utils from './utils.js';
import config from './config.js';

const ui = {
    init() {
        try {
            const backToTop = document.getElementById('back-to-top');
            if (backToTop) {
                window.addEventListener('scroll', utils.debounce(this.toggleBackToTop, 100));
                backToTop.addEventListener('click', () => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
                backToTop.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        e.preventDefault();
                    }
                });
            }
            const exportPDF = document.getElementById('export-pdf');
            if (exportPDF) {
                // Ya no necesita configuración adicional
            }
            this.createAccessibilityAnnouncer();
            this.setupProgressiveLoading();
            this.setupMobileOptimizations();
            this.handleOrientationChange();
        } catch (e) {
            utils.logError('UI Init', e);
        }
    },
    setupMobileOptimizations() {
        try {
            if (window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                const adjustHeight = () => {
                    const vh = window.innerHeight * 0.01;
                    document.documentElement.style.setProperty('--vh', `${vh}px`);
                };
                window.addEventListener('resize', utils.debounce(adjustHeight, 100));
                adjustHeight();
                document.body.classList.add('mobile-device');
            }
        } catch (e) {
            utils.logError('Mobile Optimizations', e);
        }
    },
    handleOrientationChange() {
        try {
            window.addEventListener('orientationchange', () => {
                setTimeout(() => {
                    if (config.isMatrixLoaded && !document.body.classList.contains('formal-theme')) {
                        import('./matrix-background.js').then(module => {
                            module.default.resize();
                        });
                    }
                    if (window.innerWidth <= 768) {
                        const vh = window.innerHeight * 0.01;
                        document.documentElement.style.setProperty('--vh', `${vh}px`);
                    }
                }, 300);
            });
        } catch (e) {
            utils.logError('Orientation Change', e);
        }
    },
    createAccessibilityAnnouncer() {
        try {
            if (!document.getElementById('a11y-announcer')) {
                const announcer = document.createElement('div');
                announcer.id = 'a11y-announcer';
                announcer.className = 'sr-only';
                announcer.setAttribute('aria-live', 'polite');
                document.body.appendChild(announcer);
            }
        } catch (e) {
            utils.logError('A11y Announcer', e);
        }
    },
    setupProgressiveLoading() {
        try {
            window.addEventListener('DOMContentLoaded', () => {
                document.body.classList.add('content-loaded');
                const announcer = document.getElementById('a11y-announcer');
                if (announcer) {
                    announcer.textContent = 'Portfolio cargado correctamente';
                }
                if (!utils.isLowPerformanceDevice() && !document.body.classList.contains('formal-theme')) {
                    setTimeout(() => {
                        if (!config.isMatrixLoaded) {
                            import('./matrix-background.js').then(module => {
                                module.default.init();
                                config.isMatrixLoaded = true;
                            });
                        }
                    }, 1000);
                }
            });
            window.addEventListener('load', () => {
                const loadingOverlay = document.getElementById('loading-overlay');
                if (loadingOverlay) {
                    loadingOverlay.style.opacity = '0';
                    setTimeout(() => {
                        loadingOverlay.style.display = 'none';
                    }, 500);
                }
            });
        } catch (e) {
            utils.logError('Progressive Loading', e);
            try {
                const loadingOverlay = document.getElementById('loading-overlay');
                if (loadingOverlay) {
                    loadingOverlay.style.display = 'none';
                }
            } catch (e2) {}
        }
    },
    toggleBackToTop() {
        try {
            const backToTop = document.getElementById('back-to-top');
            if (backToTop) {
                if (window.scrollY > 300) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            }
        } catch (e) {
            utils.logError('Toggle Back To Top', e);
        }
    }
};

export default ui; 