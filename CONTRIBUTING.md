# Guía de Contribución

## 🚀 Cómo Contribuir

### 1. Configuración del Entorno
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/portafolio.git

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### 2. Estructura del Proyecto
```
portafolio/
├── css/
│   ├── styles.css          # Estilos principales
│   ├── components.css      # Componentes reutilizables
│   ├── formal-theme.css    # Tema formal
│   └── formal-theme-fixes.css  # Correcciones tema formal
├── js/
│   ├── config.js           # Configuración global
│   ├── theme.js            # Manejo de temas
│   ├── utils.js            # Utilidades
│   └── effects/            # Efectos visuales
├── img/                    # Imágenes y recursos
└── index.html             # Página principal
```

### 3. Convenciones de Código

#### CSS
- Usar variables CSS para colores y valores comunes
- Seguir BEM para nombres de clases
- Mantener especificidad baja
- Documentar componentes complejos

#### JavaScript
- Usar ES6+ features
- Mantener funciones pequeñas y enfocadas
- Documentar funciones con JSDoc
- Manejar errores apropiadamente

### 4. Proceso de Contribución

1. Crear una rama para tu feature
```bash
git checkout -b feature/nueva-caracteristica
```

2. Hacer cambios y commits
```bash
git add .
git commit -m "feat: descripción de cambios"
```

3. Push a tu rama
```bash
git push origin feature/nueva-caracteristica
```

4. Crear Pull Request

### 5. Guías de Estilo

#### Commits
- Usar prefijos: feat, fix, docs, style, refactor, test, chore
- Mantener mensajes concisos y descriptivos
- Referenciar issues cuando aplique

#### Código
- Mantener líneas bajo 80 caracteres
- Usar 2 espacios para indentación
- Agregar punto y coma al final de statements
- Usar comillas simples para strings

### 6. Testing

#### Pruebas Manuales
- Verificar en diferentes navegadores
- Probar en dispositivos móviles
- Verificar accesibilidad
- Comprobar rendimiento

#### Herramientas de Desarrollo
- Chrome DevTools
- Lighthouse
- WAVE (accesibilidad)
- PageSpeed Insights

### 7. Documentación

#### Código
- Documentar funciones complejas
- Explicar decisiones de diseño
- Mantener README actualizado
- Documentar APIs

#### Proyecto
- Mantener CHANGELOG
- Documentar configuración
- Explicar arquitectura
- Guías de usuario

### 8. Recursos

#### Herramientas
- VS Code
- Chrome DevTools
- Lighthouse
- WAVE

#### Referencias
- [MDN Web Docs](https://developer.mozilla.org)
- [CSS Tricks](https://css-tricks.com)
- [Web.dev](https://web.dev)

### 9. Contacto

Para preguntas o sugerencias:
- Abrir un issue
- Contactar al mantenedor
- Unirse al canal de Discord

### 10. Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](LICENSE) para más detalles. 