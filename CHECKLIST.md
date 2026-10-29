# Checklist de retomada — e-Terra

Checklist paso a paso derivado de [`PLAN.md`](./PLAN.md). Marca cada casilla con `[x]` a medida que avances.
Cada fase enlaza con la sección completa de `PLAN.md` donde está el detalle y los snippets de código.

**Cómo usarlo:** trabajá en orden (cada fase depende de la anterior). Cuando termines una fase, validá con su
**Criterio de éxito** antes de pasar a la siguiente.

---

## ✅ Estado actual (ya hecho)

- [x] Exploración del proyecto sin modificar nada
- [x] `PLAN.md` creado (mapa mental, tour, 33 bugs, plan de fases)
- [x] `git pull` ejecutado → merge `d0c80fe` (~30 commits de 2023 traídos)
- [x] Comentario en `src/app.js` commiteado
- [x] `CHECKLIST.md` creado
- [x] Push a `origin/main`

---

## Fase 0 — Ordenar el terreno (~30 min) → [detalle](./PLAN.md)

- [ ] Crear la rama de trabajo: `git switch -c retomar/entorno-modelos`
- [ ] Verificar versiones: `node -v` y `npm -v`
      (tenés Node 24; si las dependencias de 2023 dan problemas, usá Node 20 LTS y creá un `.nvmrc`)
- [ ] Leer `README.md`, `BaseProyecto/instrucciones.md` y `retro.md`
      (el "sprint FINAL" de `retro.md` define prioridades: carrito, edición de usuarios, soft delete, BIO)
- [ ] `git status` limpio antes de arrancar

**Criterio de éxito:** rama creada, `git status` limpio y sabés cuál es el alcance del sprint.

---

## Fase 1 — Entorno reproducible (2-3 h) → [detalle](./PLAN.md#L1057)

- [ ] **1.1** Crear la BD y el usuario en MySQL (`CREATE DATABASE terra ...`)
- [ ] **1.1** Cargar `BaseProyecto/Terra.sql` y `BaseProyecto/BaseTerra.sql` **indicando la base**
      (los scripts no tienen `USE terra`)
- [ ] **1.2** Crear `.env` (no se commitea) con `PORT`, `DB_*` y `SESSION_SECRET`
- [ ] **1.2** Crear `.env.example` con los mismos nombres y valores vacíos
- [ ] **1.3** Actualizar `.gitignore` para excluir `.env`
- [ ] **1.3** Cambiar `database/config/config.js` para que lea `process.env` (quitar credenciales hardcodeadas)
- [ ] **1.4** Verificar conexión: `sequelize.authenticate()` → `DB OK`
- [ ] **1.5** Crear un admin real con hash bcrypt
      (el seed guarda `'10'` en texto plano y el login usa `bcrypt.compareSync`, por eso nadie puede entrar)
- [ ] **1.6** Actualizar el `README.md` con las nuevas variables de entorno

**Criterio de éxito:**

- `sequelize.authenticate()` responde OK
- `/products/list` muestra productos reales
- Podés loguearte con el admin creado

---

## Fase 2 — Modelos y esquema (3-4 h) → [detalle](./PLAN.md#L1208)

- [ ] **2.1** Arreglar `ProductCategory`
- [ ] **2.2** Arreglar `UserCategory`
- [ ] **2.3** Corregir la foreign key de `User`
- [ ] **2.4** Agregar los campos que el proyecto necesita
- [ ] **2.5** Actualizar los scripts SQL (son la fuente de verdad; no hay migraciones)
- [ ] **2.6** Corregir el typo `disonible` → `disponible`
- [ ] **Verificación:** recorrer la app buscando errores de "table doesn't exist" / "unknown column"

**Criterio de éxito:** no aparece ningún error de "table doesn't exist" ni "unknown column".

---

## Fase 3 — Auth, sesiones y roles (4-5 h) → [detalle](./PLAN.md#L1367)

- [ ] **3.1** Unificar rutas de auth
- [ ] **3.2** Arreglar "recordarme"
- [ ] **3.3** Arreglar el logout
- [ ] **3.4** Arreglar el header (nombre de usuario, estados)
- [ ] **3.5** Unificar errores de validación
- [ ] **3.6** Registro sin avatar (avatar opcional)
- [ ] **3.7** Revisar configuración de sesión
- [ ] **3.8** Revisar middlewares de protección (`authMdlw`, `guestMdlw`, `adminMiddleware`, etc.)
- [ ] **Flujo completo:** registrar → loguear → ver perfil → logout, y probar rutas de admin

**Criterio de éxito:** podés hacer ese recorrido sin errores y el header muestra tu nombre.

---

## Fase 4 — Errores y robustez (2 h) → [detalle](./PLAN.md#L1542)

- [ ] **4.1** Wrapper `asyncHandler` para controladores async
- [ ] **4.2** Middleware global de errores
- [ ] **4.3** 404 en las rutas de API
- [ ] **4.4** Arreglar la vista `listaMysql`
- [ ] **4.5** Unificar URLs de la API
- [ ] **Verificación:**
  - [ ] Con MySQL apagado, `/api/product` devuelve JSON 500 y **el servidor sigue vivo**
  - [ ] `/api/product/9999` devuelve 404 JSON
  - [ ] `/products/9999` muestra página 404 (sin stack trace)

---

## Fase 5 — CRUD de usuarios + soft delete (4-5 h) → [detalle](./PLAN.md#L1644)

- [ ] **5.1** Editar perfil
- [ ] **5.2** Formulario de edición
- [ ] **5.3** Listado de usuarios (admin)
- [ ] **5.4** Soft delete
- [ ] **5.5** BIO y perfil de admin
- [ ] **Verificación:**
  - [ ] Dejar la contraseña vacía → no cambia
  - [ ] Cambiar la contraseña → puede volver a loguearse
  - [ ] Como admin, editar otro usuario
  - [ ] Eliminar un usuario → desaparece del listado pero sigue en la BD con `deleted_at`
  - [ ] Ese usuario ya no puede loguearse

---

## Fase 6 — Carrito funcional (6-8 h) → [detalle](./PLAN.md#L1766)

- [ ] Elegir opción: **A** (carrito en sesión, más rápido) o **B** (carrito en MySQL, más real)
- [ ] Implementar agregar / modificar cantidad / eliminar
- [ ] Persistir el carrito (según la opción elegida)
- [ ] **Verificación:**
  - [ ] Cambiar cantidad → el total se recalcula
  - [ ] Eliminar línea → desaparece
  - [ ] Vaciar carrito → total 0
  - [ ] Recargar la página → el carrito sigue
  - [ ] (Opción B) cerrar y abrir sesión → el carrito del usuario sigue

---

## Fase 7 — Home dinámica y buscador (3 h, opcional) → [detalle](./PLAN.md#L1904)

- [ ] Home dinámica (productos destacados desde la BD)
- [ ] Buscador funcionando
- [ ] **Verificación:** buscar "monstera" devuelve la Monstera; algo inexistente muestra lista vacía sin romper

---

## Fase 8 — Limpieza, tests y documentación (3-4 h) → [detalle](./PLAN.md#L1980)

- [ ] Limpiar código muerto y comentarios obsoletos
- [ ] Scripts de `package.json` (`test`, `dev`, etc.)
- [ ] Definir versión de Node (`.nvmrc`)
- [ ] Tests (opcional pero recomendado)
- [ ] README final: tecnologías, requisitos, instalación, variables de entorno, scripts, usuarios de prueba, rutas, endpoints, capturas
- [ ] **Definition of Done:** un clon nuevo del repo puede hacer `npm install` + configurar `.env` + correr el proyecto

---

## 📌 Reglas rápidas

- Commitear en inglés o español, pero **un concepto por commit**.
- No commitear `.env` ni imágenes basura.
- Antes de cada `git push`: `git status` y `git log --oneline -3`.
- Si algo grande se rompe, crear una rama de rescate antes de seguir editando.
