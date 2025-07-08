# 🧪 Testing Guide

Guía completa para testing del portfolio de Juan Pablo Rosas Martin.

## 📋 Tipos de testing

### 1. **Testing manual**

#### **Funcionalidad básica:**
- [ ] Página carga correctamente
- [ ] Ambos temas (Matrix/Formal) funcionan
- [ ] Cambio de idioma (ES/EN) funciona
- [ ] Botón de descarga CV funciona
- [ ] Formulario de contacto funciona
- [ ] Terminal interactivo responde

#### **Responsive design:**
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Mobile landscape (667x375)

#### **Navegadores:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### 2. **Testing de accesibilidad**

#### **Navegación por teclado:**
```bash
# Pruebas a realizar:
Tab     → Navegar entre elementos
Enter   → Activar botones/enlaces
Space   → Activar checkboxes
Esc     → Cerrar modales
Arrow   → Navegar en terminal
```

#### **Screen readers:**
- [ ] NVDA (Windows)
- [ ] JAWS (Windows)
- [ ] VoiceOver (macOS)
- [ ] TalkBack (Android)

### 3. **Testing de performance**

#### **Lighthouse audit:**
```bash
# Ejecutar en DevTools
# Resultados esperados:
Performance:  >90
Accessibility: >95
Best Practices: >90
SEO: >95
PWA: >90
```

#### **Core Web Vitals:**
- **LCP** (Largest Contentful Paint): <2.5s
- **FID** (First Input Delay): <100ms
- **CLS** (Cumulative Layout Shift): <0.1

### 4. **Testing de PWA**

#### **Service Worker:**
```javascript
// Verificar en DevTools → Application → Service Workers
// Estado: Activated and running
// Eventos: install, activate, fetch
```

#### **Manifest:**
```json
// Verificar en DevTools → Application → Manifest
// Todos los campos deben estar presentes
// Íconos en todas las resoluciones
```

#### **Install prompt:**
- [ ] Aparece en Chrome/Edge
- [ ] Funciona en móvil
- [ ] App se instala correctamente

### 5. **Testing de seguridad**

#### **Headers de seguridad:**
```bash
curl -I https://portfolio.yeipi.cl

# Verificar presencia de:
# Content-Security-Policy
# X-Content-Type-Options: nosniff
# X-Frame-Options: DENY
# X-XSS-Protection: 1; mode=block
```

#### **SSL/TLS:**
```bash
# Verificar certificado SSL
openssl s_client -connect portfolio.yeipi.cl:443 -servername portfolio.yeipi.cl

# Verificar grade SSL
# https://www.ssllabs.com/ssltest/
```

## 🔧 Herramientas de testing

### **Testing automatizado:**

#### **Lighthouse CI:**
```bash
npm install -g @lhci/cli
lhci autorun --upload.target=temporary-public-storage
```

#### **Pa11y (Accessibility):**
```bash
npm install -g pa11y
pa11y https://portfolio.yeipi.cl
```

#### **WebPageTest:**
```bash
# https://www.webpagetest.org/
# Configurar para multiple locations
```

### **Testing de carga:**

#### **Herramientas:**
- **GTmetrix**: https://gtmetrix.com/
- **Pingdom**: https://tools.pingdom.com/
- **PageSpeed Insights**: https://pagespeed.web.dev/

#### **Métricas objetivo:**
- **Time to First Byte**: <200ms
- **First Contentful Paint**: <1.5s
- **Speed Index**: <3.0s
- **Total Blocking Time**: <200ms

## 📱 Testing específico

### **Terminal interactivo:**

#### **Comandos básicos:**
```bash
help        # Mostrar ayuda
about       # Información personal
skills      # Habilidades técnicas
experience  # Experiencia laboral
projects    # Proyectos principales
education   # Educación
contact     # Información de contacto
clear       # Limpiar terminal
theme       # Cambiar tema
lang        # Cambiar idioma
```

#### **Comandos secretos:**
```bash
matrix      # Efecto Matrix
konami      # Código Konami
hack        # Efecto hacker
neo         # Referencia Matrix
```

#### **Funcionalidad avanzada:**
- [ ] Historial con flechas ↑↓
- [ ] Autocompletado con Tab
- [ ] Scroll automático
- [ ] Colores por tema

### **Temas duales:**

#### **Tema Matrix:**
- [ ] Fondo animado Matrix
- [ ] Colores verdes neón
- [ ] Efectos de texto
- [ ] ASCII art apropiado

#### **Tema Formal:**
- [ ] Fondo de partículas
- [ ] Colores azules profesionales
- [ ] Diseño corporativo
- [ ] Tipografía clara

### **Formulario de contacto:**

#### **Validaciones:**
- [ ] Nombre requerido
- [ ] Email válido requerido
- [ ] Mensaje mínimo 10 caracteres
- [ ] Botón se deshabilita durante envío

#### **Funcionalidad:**
- [ ] Simulación de envío
- [ ] Feedback visual
- [ ] Fallback a mailto
- [ ] Limpieza después del envío

## 📊 Checklist de testing completo

### **Pre-deployment:**
- [ ] Todos los tests manuales pasan
- [ ] Lighthouse score >90 en todas las métricas
- [ ] Tests de accesibilidad pasan
- [ ] PWA completamente funcional
- [ ] Cross-browser testing completo

### **Post-deployment:**
- [ ] Sitio accesible en producción
- [ ] DNS configurado correctamente
- [ ] SSL/TLS funcionando
- [ ] Service Worker registrado
- [ ] Analytics configurado (opcional)

### **Testing continuo:**
- [ ] Monitoreo de uptime
- [ ] Alertas de performance
- [ ] Revisión mensual de métricas
- [ ] Updates de seguridad

## 🐛 Reporte de bugs

### **Formato de reporte:**

```markdown
**Bug title:** Descripción breve del problema

**Environment:**
- Browser: Chrome 120.0.0.0
- OS: Windows 11
- Device: Desktop
- Screen: 1920x1080

**Steps to reproduce:**
1. Navegar a https://portfolio.yeipi.cl
2. Cambiar a tema Matrix
3. Abrir terminal
4. Ejecutar comando 'help'

**Expected behavior:**
El comando debería mostrar la lista de ayuda

**Actual behavior:**
El terminal no responde

**Screenshots:**
[Adjuntar capturas de pantalla]

**Additional info:**
Console errors, network issues, etc.
```

### **Severity levels:**
- **Critical**: Sitio no funciona
- **High**: Funcionalidad principal rota
- **Medium**: Funcionalidad secundaria rota
- **Low**: Mejoras de UX

## 📈 Métricas de éxito

### **Targets de performance:**
- **Lighthouse Performance**: >90
- **Page Load Time**: <3 segundos
- **First Contentful Paint**: <1.5 segundos
- **Core Web Vitals**: Todos en verde

### **Targets de accesibilidad:**
- **WCAG Compliance**: AAA
- **Lighthouse Accessibility**: >95
- **Screen Reader Compatible**: 100%

### **Targets de SEO:**
- **Lighthouse SEO**: >95
- **Meta Tags**: Completos
- **Structured Data**: Válido
- **Sitemap**: Indexado

---

## 🎯 Testing completado exitosamente

Una vez completados todos los tests, el portfolio estará:

- ✅ **Funcionalmente completo**
- ✅ **Accesible para todos**
- ✅ **Optimizado para performance**
- ✅ **Seguro y confiable**
- ✅ **Compatible cross-browser**

¡Listo para impresionar con calidad profesional! 🚀