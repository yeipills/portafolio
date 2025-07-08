# 🚀 Portfolio - Juan Pablo Rosas M.

[![Portfolio Status](https://img.shields.io/badge/Status-Live-brightgreen)](https://portfolio.yeipi.cl)
[![PWA](https://img.shields.io/badge/PWA-Ready-blue)](./manifest.json)
[![Accessibility](https://img.shields.io/badge/WCAG-AAA-green)](https://www.w3.org/WAI/WCAG2AAA-Conformance)

> Portfolio profesional interactivo con terminal funcional y efectos visuales Matrix/Formal

## 🎯 Descripción

Portfolio personal de **Juan Pablo Rosas Martin** (Yeipi), Ingeniero en Computación e Informática especializado en desarrollo web full-stack y ciberseguridad. Presenta una interfaz única tipo terminal con temática Matrix y modo profesional alternativo.

## ✨ Características Principales

### 🖥️ **Terminal Interactiva**
- Terminal completamente funcional con comandos personalizados
- Historial de comandos navegable (↑/↓)
- Autocompletado con Tab
- Comandos secretos desbloqueables con código Konami

### 🎨 **Sistema de Temas Dual**
- **Tema Matrix**: Estética cyberpunk con efectos visuales
- **Tema Formal**: Diseño profesional corporativo
- Transición fluida entre temas

### 🌐 **Características Técnicas**
- **PWA Completa**: Funciona offline, instalable
- **Responsive Design**: Optimizado para todos los dispositivos
- **Accesibilidad WCAG AAA**: Navegación por teclado, lectores de pantalla
- **SEO Optimizado**: Meta tags, datos estructurados JSON-LD
- **Multiidioma**: Español/Inglés

### 🎮 **Funcionalidades Interactivas**
- Código Konami secreto: `↑↑↓↓←→←→ba`
- Comandos ocultos: `neo`, `matrix`, `hack`
- Efectos visuales sincronizados
- Formulario de contacto funcional

## 🛠️ Stack Tecnológico

- **Frontend**: HTML5, CSS3, JavaScript ES6+ (Vanilla)
- **Arquitectura**: Modular con ES6 modules
- **PWA**: Service Worker, Manifest, Cache API
- **Efectos**: Canvas, CSS Animations, Web APIs
- **Accesibilidad**: ARIA, Semantic HTML, Focus Management

## 📋 Comandos Disponibles

### Comandos Básicos
```bash
help        # Muestra la ayuda
about       # Información personal
skills      # Habilidades técnicas
projects    # Proyectos destacados
experience  # Experiencia laboral
education   # Formación académica
contact     # Datos de contacto
clear       # Limpia la terminal
theme       # Cambia entre temas Matrix/Formal
idioma      # Cambia idioma ES/EN
pdf         # Descarga CV en PDF
print       # Versión imprimible
```

### Comandos Secretos (Código Konami)
```bash
neo         # Efecto Matrix especial
matrix      # Lluvia de código intensiva
hack        # Simulación de hackeo
```

## 🚀 Instalación y Uso

### Desarrollo Local
```bash
# Clonar repositorio
git clone https://github.com/yeipills/portafolio.git
cd portafolio

# Servir archivos (requiere servidor HTTP)
python -m http.server 8000
# o
npx serve .
# o
live-server

# Acceder a http://localhost:8000
```

### Producción
- Subir archivos a servidor web
- Configurar HTTPS (requerido para PWA)
- Asegurar que el Service Worker esté registrado

## 📱 PWA Features

- **Instalable**: Se puede instalar como app nativa
- **Offline**: Funciona sin conexión
- **Shortcuts**: Accesos directos a secciones
- **Responsive**: Adaptado a cualquier pantalla

## 🎨 Temas

### Matrix Theme
- Fondo animado tipo Matrix
- Efectos de glitch y escaneo
- Paleta verde neón
- Tipografía monoespaciada

### Formal Theme
- Diseño profesional limpio
- Partículas de red animadas
- Paleta azul corporativa
- Layout estructurado

## 🔒 Seguridad

- Content Security Policy implementada
- Headers de seguridad configurados
- Validación de formularios
- Protección XSS y clickjacking

## 📊 Performance

- Carga progresiva de recursos
- Optimización para dispositivos móviles
- Detección de rendimiento automática
- Lazy loading de efectos visuales

## 🧪 Testing

Para probar las funcionalidades:

1. **Terminal**: Escribe `help` para ver comandos
2. **Konami**: Secuencia `↑↑↓↓←→←→ba` (en el teclado)
3. **Temas**: Botón "Tema" en la navegación
4. **Responsive**: Redimensiona la ventana
5. **PWA**: Instalar desde el navegador

## 📁 Estructura del Proyecto

```
portafolio/
├── index.html              # Página principal
├── manifest.json           # PWA manifest
├── README.md              # Documentación
├── css/
│   ├── styles.css         # Estilos principales
│   ├── components.css     # Componentes específicos
│   └── formal-theme.css   # Tema formal
├── js/
│   ├── main.js           # Script principal
│   ├── terminal.js       # Terminal interactiva
│   ├── theme.js          # Sistema de temas
│   ├── matrix-glitch.js  # Efectos Matrix
│   ├── formal-particles.js # Efectos formales
│   ├── language.js       # Multiidioma
│   ├── navigation.js     # Navegación
│   ├── ui.js            # Interfaz de usuario
│   ├── utils.js         # Utilidades
│   ├── config.js        # Configuración
│   └── sw.js            # Service Worker
├── img/
│   ├── profile.jpg       # Foto de perfil
│   ├── favicon.ico       # Favicon
│   └── icons/           # Iconos PWA
└── cv/
    └── juan_pablo_rosas_cv.pdf # CV en PDF
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la [MIT License](LICENSE).

## 📧 Contacto

**Juan Pablo Rosas Martin (Yeipi)**
- Email: juanpablorosasmartin@gmail.com
- GitHub: [@yeipills](https://github.com/yeipills)
- LinkedIn: [juan-pablo-rosas-martin](https://linkedin.com/in/juan-pablo-rosas-martin)
- Portfolio: [portfolio.yeipi.cl](https://portfolio.yeipi.cl)

---

⭐ **¡No olvides dar una estrella si te gustó el proyecto!** ⭐

## 🔄 Changelog

### v1.0.0 (2024)
- ✅ Terminal interactiva completa
- ✅ Sistema de temas dual
- ✅ PWA implementada
- ✅ Accesibilidad WCAG AAA
- ✅ Comandos secretos Konami
- ✅ Multiidioma ES/EN
- ✅ Responsive design
- ✅ Efectos visuales avanzados

---

*Portfolio desarrollado con 💚 y mucho ☕ en Concepción, Chile* 