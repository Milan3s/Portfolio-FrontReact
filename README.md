<p align="center">
  <img src="./docs/portfolio-cover.png" alt="Portfolio David Milanés" width="100%">
</p>

<h1 align="center">🚀 Portfolio Full Stack - Laravel + React</h1>

<p align="center">
Portfolio profesional desarrollado con Laravel 12, React, Vite, Bootstrap y MySQL.
</p>

<p align="center">

![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?style=for-the-badge\&logo=laravel\&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?style=for-the-badge\&logo=bootstrap\&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge\&logo=mysql\&logoColor=white)

</p>

---

## 🌐 Demo

**Web:** https://dmilanes.es

---

## 📖 Descripción

Este proyecto corresponde a mi portfolio profesional como desarrollador Full Stack.

La aplicación fue inicialmente desarrollada utilizando Spring Boot y posteriormente migrada a una arquitectura moderna basada en Laravel y React, mejorando significativamente la mantenibilidad, escalabilidad y experiencia de usuario.

La plataforma permite gestionar proyectos, experiencia profesional, tecnologías, formación y contacto mediante una API REST optimizada.

---

## ✨ Características principales

* ⚡ API REST desarrollada con Laravel 12
* ⚛️ Frontend SPA con React
* 🎨 Diseño responsive con Bootstrap 5
* 🗄️ Persistencia de datos con MySQL
* 📁 Gestión de imágenes y archivos
* 📧 Formulario de contacto
* 🔒 Arquitectura segura y escalable
* 🚀 Despliegue optimizado para producción
* 📱 Compatible con dispositivos móviles
* 🌙 Interfaz moderna y profesional

---

## 🛠️ Stack Tecnológico

### Backend

* Laravel 12
* PHP 8.3+
* MySQL
* Eloquent ORM
* API REST

### Frontend

* React
* Vite
* Bootstrap 5
* Axios
* React Router

### Infraestructura

* Linux
* Apache
* PM2
* SSL / HTTPS

---

## 📂 Estructura del Proyecto

```text
portfolio/
│
├── app/
├── bootstrap/
├── config/
├── database/
├── public/
├── resources/
├── routes/
├── storage/
│
├── portfolio-front-react/
│   ├── src/
│   ├── public/
│   └── dist/
│
└── README.md
```

## ⚙️ Instalación

### 1️⃣ Clonar repositorio

```bash
git clone https://github.com/usuario/repositorio.git
cd repositorio
```

### 2️⃣ Instalar Laravel

```bash
composer install
cp .env.example .env
php artisan key:generate
```

Configurar la conexión a MySQL en el archivo `.env`.

Ejecutar migraciones:

```bash
php artisan migrate
```

Crear enlace de almacenamiento:

```bash
php artisan storage:link
```

Iniciar servidor:

```bash
php artisan serve
```

### 3️⃣ Instalar React

```bash
cd portfolio-front-react
npm install
```

Configurar:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

Ejecutar:

```bash
npm run dev
```

---

## 🚀 Compilación para Producción

Frontend:

```bash
npm run build
```

Laravel:

```bash
php artisan optimize
php artisan config:cache
php artisan route:cache
```

---

## 🔄 Gestión con PM2

```bash
pm2 list

pm2 logs portfolio-api

pm2 restart portfolio-api

pm2 save
```

---

## 👨‍💻 Autor

### David Milanés Moreno

🌐 https://dmilanes.es

💼 Full Stack Developer

📍 Murcia, España

### Tecnologías principales

Laravel • React • PHP • JavaScript • MySQL • Bootstrap • Vite

---

## ⭐ Apoya el proyecto

Si el proyecto te resulta interesante:

⭐ Dale una estrella al repositorio.

Toda contribución, sugerencia o feedback es bienvenida.
