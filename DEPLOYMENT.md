# 🚀 Deployment Guide

Este documento describe cómo desplegar el portfolio en diferentes plataformas.

## 📋 Preparación para producción

### 1. **Configuración previa**

```bash
# Verificar que todos los archivos estén en su lugar
ls -la
# Debe existir: LICENSE, sitemap.xml, manifest.json, robots.txt

# Verificar configuración del dominio
grep -r "yeipi.cl" .
```

### 2. **Configurar Google Analytics (Opcional)**

```html
<!-- Agregar antes del </head> en index.html -->
<script>
  window.GA_MEASUREMENT_ID = 'G-TU-ID-REAL-AQUI';
</script>
```

### 3. **Configurar Service Worker para producción**

```javascript
// En js/sw.js - verificar que la versión sea correcta
const CACHE_NAME = 'portfolio-yeipi-v1.0.0';
```

## 🌐 Deployment en GitHub Pages

### **Paso 1: Preparar repositorio**

```bash
# Crear repositorio en GitHub
git init
git add .
git commit -m "feat: Portfolio completo listo para producción"
git branch -M main
git remote add origin https://github.com/tu-usuario/portfolio.git
git push -u origin main
```

### **Paso 2: Configurar GitHub Pages**

1. Ve a Settings → Pages
2. Source: **Deploy from a branch**
3. Branch: **main**
4. Folder: **/ (root)**
5. Save

### **Paso 3: Configurar dominio personalizado**

1. En Settings → Pages → Custom domain
2. Ingresa: `portfolio.yeipi.cl`
3. Verificar que el archivo `CNAME` se cree automáticamente

## ☁️ Configuración DNS en Cloudflare

### **Registros DNS necesarios:**

```dns
Type: CNAME
Name: portfolio
Content: tu-usuario.github.io
Proxy: ✅ (Naranja - Proxied)
TTL: Auto
```

### **Configuración adicional:**

```dns
# Opcional: Redirección desde www
Type: CNAME
Name: www.portfolio
Content: portfolio.yeipi.cl
Proxy: ✅ (Naranja - Proxied)
```

## 🔧 Configuración de Cloudflare

### **1. SSL/TLS**

- Encryption mode: **Full (strict)**
- Always Use HTTPS: **On**
- HTTP Strict Transport Security: **Enable**

### **2. Speed**

- Auto Minify: **HTML, CSS, JavaScript**
- Brotli: **On**
- Early Hints: **On**

### **3. Caching**

- Caching Level: **Standard**
- Browser Cache TTL: **4 hours**
- Always Online: **On**

### **4. Security**

- Security Level: **Medium**
- Bot Fight Mode: **On**
- Challenge Passage: **1 hour**

## 📊 Verificación del deployment

### **Checklist de verificación:**

```bash
# 1. Verificar que el sitio carga
curl -I https://portfolio.yeipi.cl

# 2. Verificar SSL
curl -I https://portfolio.yeipi.cl | grep -i "strict-transport-security"

# 3. Verificar PWA
# Abrir DevTools → Application → Manifest

# 4. Verificar Service Worker
# Abrir DevTools → Application → Service Workers

# 5. Verificar sitemap
curl https://portfolio.yeipi.cl/sitemap.xml

# 6. Verificar robots.txt
curl https://portfolio.yeipi.cl/robots.txt
```

### **Herramientas de testing:**

- **Lighthouse**: Performance, SEO, PWA
- **WebPageTest**: Velocidad de carga
- **GTmetrix**: Métricas de rendimiento
- **Pingdom**: Uptime monitoring

## 🔄 Actualizaciones y mantenimiento

### **Proceso de actualización:**

```bash
# 1. Hacer cambios en local
git add .
git commit -m "feat: Actualización del portfolio"

# 2. Subir cambios
git push origin main

# 3. GitHub Pages se actualiza automáticamente
# Tiempo aproximado: 1-5 minutos
```

### **Monitoreo:**

```bash
# Verificar logs de GitHub Actions
# Repository → Actions → Pages build and deployment

# Verificar analytics (si está configurado)
# Google Analytics → Realtime → Overview
```

## 🛠️ Alternativas de deployment

### **Netlify**

```bash
# 1. Conectar repositorio de GitHub
# 2. Build settings:
#    - Build command: (vacío)
#    - Publish directory: .
# 3. Deploy settings:
#    - Domain: portfolio.yeipi.cl
```

### **Vercel**

```bash
# 1. Importar desde GitHub
# 2. Framework preset: Other
# 3. Root directory: ./
# 4. Build command: (vacío)
# 5. Output directory: ./
```

### **Firebase Hosting**

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 📋 Troubleshooting

### **Problemas comunes:**

1. **404 en GitHub Pages**
   - Verificar que el repositorio sea público
   - Verificar configuración de GitHub Pages

2. **DNS no resuelve**
   - Verificar configuración en Cloudflare
   - Esperar propagación DNS (24-48 horas)

3. **SSL/HTTPS errores**
   - Verificar configuración SSL en Cloudflare
   - Verificar que GitHub Pages tenga SSL habilitado

4. **Service Worker no funciona**
   - Verificar que se sirva sobre HTTPS
   - Verificar console de DevTools

### **Contacto de soporte:**

- **GitHub**: GitHub Support
- **Cloudflare**: Cloudflare Support
- **Dominio**: NIC Chile (.cl)

---

## 🎉 Portfolio desplegado exitosamente

Una vez completados todos los pasos, tu portfolio estará disponible en:

- **URL principal**: https://portfolio.yeipi.cl
- **Funcionalidades**: PWA, offline, temas duales
- **Optimización**: SEO, performance, accesibilidad
- **Monitoreo**: Analytics, uptime, performance

¡Listo para impresionar a empleadores y clientes! 🚀