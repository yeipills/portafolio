// Configuración de Google Analytics
const analytics = {
    init() {
        // Verificar si hay un ID de Analytics configurado
        const GA_ID = window.GA_MEASUREMENT_ID || 'PLACEHOLDER';
        
        // Solo cargar Analytics si hay un ID real configurado
        if (GA_ID !== 'PLACEHOLDER' && GA_ID !== 'G-XXXXXXXXXX') {
            // Cargar Google Analytics
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
            document.head.appendChild(script);

            window.dataLayer = window.dataLayer || [];
            function gtag() {
                dataLayer.push(arguments);
            }
            window.gtag = gtag; // Hacer gtag global
            gtag('js', new Date());
            gtag('config', GA_ID);
            
            // Eventos personalizados solo si Analytics está activo
            this.setupEventTracking();
        } else {
            console.warn('Google Analytics no configurado. Para habilitar, define window.GA_MEASUREMENT_ID con tu ID real.');
        }
    },

    setupEventTracking() {
        // Seguimiento de cambios de tema
        document.addEventListener('themeChanged', (e) => {
            gtag('event', 'theme_change', {
                'theme': e.detail.theme
            });
        });

        // Seguimiento de navegación
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', (e) => {
                gtag('event', 'navigation', {
                    'section': e.target.getAttribute('href')
                });
            });
        });

        // Seguimiento de formulario de contacto
        const contactForm = document.querySelector('#contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                gtag('event', 'form_submit', {
                    'form_id': 'contact'
                });
            });
        }
    },

    // Método para rastrear eventos personalizados
    trackEvent(category, action, label) {
        if (typeof window.gtag !== 'undefined') {
            window.gtag('event', action, {
                'event_category': category,
                'event_label': label
            });
        }
    }
};

// Inicializar analytics cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    analytics.init();
}); 