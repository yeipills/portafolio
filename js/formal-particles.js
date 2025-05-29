/**
 * FormalParticles - Efecto de red profesional para tema formal
 */

const FormalParticles = {
    active: false,
    canvas: null,
    ctx: null,
    nodes: [],
    mousePosition: { x: null, y: null },
    animationFrame: null,
    
    init(container, options = {}, forceInit = false) {
        if (!forceInit && !document.body.classList.contains('formal-theme')) {
            return;
        }
        
        if (this.active && this.canvas && !forceInit) {
            this.resume(container);
            return;
        }
        
        this.cleanup();
        
        const defaults = {
            nodeCount: 80,
            nodeTypes: [
                { size: 5, speed: 0.15, color: 'rgba(41, 128, 185, 1)' },
                { size: 4, speed: 0.2, color: 'rgba(52, 152, 219, 0.9)' },
                { size: 3, speed: 0.3, color: 'rgba(26, 82, 118, 0.8)' }
            ],
            connectionDistance: 180,
            connectionWidth: 1.5,
            connectionColor: 'rgba(41, 128, 185, 0.4)',
            baseSpeed: 0.15
        };
        
        this.config = { ...defaults, ...options };
        
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
            opacity: 0.8;
        `;
        
        if (container) {
            container.style.display = 'block';
            container.appendChild(this.canvas);
            this.resizeCanvas();
        }
        
        this.initNodes();
        this.setupEventListeners();
        this.active = true;
        this.animate();
        
        this.observeThemeChanges();
    },
    
    cleanup() {
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        this.removeEventListeners();
        
        this.canvas = null;
        this.ctx = null;
        this.nodes = [];
        this.active = false;
        this.mousePosition = { x: null, y: null };
    },
    
    setupEventListeners() {
        this.handleResize = this.handleResize.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        
        window.addEventListener('resize', this.handleResize);
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseleave', this.handleMouseLeave);
    },
    
    removeEventListeners() {
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseleave', this.handleMouseLeave);
    },
    
    initNodes() {
        const { width, height } = this.canvas;
        
        for (let i = 0; i < this.config.nodeCount; i++) {
            const type = this.config.nodeTypes[Math.floor(Math.random() * this.config.nodeTypes.length)];
            
            this.nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * type.speed * 2,
                vy: (Math.random() - 0.5) * type.speed * 2,
                radius: type.size,
                color: type.color,
                connections: []
            });
        }
    },
    
    animate() {
        if (!this.active) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.updateNodes();
        this.drawConnections();
        this.drawNodes();
        
        this.animationFrame = requestAnimationFrame(() => this.animate());
    },
    
    updateNodes() {
        const { width, height } = this.canvas;
        
        this.nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            if (node.x <= 0 || node.x >= width) node.vx *= -1;
            if (node.y <= 0 || node.y >= height) node.vy *= -1;
            
            node.x = Math.max(0, Math.min(width, node.x));
            node.y = Math.max(0, Math.min(height, node.y));
        });
        
        this.updateConnections();
    },
    
    updateConnections() {
        this.nodes.forEach(node => {
            node.connections = [];
            
            this.nodes.forEach(other => {
                if (node === other) return;
                
                const dx = other.x - node.x;
                const dy = other.y - node.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.config.connectionDistance) {
                    node.connections.push({
                        node: other,
                        opacity: 1 - (distance / this.config.connectionDistance)
                    });
                }
            });
        });
    },
    
    drawConnections() {
        this.nodes.forEach(node => {
            node.connections.forEach(connection => {
                const opacity = connection.opacity * 0.5;
                
                this.ctx.beginPath();
                this.ctx.moveTo(node.x, node.y);
                this.ctx.lineTo(connection.node.x, connection.node.y);
                this.ctx.strokeStyle = `rgba(41, 128, 185, ${opacity})`;
                this.ctx.lineWidth = this.config.connectionWidth;
                this.ctx.stroke();
            });
        });
    },
    
    drawNodes() {
        this.nodes.forEach(node => {
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = node.color;
            this.ctx.fill();
            
            // Añadir brillo
            this.ctx.beginPath();
            this.ctx.arc(node.x - node.radius * 0.3, node.y - node.radius * 0.3, node.radius * 0.4, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            this.ctx.fill();
        });
    },
    
    handleResize() {
        this.resizeCanvas();
    },
    
    handleMouseMove(e) {
        if (!this.canvas) return;
        const rect = this.canvas.getBoundingClientRect();
        this.mousePosition = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    },
    
    handleMouseLeave() {
        this.mousePosition = { x: null, y: null };
    },
    
    resizeCanvas() {
        if (!this.canvas || !this.canvas.parentNode) return;
        
        const rect = this.canvas.parentNode.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    },
    
    pause() {
        this.active = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    },
    
    resume(container) {
        if (!this.canvas && container) {
            this.init(container, this.config, true);
            return;
        }
        
        this.active = true;
        if (!this.animationFrame) {
            this.animate();
        }
    },
    
    observeThemeChanges() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class' && mutation.target === document.body) {
                    const isFormalTheme = document.body.classList.contains('formal-theme');
                    if (isFormalTheme && !this.active) {
                        this.resume(document.getElementById('formal-particles'));
                    } else if (!isFormalTheme && this.active) {
                        this.pause();
                    }
                }
            });
        });
        
        observer.observe(document.body, { attributes: true });
    }
};

export default FormalParticles;