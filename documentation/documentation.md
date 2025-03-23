
# Sistema de Gestión de Préstamo de Espacios para Eventos Universitarios
## Documentación Técnica

## 📋 Índice
1. [Descripción General](#descripción-general)
2. [Objetivos](#objetivos)
3. [Arquitectura](#arquitectura)
4. [Tecnologías](#tecnologías)
5. [Funcionalidades Principales](#funcionalidades-principales)
6. [Estructura del Proyecto](#estructura-del-proyecto)
7. [Flujos de Trabajo](#flujos-de-trabajo)

## Descripción General
Sistema backend desarrollado para gestionar y automatizar el proceso de reservación de espacios en una universidad, facilitando la solicitud, aprobación y seguimiento de las reservaciones de espacios para eventos.

## Objetivos

### Objetivo General
Desarrollar un sistema de gestión de solicitudes de asignación de espacios para eventos en una universidad.

### Objetivos Específicos
1. Analizar y digitalizar los procesos actuales de solicitud y asignación de espacios
2. Implementar una plataforma que permita el registro y seguimiento de solicitudes
3. Desarrollar un sistema de notificaciones automáticas
4. Proporcionar herramientas de gestión y reportes para administradores

## Arquitectura

### Patrones de Diseño
- **Patrón Repositorio**: Abstracción de la capa de datos
- **MVC**: Separación de lógica de negocio, datos y presentación
- **Servicios**: Encapsulamiento de lógica de negocio
- **Middleware**: Manejo de autenticación y validaciones

### Capas de la Aplicación
1. **Controladores**: Manejo de peticiones HTTP
2. **Servicios**: Lógica de negocio
3. **Repositorios**: Acceso a datos
4. **Modelos**: Definición de entidades
5. **Middlewares**: Procesamiento de peticiones

## Tecnologías

### Backend
- Node.js
- Express.js
- MySQL
- Sequelize ORM

### Seguridad
- JWT (JSON Web Tokens)
- bcryptjs
- express-validator

### Notificaciones
- Nodemailer
- API de Telegram

## Funcionalidades Principales

### 1. Gestión de Usuarios
- Registro y autenticación
- Gestión de roles y permisos
- Perfiles de usuario

### 2. Sistema de Reservaciones
- Creación de solicitudes
- Proceso de aprobación multinivel
- Seguimiento de estado
- Validación de disponibilidad

### 3. Gestión de Espacios
- Catálogo de espacios
- Control de disponibilidad
- Calendario de reservaciones
- Gestión de conflictos

### 4. Sistema de Notificaciones
- Notificaciones por email
- Notificaciones por Telegram
- Recordatorios automáticos
- Alertas de estado

### 5. Reportes y Estadísticas
- Uso de espacios
- Estadísticas por departamento
- Métricas de aprobación
- Reportes personalizados

## Estructura del Proyecto
src/
├── config/ # Configuraciones de la aplicación
├── controllers/ # Controladores de la API
├── middlewares/ # Middlewares personalizados
├── models/ # Modelos de datos
├── repositories/ # Repositorios para acceso a datos
├── routes/ # Definición de rutas
├── schemas/ # Representacion de la base de datos
├── services/ # Servicios de negocio
└── utils/ # Utilidades y helpers

## Flujos de Trabajo

### 1. Proceso de Reservación
1. Usuario crea solicitud de reservación
2. Sistema valida disponibilidad
3. Notificación a aprobadores
4. Proceso de aprobación
5. Notificación de resultado
6. Actualización de calendario

### 2. Sistema de Aprobaciones
1. Recepción de solicitud
2. Verificación de requisitos
3. Aprobación por niveles
4. Registro de decisiones
5. Notificaciones automáticas

### 3. Gestión de Disponibilidad
1. Verificación de slots disponibles
2. Control de conflictos
3. Actualización de calendario
4. Notificaciones de cambios

### 4. Generación de Reportes
1. Recolección de datos
2. Procesamiento de estadísticas
3. Generación de métricas
4. Presentación de resultados

## Consideraciones de Seguridad
- Autenticación mediante JWT
- Validación de datos de entrada
- Control de acceso basado en roles
- Protección contra ataques comunes
- Manejo seguro de contraseñas

## Mantenimiento y Escalabilidad
- Logs del sistema
- Backups automáticos
- Monitoreo de rendimiento
- Actualizaciones de seguridad
- Optimización de consultas