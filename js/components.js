/**
 * Componentes avanzados para Portfolio
 * Implementaciones en JavaScript puro
 */

// Detectar tema activo
const isThemeFormal = () => {
  return document.body.classList.contains('formal-theme');
};

// Acordeón para habilidades
const initAccordion = () => {
  // Inicializando acordeón...
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  // Encontrados elementos de acordeón
  
  if (accordionItems.length === 0) {
    // Accordion opcional - no mostrar warning
    return;
  }
  
  // Abrir el primer item por defecto en tema formal
  if (isThemeFormal()) {
    accordionItems[0].classList.add('active');
    // Primer acordeón activado para tema formal
  }
  
  accordionItems.forEach((item, index) => {
    const header = item.querySelector('.accordion-header');
    
    if (!header) {
      // Header no encontrado - accordion opcional
      return;
    }
    
    // Agregando event listener a acordeón
    
    header.addEventListener('click', () => {
      // Click en acordeón
      // Cerrar el acordeón si ya está activo (click para alternar)
      if (item.classList.contains('active')) {
        item.classList.remove('active');
        return;
      }
      
      // Cierra todos los otros items
      accordionItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Activar el item actual
      item.classList.add('active');
      
      // Asegurar visibilidad si el elemento está en la segunda fila
      setTimeout(() => {
        const rect = item.getBoundingClientRect();
        const isVisible = (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        
        if (!isVisible) {
          // Desplazar suavemente si no es visible
          item.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    });
  });
  
  // Observar cambios en el tema para actualizar componentes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class' && 
          mutation.target === document.body) {
        
        if (isThemeFormal()) {
          // Si cambia a tema formal, abrir el primer acordeón
          if (!accordionItems[0].classList.contains('active')) {
            accordionItems[0].classList.add('active');
          }
        }
      }
    });
  });
  
  observer.observe(document.body, { attributes: true });
};

// Formulario de contacto
const initContactForm = () => {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  
  if (!contactForm || !formStatus) return;
  
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Mostrar estado de carga
    formStatus.textContent = isThemeFormal() ? 
      'Enviando mensaje...' : 
      '> ENVIANDO MENSAJE...';
    
    formStatus.className = 'form-status';
    
    try {
      // Aquí usaríamos fetch para enviar el formulario a un servicio como Formspree
      // O incluso podríamos simular el envío para propósitos de demostración
      
      // Simulación de envío exitoso
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Éxito - Diferentes mensajes según el tema
      formStatus.textContent = isThemeFormal() ? 
        '¡Mensaje enviado con éxito!' : 
        '> MENSAJE ENVIADO CON ÉXITO';
      
      formStatus.className = 'form-status success';
      contactForm.reset();
      
      // Ocultar mensaje después de 5 segundos
      setTimeout(() => {
        formStatus.classList.add('hidden');
      }, 5000);
      
    } catch (error) {
      // Error - Diferentes mensajes según el tema
      formStatus.textContent = isThemeFormal() ? 
        'Error al enviar mensaje. Inténtalo de nuevo.' : 
        '> ERROR: NO SE PUDO ENVIAR EL MENSAJE';
      
      formStatus.className = 'form-status error';
    }
  });
};

// Navegación mejorada con efectos al scroll
const initEnhancedNavigation = () => {
  const nav = document.querySelector('.terminal-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  if (!nav || !navLinks.length) return;
  
  // Función para actualizar la navegación al hacer scroll
  function updateNav() {
    const scrollY = window.scrollY;
    
    // Cambiar estilo de navegación al scroll
    if (scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    // Note: Active section highlighting is now handled by navigation.js
    // This prevents conflicts between the two navigation systems
  }
  
  // Ejecutar al cargar y al hacer scroll
  updateNav();
  window.addEventListener('scroll', updateNav);
};

// Carrusel de tecnologías infinito mejorado
const initTechCarousel = () => {
  const carousel = document.querySelector('.tech-carousel');
  if (!carousel) return;

  // Verificar si ya está inicializado (evitar duplicados)
  if (carousel.dataset.initialized === 'true') return;

  // Obtener elementos originales antes de modificar
  const items = carousel.querySelectorAll('.tech-item');
  const itemsArray = Array.from(items);
  
  if (itemsArray.length === 0) return;
  
  // Duplicar elementos para scroll infinito (dos copias adicionales)
  for (let i = 0; i < 2; i++) {
    itemsArray.forEach(item => {
      const clone = item.cloneNode(true);
      carousel.appendChild(clone);
    });
  }
  
  // Marcar como inicializado
  carousel.dataset.initialized = 'true';
  
  // Configurar animación personalizada
  function setupInfiniteScroll() {
    // Calcular ancho real del primer conjunto de elementos
    let firstSetWidth = 0;
    for (let i = 0; i < itemsArray.length; i++) {
      const item = carousel.children[i];
      if (item) {
        firstSetWidth += item.offsetWidth + 30; // +30 para margin/padding
      }
    }
    
    // Si no se pudo calcular, usar estimación
    if (firstSetWidth === 0) {
      firstSetWidth = itemsArray.length * 150;
    }
    
    // Crear keyframes dinámicos
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes infiniteScrollTech {
        0% { transform: translateX(0); }
        100% { transform: translateX(-${firstSetWidth}px); }
      }
      
      .tech-carousel[data-initialized="true"] {
        animation: infiniteScrollTech ${isThemeFormal() ? '45s' : '30s'} linear infinite;
      }
      
      .tech-carousel[data-initialized="true"]:hover {
        animation-play-state: paused;
      }
    `;
    
    // Remover estilo anterior si existe
    const oldStyle = document.getElementById('carousel-style');
    if (oldStyle) oldStyle.remove();
    
    styleSheet.id = 'carousel-style';
    document.head.appendChild(styleSheet);
  }
  
  setupInfiniteScroll();
  
  // Observar cambios en el tema y reconfigurar
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class' && 
          mutation.target === document.body) {
        setupInfiniteScroll();
      }
    });
  });
  
  observer.observe(document.body, { attributes: true });
};

// Animación simple de barras de competencias
const initCompetenciesAnimation = () => {
  // Inicializando animación de competencias...
  
  const competencyItems = document.querySelectorAll('.competency-item');
  if (competencyItems.length === 0) {
    // Competencias no encontradas - opcional
    return;
  }

  // Intersection Observer para animar cuando entran en vista
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const item = entry.target;
        const barFill = item.querySelector('.bar-fill');
        
        // Animar la barra con delay
        setTimeout(() => {
          if (barFill) {
            const width = barFill.getAttribute('data-width');
            barFill.style.width = width;
          }
        }, index * 200);
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  competencyItems.forEach(item => {
    observer.observe(item);
  });

  // Animación de competencias inicializada
};

// Función para inicializar todos los componentes
function initializeComponents() {
  // Inicializando componentes...
  initAccordion();
  initContactForm();
  initEnhancedNavigation();
  initTechCarousel();
  initCompetenciesAnimation();
}

// Inicializar inmediatamente si el DOM ya está cargado
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeComponents);
} else {
  initializeComponents();
}

// También exportar para uso externo
export { initAccordion, initContactForm, initEnhancedNavigation, initTechCarousel, initCompetenciesAnimation }; 