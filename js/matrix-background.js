import utils from './utils.js';
import config from './config.js';

const matrix = {
    canvas: null,
    ctx: null,
    drops: [],
    symbols: [],
    fontSize: 14,
    initialized: false,

    init() {
        if (document.body.classList.contains('formal-theme')) {
            return;
        }

        const container = document.getElementById('matrix-canvas');
        if (!container) return;

        // Limpiar contenedor existente
        container.innerHTML = '';
        
        // Crear canvas
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        container.appendChild(this.canvas);
        
        // Configurar canvas
        this.resize();
        
        // Generar símbolos Matrix (combinación de katakana y números)
        this.generateSymbols();
        
        // Inicializar gotas
        this.initDrops();
        
        // Event listeners
        window.addEventListener('resize', () => this.resize());
        
        // Iniciar animación
        this.initialized = true;
        this.animate();
        
        // Mostrar canvas
        this.canvas.style.display = 'block';
    },

    generateSymbols() {
        // Mezcla de caracteres katakana y números
        const katakana = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';
        const numbers = '0123456789';
        const chars = katakana + numbers;
        this.symbols = chars.split('');
    },

    initDrops() {
        this.drops = [];
        const columns = Math.floor(this.canvas.width / this.fontSize);
        
        for (let i = 0; i < columns; i++) {
            this.drops[i] = {
                x: i * this.fontSize,
                y: Math.random() * -100,
                speed: Math.random() * 0.5 + 0.5,
                lastUpdate: 0,
                chars: []
            };
            
            // Generar caracteres iniciales para esta columna
            const length = Math.floor(Math.random() * 15) + 10;
            for (let j = 0; j < length; j++) {
                this.drops[i].chars.push({
                    value: this.symbols[Math.floor(Math.random() * this.symbols.length)],
                    brightness: j === 0 ? 1 : Math.random() * 0.3 + 0.1
                });
            }
        }
    },

    resize() {
        if (!this.canvas) return;
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Reinicializar gotas con nuevo tamaño
        this.initDrops();
        
        // Configurar contexto
        this.ctx.font = this.fontSize + 'px monospace';
    },

    animate() {
        if (!this.initialized || document.body.classList.contains('formal-theme')) {
            return;
        }

        // Limpiar canvas con un poco de opacidad para crear estela
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Actualizar y dibujar cada columna
        this.drops.forEach(drop => {
            // Actualizar posición
            drop.y += drop.speed;

            // Dibujar caracteres
            drop.chars.forEach((char, index) => {
                const y = drop.y - (index * this.fontSize);
                
                // Solo dibujar si está en pantalla
                if (y > -this.fontSize && y < this.canvas.height) {
                    // Color base verde Matrix con brillo variable
                    const alpha = char.brightness;
                    this.ctx.fillStyle = `rgba(20, 255, 0, ${alpha})`;
                    
                    // Dibujar carácter
                    this.ctx.fillText(char.value, drop.x, y);
                    
                    // Cambiar aleatoriamente algunos caracteres
                    if (Math.random() < 0.02) {
                        char.value = this.symbols[Math.floor(Math.random() * this.symbols.length)];
                    }
                }
            });

            // Reiniciar columna si sale de la pantalla
            if (drop.y - (drop.chars.length * this.fontSize) > this.canvas.height) {
                drop.y = Math.random() * -100;
                drop.speed = Math.random() * 0.5 + 0.5;
            }
        });

        // Continuar animación
        requestAnimationFrame(() => this.animate());
    }
};

export default matrix;