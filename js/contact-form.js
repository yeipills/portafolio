/**
 * Funcionalidad del formulario de contacto
 * Simula envío mientras no hay backend configurado
 */

const contactForm = {
    init() {
        const form = document.getElementById('contact-form');
        const statusDiv = document.getElementById('form-status');
        
        if (form && statusDiv) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    },

    async handleSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const statusDiv = document.getElementById('form-status');
        const submitButton = form.querySelector('.form-button');
        
        // Obtener datos del formulario
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };
        
        // Validación básica
        if (!this.validateForm(data)) {
            this.showStatus('Por favor, completa todos los campos correctamente.', 'error');
            return;
        }
        
        // Mostrar estado de carga
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        this.showStatus('Enviando mensaje...', 'loading');
        
        try {
            // Simular envío (reemplazar con backend real)
            await this.simulateFormSubmission(data);
            
            // Éxito
            this.showStatus('¡Mensaje enviado correctamente! Te contactaré pronto.', 'success');
            form.reset();
            
            // Opcional: Enviar por email usando mailto como fallback
            this.openMailtoFallback(data);
            
        } catch (error) {
            console.error('Error al enviar formulario:', error);
            this.showStatus('Error al enviar el mensaje. Intenta nuevamente o contacta directamente por email.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar Mensaje';
        }
    },

    validateForm(data) {
        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        return (
            data.name && data.name.trim().length > 0 &&
            data.email && emailRegex.test(data.email) &&
            data.message && data.message.trim().length > 10
        );
    },

    async simulateFormSubmission(data) {
        // Simular delay de red
        return new Promise((resolve) => {
            setTimeout(() => {
                // Formulario simulado en desarrollo
                resolve();
            }, 2000);
        });
    },

    openMailtoFallback(data) {
        const subject = encodeURIComponent(`Contacto desde Portfolio - ${data.name}`);
        const body = encodeURIComponent(
            `Nombre: ${data.name}\n` +
            `Email: ${data.email}\n\n` +
            `Mensaje:\n${data.message}\n\n` +
            `---\n` +
            `Enviado desde: ${window.location.href}`
        );
        
        const mailtoUrl = `mailto:juanpablorosasmartin@gmail.com?subject=${subject}&body=${body}`;
        
        // Abrir cliente de email después de un pequeño delay
        setTimeout(() => {
            window.open(mailtoUrl, '_blank');
        }, 1000);
    },

    showStatus(message, type) {
        const statusDiv = document.getElementById('form-status');
        if (!statusDiv) return;
        
        statusDiv.className = `form-status ${type}`;
        statusDiv.textContent = message;
        statusDiv.classList.remove('hidden');
        
        // Auto-ocultar después de 8 segundos (excepto errores)
        if (type !== 'error') {
            setTimeout(() => {
                statusDiv.classList.add('hidden');
            }, 8000);
        }
    }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    contactForm.init();
});

export default contactForm; 