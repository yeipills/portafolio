// MatrixGlitch - Efecto de lluvia de caracteres (Matrix Rain)
const MatrixGlitch = {
  active: false,
  canvas: null,
  animationFrame: null,
  config: {},
  
  getRandomChar() {
    const chars = this.config.characters || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return chars[Math.floor(Math.random() * chars.length)];
  },
  
  getRandomColor() {
    const colors = this.config.colors || ['rgba(21, 255, 0, 0.15)'];
    return colors[Math.floor(Math.random() * colors.length)];
  },
  
  init(container, options = {}, forceInit = false) {
    // Solo verificar el tema si no es inicialización forzada
    if (!forceInit && document.body.classList.contains('formal-theme')) {
      console.log("Tema formal detectado, no inicializando MatrixGlitch");
      return;
    }
    
    // Si ya está activo, no inicializar de nuevo a menos que sea forzado
    if (this.active && this.canvas && !forceInit) {
      console.log("MatrixGlitch ya está activo, no inicializando de nuevo");
      return;
    }
    
    console.log("Inicializando MatrixGlitch...");
    
    const defaults = {
      characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]',
      // Colores más visibles con mejor transparencia
      colors: ['rgba(21, 255, 0, 0.6)', 'rgba(15, 157, 0, 0.5)', 'rgba(42, 255, 28, 0.55)'],
      // Densidad de caracteres (menor = más espacio entre ellos)
      density: 0.08,
      // Velocidad de caída base
      speed: 1.5,
      // Longitud máxima de las columnas
      maxLength: 20
    };
    
    const config = { ...defaults, ...options };
    const canvas = document.createElement('canvas');
    this.canvas = canvas;
    this.config = config;
    const ctx = canvas.getContext('2d');
    
    // Configurar canvas para cubrir toda la pantalla
    container.appendChild(canvas);
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.position = 'absolute';
    canvas.style.display = 'block'; // Asegurar que es visible
    this.resizeCanvas(canvas, container);
    
    // Crear gotas de lluvia
    const drops = [];
    this.initRainDrops(drops);
    
    this.active = true;
    
    // Animación
    const animate = () => {
      if (!this.active) return;
      
      // Limpieza con efecto de desvanecimiento más visible
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Dibujar y actualizar cada gota
      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        
        // Solo dibujar si la gota está activa
        if (drop.active) {
          // Recorrer cada caracter de la columna
          for (let j = 0; j < drop.chars.length; j++) {
            const char = drop.chars[j];
            
            // Variar ligeramente la opacidad según la posición
            // El primer caracter es más brillante, los siguientes son más tenues
            let opacity = j === 0 ? 1.0 : 0.6 - (j / drop.chars.length) * 0.3;
            
            // Dibujar el caracter
            ctx.font = `${drop.size}px monospace`;
            
            // El primer caracter es blanco/brillante
            if (j === 0) {
              ctx.fillStyle = 'rgba(255, 255, 255, ' + opacity + ')';
            } else {
              // Ajustar color con la opacidad calculada
              const color = drop.color.replace(/[\d.]+\)$/, opacity + ')');
              ctx.fillStyle = color;
            }
            
            // Posición Y = posición base menos el offset de cada caracter en la columna
            const y = drop.y - j * drop.size;
            
            // Solo dibujar si está dentro del canvas
            if (y > 0 && y < canvas.height) {
              ctx.fillText(char, drop.x, y);
            }
          }
          
          // Actualizar posición Y
          drop.y += drop.speed;
          
          // Actualizar caracteres con probabilidad aleatoria
          if (Math.random() < 0.05) {
            drop.chars[0] = this.getRandomChar();
          }
          
          // Si la primera posición sale de la pantalla, reiniciar la gota
          if (drop.y - (drop.chars.length * drop.size) > canvas.height) {
            // Reiniciar esta gota
            this.resetDrop(drop, canvas.width);
          }
        }
      }
      
      // Ajustar el número de gotas activas
      this.manageActiveDrops(drops, canvas.width);
      
      this.animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Manejar cambios de tamaño
    const resizeHandler = () => {
      if (this.active) {
        this.resizeCanvas(canvas, container);
        // Ajustar las gotas al nuevo tamaño
        this.resizeRainDrops(drops, canvas.width);
      }
    };
    window.addEventListener('resize', resizeHandler);
    
    // Guardar referencia para poder remover el listener
    this.listeners = this.listeners || [];
    this.listeners.push({
      element: window,
      event: 'resize',
      handler: resizeHandler
    });
    
    // Theme changes are now handled by theme.js
    // MutationObserver removed to prevent conflicts
    
    console.log("MatrixGlitch inicializado correctamente");
  },
  
  // Inicializar gotas de lluvia
  initRainDrops(drops) {
    const canvas = this.canvas;
    // Calcular el número de gotas basado en el ancho de la pantalla
    const numDrops = Math.floor(canvas.width * this.config.density);
    
    for (let i = 0; i < numDrops; i++) {
      drops.push(this.createDrop(canvas.width, canvas.height, true));
    }
  },
  
  // Crear una nueva gota
  createDrop(maxWidth, maxHeight, isInitial = false) {
    // Para la inicialización, distribuir las gotas por todo el canvas
    const y = isInitial ? Math.random() * maxHeight : 0;
    
    // Crear una columna de caracteres
    const length = 3 + Math.floor(Math.random() * this.config.maxLength);
    const chars = [];
    
    for (let i = 0; i < length; i++) {
      chars.push(this.getRandomChar());
    }
    
    return {
      x: Math.random() * maxWidth, // Posición X aleatoria
      y: y, // Posición Y
      chars: chars, // Caracteres en esta columna
      speed: 0.5 + Math.random() * this.config.speed, // Velocidad aleatoria
      color: this.getRandomColor(),
      size: 10 + Math.floor(Math.random() * 6), // Tamaño
      active: true // Si la gota está activa (visible)
    };
  },
  
  // Reiniciar una gota que ha salido de la pantalla
  resetDrop(drop, maxWidth) {
    drop.x = Math.random() * maxWidth;
    drop.y = 0;
    drop.speed = 0.5 + Math.random() * this.config.speed;
    drop.active = Math.random() < 0.8; // 80% probabilidad de estar activo
    
    // Actualizar caracteres
    const newLength = 3 + Math.floor(Math.random() * this.config.maxLength);
    drop.chars = [];
    for (let i = 0; i < newLength; i++) {
      drop.chars.push(this.getRandomChar());
    }
  },
  
  // Ajustar las gotas activas para mantener densidad constante
  manageActiveDrops(drops, maxWidth) {
    // Contar gotas activas
    let activeDrops = drops.filter(drop => drop.active).length;
    
    // Objetivo: mantener aproximadamente maxWidth * density gotas activas
    const targetActive = Math.floor(maxWidth * this.config.density);
    
    if (activeDrops < targetActive) {
      // Activar algunas gotas inactivas
      const inactiveDrops = drops.filter(drop => !drop.active);
      for (let i = 0; i < Math.min(targetActive - activeDrops, inactiveDrops.length); i++) {
        if (Math.random() < 0.1) { // Probabilidad baja para que no aparezcan todas a la vez
          inactiveDrops[i].active = true;
          this.resetDrop(inactiveDrops[i], maxWidth);
        }
      }
    }
  },
  
  // Ajustar las gotas cuando cambia el tamaño
  resizeRainDrops(drops, maxWidth) {
    // Ajustar posiciones X para que se mantengan dentro de la pantalla
    drops.forEach(drop => {
      if (drop.x > maxWidth) {
        drop.x = Math.random() * maxWidth;
      }
    });
    
    // Ajustar el número total de gotas si es necesario
    const targetDrops = Math.floor(maxWidth * this.config.density);
    
    if (drops.length < targetDrops) {
      // Añadir más gotas si la pantalla es más grande
      for (let i = drops.length; i < targetDrops; i++) {
        drops.push(this.createDrop(maxWidth, 0));
      }
    }
  },
  
  pause() {
    this.active = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.style.display = 'none';
    }
  },
  
  resume(container) {
    // Si estamos en tema formal, no reanudar
    if (document.body.classList.contains('formal-theme')) {
      console.log("Intento de reanudar MatrixGlitch en tema formal, ignorando");
      return;
    }
    
    console.log("Reanudando MatrixGlitch...");
    
    if (!this.canvas) {
      // Si no existe canvas, reinicializar
      console.log("Canvas no existe, reinicializando MatrixGlitch");
      this.init(container);
      return;
    }
    
    this.active = true;
    
    // Asegurar que el canvas es visible
    if (this.canvas.parentNode) {
      this.canvas.style.display = 'block';
      container.style.display = 'block';
    } else {
      // Si el canvas no está en el DOM, volver a añadirlo
      console.log("Canvas no está en el DOM, reinsertando");
      container.appendChild(this.canvas);
      this.canvas.style.display = 'block';
      container.style.display = 'block';
    }
    
    const ctx = this.canvas.getContext('2d');
    const drops = [];
    
    // Limpiar el canvas
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Reiniciar las gotas
    this.initRainDrops(drops);
    
    const animate = () => {
      if (!this.active) return;
      
      // Limpieza con efecto de desvanecimiento más visible
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Dibujar y actualizar cada gota
      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        
        if (drop.active) {
          // Lógica de dibujo igual que en init
          for (let j = 0; j < drop.chars.length; j++) {
            const char = drop.chars[j];
            let opacity = j === 0 ? 1.0 : 0.6 - (j / drop.chars.length) * 0.3;
            ctx.font = `${drop.size}px monospace`;
            
            if (j === 0) {
              ctx.fillStyle = 'rgba(255, 255, 255, ' + opacity + ')';
            } else {
              const color = drop.color.replace(/[\d.]+\)$/, opacity + ')');
              ctx.fillStyle = color;
            }
            
            const y = drop.y - j * drop.size;
            if (y > 0 && y < this.canvas.height) {
              ctx.fillText(char, drop.x, y);
            }
          }
          
          drop.y += drop.speed;
          
          if (Math.random() < 0.05) {
            drop.chars[0] = this.getRandomChar();
          }
          
          if (drop.y - (drop.chars.length * drop.size) > this.canvas.height) {
            this.resetDrop(drop, this.canvas.width);
          }
        }
      }
      
      this.manageActiveDrops(drops, this.canvas.width);
      this.animationFrame = requestAnimationFrame(animate);
    };
    
    // Cancelar cualquier animación anterior
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    
    // Iniciar nueva animación
    this.animationFrame = requestAnimationFrame(animate);
    
    console.log("MatrixGlitch reanudado correctamente");
  },
  
  resizeCanvas(canvas, container) {
    // Obtener el tamaño real del contenedor
    const rect = container.getBoundingClientRect();
    
    // Ajustar el tamaño del canvas con un factor de escala para mejor resolución
    const scale = window.devicePixelRatio || 1;
    canvas.width = rect.width * scale;
    canvas.height = rect.height * scale;
    
    // Escalar el contexto
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);
    
    // Ajustar el estilo CSS
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    
    // Limpiar el canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    console.log(`Canvas redimensionado a ${canvas.width}x${canvas.height} (scale: ${scale})`);
  },
  
  drawFrame(ctx, drops) {
    // Aplicar un efecto de desvanecimiento suave
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Configurar el estilo de texto
    ctx.font = '15px monospace';
    
    drops.forEach(drop => {
      // Seleccionar un color aleatorio
      ctx.fillStyle = this.config.colors[Math.floor(Math.random() * this.config.colors.length)];
      
      // Dibujar el carácter
      const char = this.config.characters[Math.floor(Math.random() * this.config.characters.length)];
      ctx.fillText(char, drop.x, drop.y);
      
      // Actualizar la posición
      drop.y += drop.speed * this.config.speed;
      
      // Reiniciar la gota si llega al final
      if (drop.y > this.canvas.height) {
        drop.y = 0;
        drop.speed = 1 + Math.random() * 2;
      }
    });
  },
  
  cleanup() {
    console.log("Limpiando efecto Matrix...");
    
    // Detener la animación
    this.active = false;
    
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    
    // Limpiar el canvas
    if (this.canvas) {
      const ctx = this.canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
      
      // Remover el canvas del DOM
      if (this.canvas.parentNode) {
        this.canvas.parentNode.removeChild(this.canvas);
      }
      
      this.canvas = null;
    }
    
    // Limpiar listeners
    const oldListeners = this.listeners || [];
    oldListeners.forEach(listener => {
      if (listener.element && listener.event && listener.handler) {
        listener.element.removeEventListener(listener.event, listener.handler);
      }
    });
    this.listeners = [];
    
    // Limpiar configuración
    this.config = {};
    
    console.log("Efecto Matrix limpiado correctamente");
  }
};

// Exportar el módulo inmediatamente
export default MatrixGlitch;

// Initialization is now handled by theme.js and init-effects.js
// Auto-initialization removed to prevent conflicts