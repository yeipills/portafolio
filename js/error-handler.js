// Manejador global de errores para el portfolio
const ErrorHandler = {
    init() {
        // Capturar errores JavaScript no manejados
        window.addEventListener('error', (event) => {
            this.logError('JavaScript Error', {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                error: event.error
            });
        });

        // Capturar promesas rechazadas no manejadas
        window.addEventListener('unhandledrejection', (event) => {
            this.logError('Unhandled Promise Rejection', {
                reason: event.reason
            });
        });
    },

    logError(type, details) {
        // En desarrollo, mostrar errores en consola
        if (this.isDevelopment()) {
            console.error(`[${type}]`, details);
        }
        
        // En producci�n, enviar a servicio de logging (opcional)
        // this.sendToErrorService(type, details);
    },

    isDevelopment() {
        return location.hostname === 'localhost' || 
               location.hostname === '127.0.0.1' || 
               location.hostname.includes('local');
    },

    handleEffectsError(error) {
        this.logError('Effects Error', error);
        // Fallback: revertir a un estado sin efectos
        const containers = ['matrix-canvas', 'formal-particles', 'page-matrix-glitch'];
        containers.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.style.display = 'none';
            }
        });
    }
};

// Inicializar el manejador de errores
ErrorHandler.init();

export default ErrorHandler;