
# Vue Posts App

## Descripción
Aplicación web desarrollada en Vue 3 que consume una API REST para mostrar usuarios y sus publicaciones. Permite crear nuevas publicaciones y gestionar datos con colores personalizados para cada usuario.

## Tecnologías utilizadas
- Vue 3 + Composition API
- Vue Router para navegación
- Vitest para testing
- Axios para llamadas HTTP (mockeado en tests)
- LocalStorage para almacenamiento temporal de posts
- TypeScript

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone <repo_url>
   cd <repo_folder>
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Ejecutar la aplicación en modo desarrollo:
   ```bash
   npm run dev
   ```

4. Abrir en el navegador:
   ```
   http://localhost:3000
   ```

## Scripts disponibles

- `npm run dev`: Inicia servidor local para desarrollo
- `npm run build`: Construye la app para producción
- `npm run test`: Ejecuta los tests con Vitest y muestra cobertura

## Testing

- Se usan mocks para Axios y utilidades para simular API y datos
- Pruebas cubren funciones que manejan la API (getPosts, createPost, getUsers, getUserPosts)
- Se verifica que localStorage se actualice y se usen datos cacheados cuando corresponde
- Uso de Vitest para mocks, spies y aserciones

## Justificaciones técnicas

- Se mockea la instancia axios para desacoplar las pruebas de la red
- LocalStorage se usa para persistencia temporal de posts creados en cliente
- Funciones API agregan color a usuarios para mejor visualización
- Router usa lazy loading para mejorar rendimiento

## Estructura principal

- `src/main.ts`: Punto de entrada de Vue
- `src/router.ts`: Configuración de rutas
- `src/services/apis.ts`: Funciones para consumir API
- `src/components`: Componentes UI reutilizables
- `src/views`: Vistas principales (Users, Profile, NotFound)
- `src/utils`: Funciones y tipos auxiliares

## Notas

- La aplicación es un ejemplo didáctico de consumo de API y testing en Vue 3
- Código modular y fácil de extender
- Tests con buena cobertura para asegurar calidad
