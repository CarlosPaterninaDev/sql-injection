# Proyecto Angular con Capacitor e Ionic - Demo de SQL Injection

Este proyecto es una aplicación Angular que utiliza Capacitor e Ionic para crear una demo de SQL Injection. La finalidad de este proyecto es demostrar cómo las inyecciones SQL pueden afectar la seguridad de una aplicación y cómo prevenirlas.


## Requisitos

- Node.js
- npm (Node Package Manager)
- Angular CLI
- Ionic CLI

## Instalación


1. Instala las dependencias:
    ```bash
    npm install
    ```

## Scripts Disponibles

- `ng`: Ejecuta el comando Angular CLI.
- `start`: Copia el archivo `sql-wasm.wasm` a la carpeta `src/assets` y luego inicia el servidor de desarrollo.
    ```bash
    npm start
    ```
- `build`: Copia el archivo `sql-wasm.wasm` a la carpeta `src/assets` y luego construye la aplicación para producción.
    ```bash
    npm run build
    ```
- `test`: Ejecuta las pruebas unitarias.
    ```bash
    npm test
    ```
- `lint`: Ejecuta el linter de Angular.
    ```bash
    npm run lint
    ```
- `e2e`: Ejecuta las pruebas end-to-end.
    ```bash
    npm run e2e
    ```
- `copysqlwasm`: Copia el archivo `sql-wasm.wasm` desde `node_modules/sql.js/dist` a `src/assets`.
    ```bash
    npm run copysqlwasm
    ```

## Dependencias

### Angular

- `@angular/animations`: ^18.0.0
- `@angular/common`: ^18.0.0
- `@angular/compiler`: ^18.0.0
- `@angular/core`: ^18.0.0
- `@angular/forms`: ^18.0.0
- `@angular/platform-browser`: ^18.0.0
- `@angular/platform-browser-dynamic`: ^18.0.0
- `@angular/router`: ^18.0.0

### Capacitor

- `@capacitor-community/sqlite`: ^6.0.1
- `@capacitor/android`: 6.1.2
- `@capacitor/app`: 6.0.1
- `@capacitor/core`: 6.1.2
- `@capacitor/haptics`: 6.0.1
- `@capacitor/keyboard`: 6.0.2
- `@capacitor/status-bar`: 6.0.1

### Ionic

- `@ionic/angular`: ^8.0.0
- `ionicons`: ^7.2.1

### Otras Dependencias

- `jeep-sqlite`: ^2.8.0
- `rxjs`: ~7.8.0
- `tslib`: ^2.3.0
- `zone.js`: ~0.14.2


## Ejecución

Para ejecutar la aplicación en modo desarrollo:
```bash
ng serve