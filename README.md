# 🚀 Portfolio Full Stack - Laravel + React

Portfolio profesional desarrollado con **Laravel 12**, **React**, **Vite**, **Bootstrap** y **MySQL**, diseñado para mostrar proyectos, experiencia profesional y facilitar el contacto mediante una API REST moderna.

## 🌐 Demo

👉 https://dmilanes.es

---

# 🛠️ Tecnologías utilizadas

## Backend

- ⚡ Laravel 12
- 🔗 API REST
- 🗄️ MySQL
- 🔐 Laravel Sanctum
- 📧 Sistema de contacto
- 📁 Gestión de archivos e imágenes

## Frontend

- ⚛️ React
- ⚡ Vite
- 🎨 Bootstrap 5
- 📱 Diseño Responsive
- 🌙 Interfaz moderna

## Producción

- 🐧 Linux
- 🚀 PM2
- 🌐 Apache / Nginx
- 🔒 SSL (HTTPS)

---

# 📂 Estructura del proyecto

```text
portfolio/
│
├── backend/          # Laravel API
│
├── frontend/         # React + Vite
│
└── database/         # Migraciones y seeders
```

---

# ⚙️ Requisitos

## Servidor

- PHP >= 8.3
- Composer
- Node.js >= 20
- npm
- MySQL >= 8
- Apache o Nginx

---

# 📥 Instalación Backend (Laravel)

Acceder al directorio backend:

```bash
cd backend
```

Instalar dependencias:

```bash
composer install
```

Copiar variables de entorno:

```bash
cp .env.example .env
```

Generar clave de aplicación:

```bash
php artisan key:generate
```

Configurar la base de datos en:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=portfolio
DB_USERNAME=root
DB_PASSWORD=password
```

Ejecutar migraciones:

```bash
php artisan migrate
```

Crear enlace simbólico para archivos:

```bash
php artisan storage:link
```

Iniciar servidor:

```bash
php artisan serve
```

Laravel quedará disponible en:

```text
http://127.0.0.1:8000
```

---

# ⚛️ Instalación Frontend (React)

Acceder al directorio frontend:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Configurar URL de la API:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

Ejecutar proyecto:

```bash
npm run dev
```

React quedará disponible en:

```text
http://localhost:5173
```

---

# 🏗️ Compilar para Producción

Desde el directorio frontend:

```bash
npm run build
```

Se generará la carpeta:

```text
dist/
```

---

# 🚀 Despliegue en Producción

## Backend Laravel

Optimizar configuración:

```bash
php artisan optimize
```

Cachear configuración:

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

Permisos:

```bash
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```

---

## Frontend React

Generar build:

```bash
npm run build
```

Copiar contenido de:

```text
dist/
```

al directorio público del servidor web.

---

# 🔄 Ejecutar con PM2

Instalar PM2:

```bash
npm install -g pm2
```

Iniciar aplicación React:

```bash
pm2 start npm --name portfolio-front -- run preview
```

Ver estado:

```bash
pm2 list
```

Guardar procesos:

```bash
pm2 save
```

Arranque automático:

```bash
pm2 startup
```

---

# 📊 Comandos útiles

Ver logs:

```bash
pm2 logs
```

Reiniciar:

```bash
pm2 restart all
```

Detener:

```bash
pm2 stop all
```

Eliminar:

```bash
pm2 delete all
```

---

# 🔐 Variables de entorno

## Laravel

```env
APP_NAME=Portfolio
APP_ENV=production
APP_DEBUG=false

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=portfolio
DB_USERNAME=user
DB_PASSWORD=password
```

## React

```env
VITE_API_URL=https://dominio.com/api
```

---

# 📸 Características

- ✅ Portfolio profesional
- ✅ API REST Laravel
- ✅ Panel de administración
- ✅ Gestión de proyectos
- ✅ Gestión de experiencia laboral
- ✅ Sistema de contacto
- ✅ Subida de imágenes
- ✅ Diseño responsive
- ✅ SEO optimizado
- ✅ Arquitectura Full Stack moderna

---

# 👨‍💻 Autor

### David Milanes Moreno

🌐 https://dmilanes.es

💼 Full Stack Developer

📍 Murcia, España

---

# ⭐ Apóyame

Si este proyecto te ha resultado útil:

```text
⭐ Dale una estrella al repositorio
```

Gracias por visitar el proyecto.
