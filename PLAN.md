# Plan para retomar e-Terra

> **Documento de trabajo del proyecto.**
> Creado: 2026-10-27.
> Objetivo: reconstruir el mapa mental del proyecto y dejar un plan de cambios ordenado por dependencias.
> No reemplaza al `README.md`: lo complementa.
>
> Las líneas de código citadas son orientativas. Si un archivo cambia, buscá por el texto citado o por el nombre del método.

---

## Índice

- [0. Cómo usar este documento](#0-cómo-usar-este-documento)
- [1. Mapa mental](#1-mapa-mental)
  - [1.1 La idea central](#11-la-idea-central)
  - [1.2 El viaje de una petición](#12-el-viaje-de-una-petición)
  - [1.3 Responsabilidad de cada carpeta](#13-responsabilidad-de-cada-carpeta)
  - [1.4 Los cuatro conceptos que más traban](#14-los-cuatro-conceptos-que-más-traban)
  - [1.5 Glosario mínimo](#15-glosario-mínimo)
- [2. Tour guiado archivo por archivo](#2-tour-guiado-archivo-por-archivo)
  - [2.1 `src/app.js`](#21-srcappjs)
  - [2.2 Rutas](#22-rutas)
  - [2.3 Controladores](#23-controladores)
  - [2.4 Modelos](#24-modelos)
  - [2.5 Middlewares](#25-middlewares)
  - [2.6 Vistas EJS](#26-vistas-ejs)
  - [2.7 API](#27-api)
  - [2.8 JavaScript del front](#28-javascript-del-front)
  - [2.9 SQL y base de datos](#29-sql-y-base-de-datos)
  - [2.10 Configuración y scripts](#210-configuración-y-scripts)
- [3. Inventario de bugs](#3-inventario-de-bugs)
- [4. Plan de cambios por fases](#4-plan-de-cambios-por-fases)
  - [Fase 0 — Ordenar el terreno](#fase-0--ordenar-el-terreno-30-min)
  - [Fase 1 — Entorno reproducible](#fase-1--entorno-reproducible-2-3-h)
  - [Fase 2 — Modelos y esquema](#fase-2--modelos-y-esquema-3-4-h)
  - [Fase 3 — Auth, sesiones y roles](#fase-3--auth-sesiones-y-roles-4-5-h)
  - [Fase 4 — Errores y robustez](#fase-4--errores-y-robustez-2-h)
  - [Fase 5 — CRUD de usuarios + soft delete](#fase-5--crud-de-usuarios--soft-delete-4-5-h)
  - [Fase 6 — Carrito funcional](#fase-6--carrito-funcional-6-8-h)
  - [Fase 7 — Home dinámica y buscador](#fase-7--home-dinámica-y-buscador-3-h-opcional)
  - [Fase 8 — Limpieza, tests y documentación](#fase-8--limpieza-tests-y-documentación-3-4-h)
- [5. Ruta de re-aprendizaje en 4 sesiones](#5-ruta-de-re-aprendizaje-en-4-sesiones)
- [6. Checklist de arranque](#6-checklist-de-arranque)
- [7. Qué NO hacer](#7-qué-no-hacer)
- [8. Apéndices](#8-apéndices)
  - [8.1 Mapa de rutas](#81-mapa-de-rutas)
  - [8.2 Esquema de la base de datos](#82-esquema-de-la-base-de-datos)
  - [8.3 Comandos útiles](#83-comandos-útiles)
  - [8.4 Glosario ampliado](#84-glosario-ampliado)

---

## 0. Cómo usar este documento

Si volvés al proyecto después de mucho tiempo, leé en este orden:

1. **Sección 1.2** (el viaje de una petición): te devuelve el modelo mental.
2. **Sección 2** (tour archivo por archivo): te dice qué hace cada archivo y qué está mal.
3. **Sección 4** (plan por fases): te dice qué tocar y en qué orden.
4. **Sección 6** (checklist): comandos para levantar todo.

Si solo tenés 10 minutos, leé la **ficha del proyecto** y la **sección 1.2**.

### Ficha del proyecto

| Dato | Valor |
|---|---|
| Nombre | e-Terra (Proyecto Integrador) |
| Tipo | E-commerce de plantas |
| Backend | Node.js + Express 4 |
| Vistas | EJS |
| Base de datos | MySQL / MariaDB |
| ORM | Sequelize 6 |
| Autenticación | Sesiones + cookies + bcryptjs |
| Subida de archivos | Multer |
| API | REST básica en `/api` |
| Entry point real | `src/app.js` |
| Puerto por defecto | `3006` |
| Último commit de referencia | `af50537` (2023-05-24) |
| Estado general | Base funcional, pero con modelos desalineados y carrito sin implementar |

### Resumen ejecutivo

- El servidor **levanta**, pero las rutas que usan MySQL fallan si la base no está corriendo.
- Los **modelos de categorías** apuntan a tablas que no existen (`product_categories` vs `productscategories`).
- Los **usuarios seed no pueden loguearse** porque las contraseñas están en texto plano (`'10'`) y el login usa bcrypt.
- El **carrito es una maqueta estática**.
- La **API no maneja errores**: un fallo de base de datos puede tumbar el proceso.
- El **perfil de usuario no se puede editar** por un `where` mal armado.
- El **README está desactualizado** (`node app.js` en vez de `node src/app.js`).
- La prioridad del sprint final, según `retro.md`: carrito funcional, edición, soft delete, botones y BIO.

---

## 1. Mapa mental

### 1.1 La idea central

> Es una app de **Express** que recibe una petición HTTP, la pasa por **middlewares**, la deriva a una **ruta**, la ruta llama a un **controlador**, el controlador usa un **modelo de Sequelize** para hablar con **MySQL** y finalmente renderiza una **vista EJS** (o devuelve **JSON** si la ruta empieza con `/api`).

Si entendés ese recorrido, el resto son detalles.

### 1.2 El viaje de una petición

Ejemplo real: `GET /products/7`.

```
Navegador
   │  GET /products/7
   ▼
src/app.js
   │  Middlewares globales: cookies, sesión, res.locals, estáticos, CORS
   ▼
src/routes/productRoutes.js
   │  router.get('/:id', productController.productDetail)
   ▼
src/controllers/productController.js
   │  const planta = await Product.findByPk(7)
   ▼
database/models/Product.js
   │  Sequelize traduce a: SELECT * FROM products WHERE id = 7
   ▼
MySQL (base "terra", tabla "products")
   │  Devuelve una fila
   ▼
productController.js
   │  res.render('products/productDetail', { planta })
   ▼
src/views/products/productDetail.ejs
   │  Incluye partials (head, header, footer)
   ▼
HTML final → navegador
```

Puntos clave del recorrido:

1. **`app.js` no sabe de productos.** Solo configura la app y dice "las rutas que empiezan con `/products` las maneja `productRoutes`".
2. **La ruta no tiene lógica de negocio.** Solo dice "si llega `GET /:id`, llamá a `productDetail`".
3. **El controlador no escribe SQL.** Le pide al modelo `Product.findByPk(7)`.
4. **El modelo no sabe de HTTP.** Solo representa la tabla y hace consultas.
5. **La vista no hace consultas.** Recibe `planta` ya resuelto y lo muestra.
6. **Los middlewares corren antes.** Si hay sesión, dejan `res.locals.userLogged` para que la vista sepa quién está logueado.

### 1.3 Responsabilidad de cada carpeta

| Pieza | Carpeta | Responsabilidad | Ejemplo |
|---|---|---|---|
| Entrada | `src/app.js` | Configura Express, middlewares globales, monta routers, 404 | `app.use('/products', productRoutes)` |
| Rutas | `src/routes/` | Asociar URL + verbo HTTP con un controlador | `router.get('/:id', ...)` |
| Controladores | `src/controllers/` | Lógica: buscar datos y decidir qué responder | `Product.findByPk()` + `res.render()` |
| Modelos | `database/models/` | Representar tablas y hacer consultas (ORM) | `Product.findAll()` |
| Vistas | `src/views/` | Generar HTML con EJS | `productDetail.ejs` |
| Middlewares | `src/middlewares/` | Funciones que corren antes del controlador | auth, multer, validaciones |
| API | `src/api/` | Igual que rutas/controladores, pero responde JSON | `GET /api/product` |
| Config | `database/config/` | Credenciales de conexión a MySQL | `config.js` |
| SQL | `BaseProyecto/` | Esquema y datos iniciales | `Terra.sql`, `BaseTerra.sql` |
| Estáticos | `public/` | CSS, JS de front e imágenes | `/css/styles.css` |

#### ¿Por qué hay "dos proyectos" adentro?

Hay dos capas que comparten los mismos modelos:

- **Web tradicional:** `src/routes` + `src/controllers` + `src/views`. Devuelve HTML.
- **API REST:** `src/api/routes` + `src/api/controller`. Devuelve JSON.

No son dos apps distintas: son dos formas de entrar al mismo negocio. La API no renderiza EJS, solo hace consultas y responde `res.json(...)`.

También vas a encontrar `src/Data/users.json` y `src/Data/products.json`. **Son restos de la versión anterior**, cuando el proyecto guardaba en JSON en vez de MySQL. Hoy casi no se usan; se pueden borrar en la fase de limpieza.

### 1.4 Los cuatro conceptos que más traban

#### 1. Sequelize no "adivina" la tabla: se la tenés que decir

Un modelo de Sequelize tiene tres cosas que deben coincidir con MySQL:

1. **Nombre de tabla** (`tableName`).
2. **Nombre de columnas** (`field` si el atributo JS se llama distinto).
3. **Timestamps** (`createdAt`/`updatedAt`): si la tabla no los tiene, hay que poner `timestamps: false`.

Ejemplo del problema actual:

```js
// database/models/ProductCategory.js
let config = {
  tablename: "productCategories", // ❌ minúscula: Sequelize lo ignora
  timestamps: false,
};
```

Sequelize termina buscando `product_categories`, pero el SQL creó `productscategories`. Por eso cualquier consulta a categorías falla.

La solución es explícita:

```js
let config = {
  tableName: 'productscategories',
  timestamps: false,
  underscored: true,
};
```

Y si el atributo JS se llama `name` pero la columna SQL se llama `type`:

```js
name: {
  type: DataTypes.STRING,
  allowNull: false,
  field: 'type', // puente entre JS y SQL
}
```

**Regla mental:** cada vez que un modelo "no encuentra" algo, compará tres cosas: `tableName`, `field` y `timestamps`.

#### 2. Sesión, cookie y `res.locals` no son lo mismo

| Cosa | Dónde vive | Quién la lee | Para qué sirve acá |
|---|---|---|---|
| **Cookie** | Navegador | `req.cookies` | Recordar algo entre visitas |
| **Sesión** | Servidor (memoria, por ahora) | `req.session` | Saber quién está logueado |
| **`res.locals`** | Servidor, solo durante esa petición | Las vistas EJS | Pasar `isLogged`, `userLogged`, etc. |

Flujo típico:

```
POST /login
  → validar
  → buscar usuario
  → comparar contraseña con bcrypt
  → req.session.userLogged = { id, name, ... }
  → redirect /profile

GET /profile
  → userLoggedMdlw lee req.session y setea res.locals
  → el controlador lee req.session
  → renderiza userProfile.ejs
```

Por eso el header puede hacer `<% if (locals.isLogged) { %>`: el middleware ya dejó esa variable en `res.locals` antes de llegar a la vista.

#### 3. Los middlewares son una cadena, y el orden importa

En `src/app.js` se ejecutan en este orden:

1. `methodOverride` → permite que un formulario POST simule PUT/DELETE con `?_method=PUT`.
2. `express.urlencoded` y `express.json` → llenan `req.body`.
3. `cookieParser` → llena `req.cookies`.
4. `session` → llena `req.session`.
5. `userLoggedMdlw` y `adminLoggedMiddleware` → llenan `res.locals`.
6. `express.static` → sirve `/css`, `/js`, `/Images`.
7. Routers.
8. 404.

Si movés un middleware de lugar, cambia el comportamiento. Por ejemplo, si `userLoggedMdlw` va después de las rutas, las vistas nunca ven `isLogged`.

#### 4. `async/await` sin `try/catch` puede tumbar el servidor

Express 4 no captura automáticamente los errores de funciones `async`. Si una promesa se rechaza y nadie la atrapa, Node termina el proceso.

Eso es exactamente lo que pasa hoy con `/api/product`: si MySQL no responde, el servidor muere. La solución es una de estas dos:

- `try/catch` en cada controlador.
- Un wrapper `asyncHandler` que derive el error a un middleware de errores.

Se ve en la [Fase 4](#fase-4--errores-y-robustez-2-h).

### 1.5 Glosario mínimo

| Término | Qué es | Dónde aparece |
|---|---|---|
| **HTTP** | Protocolo de petición/respuesta. Verbos: GET, POST, PUT, DELETE. | Rutas |
| **Ruta** | Combinación de método + URL. | `router.get('/:id', ...)` |
| **`req.params`** | Datos que vienen en la URL. Ej: `:id` en `/products/7`. | `req.params.id` |
| **`req.body`** | Datos que vienen en el cuerpo (formulario o JSON). | `req.body.email` |
| **`req.query`** | Datos que vienen después del `?`. Ej: `?q=monstera`. | `req.query.q` |
| **MVC** | Modelo, Vista, Controlador. Separar datos, presentación y lógica. | Toda la app |
| **ORM** | Capa que traduce objetos JS a SQL. Acá es Sequelize. | `database/models` |
| **Modelo** | Representación de una tabla. | `Product`, `User` |
| **Seed** | Datos iniciales de prueba. | `BaseTerra.sql` |
| **Migración** | Cambio versionado del esquema de la BD. | *No hay en este proyecto* |
| **Middleware** | Función `(req, res, next)` que corre antes del controlador. | `src/middlewares` |
| **`next()`** | "Pasá al siguiente middleware o controlador". | Auth, multer |
| **Sesión** | Datos guardados en el servidor, asociados a una cookie. | `req.session` |
| **Cookie** | Dato guardado en el navegador. | `req.cookies` |
| **`res.locals`** | Variables de la petición actual disponibles en todas las vistas. | `isLogged`, `adminLogged` |
| **EJS** | Motor de plantillas: HTML + JavaScript. | `src/views` |
| **Hash** | Transformación irreversible de una contraseña. | bcrypt |
| **CORS** | Permiso para que otro origen llame a tu API. | `app.use(cors(...))` |
| **Multer** | Middleware para subir archivos (`multipart/form-data`). | `src/middlewares/multer.js` |
| **REST** | Estilo de API basado en recursos y verbos HTTP. | `src/api` |

---

## 2. Tour guiado archivo por archivo

Esta sección explica **qué hace cada archivo**, **cómo se conecta** y **qué problemas tiene**. Es la parte "para retomar".

### 2.1 `src/app.js`

Es el punto de entrada. Se encarga de configurar Express y armar la cadena de middlewares.

| Líneas | Qué hace | Comentario |
|---|---|---|
| 1 | `require('dotenv').config()` | Carga `.env` en `process.env`. Si no existe `.env`, no falla: solo no carga nada. |
| 2-3 | Crea `app` | `const app = express()`. |
| 4-8 | Imports | `path`, `readline` (sin usar), `method-override`, `PORT`, `cors`. |
| 12-17 | Imports de sesión/cookies | `cookie-parser`, `express-session`, middlewares de login. |
| 20-26 | Routers y modelos | Rutas web, rutas de API y `sequelize`. |
| 28-30 | Configura vistas | `app.set('views', ...)` y `app.set('view engine', 'ejs')`. |
| 31 | `methodOverride('_method')` | Permite `?_method=PUT` y `?_method=DELETE` en formularios. |
| 33-35 | Parsers | `urlencoded` para formularios, `json` para APIs, `cookieParser` para cookies. |
| 36-42 | Sesión | `secret` hardcodeado, `resave: false`, `saveUninitialized: true`. |
| 44-45 | `res.locals` | `userLoggedMdlw` y `adminLoggedMiddleware` dejan datos para las vistas. |
| 47-48 | Estáticos | Sirve `public` y también `views` (esto último no es necesario). |
| 50-52 | CORS | `origin: '*'`. |
| 54-60 | Routers | `/`, `/products`, `/users`, `/api/product`, `/api/users`. |
| 63-67 | 404 | Renderiza `404.ejs` para cualquier ruta no encontrada. |
| 72-78 | `sequelize.authenticate` comentado | Se usaba para probar la conexión. |
| 80-82 | `app.listen` | Arranca en `PORT`. |

**Problemas:**

- `secret: 'Clave obligatoria'` está hardcodeado.
- `saveUninitialized: true` crea sesiones vacías; conviene `false`.
- `express.static('views')` expone el código de las vistas.
- `express.static('public')` usa una ruta relativa al directorio desde donde se ejecuta; si arrancás desde otra carpeta, no encuentra los estáticos.
- Hay imports sin usar (`clearScreenDown`, `Product`, `sequelize`).
- El bloque de `sequelize.authenticate` comentado no es necesario.
- No hay middleware de errores (solo 404).

**Cómo se conecta:** todo pasa por acá. Si querés agregar una ruta nueva, primero creás el router y después lo montás con `app.use(...)`.

### 2.2 Rutas

#### `src/routes/mainRoutes.js`

| Línea | Ruta | Controlador | Comentario |
|---|---|---|---|
| 12 | `GET /` | `mainController.index` | Home. |
| 14 | `GET /login` | `userController.login` | Pasa por `authMdlw`. |
| 15 | `POST /login` | `userController.processLogin` | Pasa por `authMdlw`. |
| 17 | `GET /profile` | `userController.profile` | Sin middleware de protección. |
| 19 | `GET /logout` | `mainController.logout` | Destruye sesión. |

**Problemas:**

- `guestMdlw` y `adminMiddleware` se importan pero no se usan.
- `authMdlw` redirige a `/profile` si hay `userLogged`, pero no contempla `admin`.
- `/profile` no exige estar logueado: si entrás sin sesión, la vista recibe `user: undefined` y puede romper.
- Hay rutas duplicadas con `userRoutes` (`/login`, `/profile`).

#### `src/routes/productRoutes.js`

| Línea | Ruta | Controlador | Comentario |
|---|---|---|---|
| 13 | `GET /mysqlProducts` | `listaProductos` | Renderiza una vista que no existe (`listaMysql.ejs`). |
| 18 | `GET /category/:id` | `category` | Filtra por categoría. |
| 26 | `GET /index` | `productCatalogue` | Catálogo (solo categoría 1). |
| 27 | `GET /list` | `index` | Listado completo. |
| 31-32 | `GET/POST /create` | `create` / `store` | Crea producto con imagen y validación. |
| 35-36 | `GET/PUT /edit/:id` | `edit` / `update` | Edita producto. |
| 39-40 | `GET/DELETE /delete/:id` | `delete` / `destroy` | Elimina producto. |
| 43 y 45 | `GET /cart` | `productCart` | **Duplicada**. |
| 44 | `GET /:id` | `productDetail` | Debe ir al final para no capturar `/cart`. |

**Problemas:**

- `/mysqlProducts` renderiza una vista inexistente.
- `/cart` está definida dos veces.
- `/:id` está después de `/cart`, bien, pero cualquier ruta nueva debe ir antes.
- No hay middleware de admin en create/edit/delete: cualquier usuario puede entrar escribiendo la URL.
- `upload.single('image')` + `validateProductInfo` están bien encadenados, pero el controlador no espera a `Product.create`.

#### `src/routes/userRoutes.js`

| Línea | Ruta | Controlador | Comentario |
|---|---|---|---|
| 14 | `GET /listado` | `indice` | Lista usuarios; protegida con `adminMiddleware`. |
| 19-20 | `GET/POST /register` | `register` / `createUser` | Registro con avatar y validación. |
| 24-25 | `GET/POST /login` | `login` / `processLogin` | Duplicado de `mainRoutes`. |
| 29 | `GET /profile` | `profile` | Duplicado de `mainRoutes`. |
| 31-32 | `GET/PUT /edit` | `edit` / `update` | Sin middleware de protección. |
| 34-35 | delete | — | Comentado. |

**Problemas:**

- Duplicación de login y profile.
- `/edit` está abierta.
- No hay ruta para editar/eliminar usuarios desde el listado admin.
- `PUT /edit` no usa `upload.single('avatar')`, así que el avatar no se puede actualizar.

### 2.3 Controladores

#### `src/controllers/controller.js`

- `index`: renderiza `users/index` (la home).
- `profile`: duplica el perfil de `userController`.
- `logout`: destruye la sesión y limpia cookies.

**Problema en `logout`:**

```js
res.clearCookie('userLogged', 'adminLogged');
```

`clearCookie` recibe **un nombre** y, opcionalmente, opciones. Pasar dos strings no limpia las dos cookies. Hay que hacer dos llamadas:

```js
res.clearCookie('userLogged');
res.clearCookie('adminLogged');
```

Además, `req.session.destroy()` es asíncrono; conviene redirigir en el callback.

#### `src/controllers/productController.js`

| Método | Qué hace | Comentario |
|---|---|---|
| `listaProductos` | `Product.findAll()` y renderiza `listaMysql` | La vista no existe. |
| `category` | Filtra por `products_categories_id` con if/else | Funciona, pero un `switch` o un mapa sería más limpio. |
| `index` | `Product.findAll()` y renderiza `productList` | Listado completo. |
| `productCatalogue` | `Product.findAll({ where: { products_categories_id: 1 } })` | Solo plantas. |
| `productDetail` | `Product.findByPk(req.params.id)` | No valida si `planta` es `null`. |
| `create` | Renderiza `formLoad` | Formulario. |
| `store` | Valida, arma `newPlanta`, `Product.create` | No usa `await`; `req.file.filename` puede explotar si no hay archivo. |
| `edit` | `findByPk` y renderiza `formularioEdit` | Bien. |
| `update` | `Product.update(...)` | No actualiza imagen; usa `disonible`. |
| `delete` | `findByPk` y renderiza `delete` | Bien. |
| `destroy` | `Product.destroy(...)` | No usa `await`. |
| `productCart` | Renderiza `productCart` | Vista estática. |

**Problemas concretos:**

- `const dataBaseProducts = JSON.parse(...)` es legado y no se usa.
- `req.file.filename` sin comprobar `req.file`.
- `Product.create` y `Product.destroy` sin `await`.
- `"disonible"` no existe en el modelo; se ignora.
- `update` no guarda imagen nueva.
- No hay control de stock.

#### `src/controllers/userController.js`

| Método | Qué hace | Comentario |
|---|---|---|
| `indice` | `User.findAll()` y renderiza `userList` | Trae también el hash de la contraseña; no se muestra, pero se carga. |
| `register` | Renderiza el formulario | Bien. |
| `createUser` | Valida, busca email duplicado, hashea, crea | `req.file.filename` sin guard; error de nombre mal mapeado en la vista. |
| `login` | Renderiza login | Bien. |
| `processLogin` | Valida, busca usuario, compara bcrypt, guarda sesión | Cookie de "recordarme" con nombres inconsistentes. |
| `edit` | Renderiza `formularioEditUser` con el usuario de sesión | Bien. |
| `update` | `User.update(...)` | `where: { email: req.params.email }` → `undefined`; rompe. |
| `profile` | Renderiza `userProfile` | Bien. |

**Problemas concretos:**

- `createUser`: si no hay avatar, `req.file.filename` lanza error.
- `createUser`: `user_categories_id: '2'` como string; funciona, pero conviene número.
- `processLogin`: `req.body.rememberme` vs `name="remember"`.
- `processLogin`: `res.cookie('userCookie', ...)` vs middleware que lee `userLogged`.
- `processLogin`: `maxage` en minúscula; debe ser `maxAge`.
- `processLogin`: catch renderiza `error`, vista que no existe.
- `update`: usa `req.params.email` y no el usuario de sesión.
- `update`: si `req.body.password` viene vacío, hashea vacío y cambia la contraseña.
- `update`: no actualiza avatar.
- Quedan bloques grandes de código JSON comentado.

### 2.4 Modelos

#### `database/models/index.js`

- Lee todos los archivos `.js` de la carpeta (excepto `index.js`).
- Llama a cada modelo con `(sequelize, DataTypes)`.
- Ejecuta `associate` si existe.
- Exporta `db.sequelize`, `db.Sequelize` y cada modelo.

**Advertencia:** al requerir `sequelize` desde `index.js` dentro de cada modelo, se genera una dependencia circular. Es el origen del warning:

```
Warning: Accessing non-existent property 'sequelize' of module exports inside circular dependency
```

No rompe, pero se puede evitar pasando `sequelize` como argumento (que ya se hace) y no importándolo desde `index.js` en cada modelo.

#### `database/models/Product.js`

- Tabla: `products`.
- Columnas: `id`, `name`, `price`, `description`, `image`, `stock`, `products_categories_id`.
- `timestamps: false`.
- Asociación: `belongsTo(ProductCategory)`.

**Problemas:**

- No tiene `available` (o `disponible`), aunque el controlador intenta guardarlo.
- `price` es `DECIMAL`; Sequelize lo devuelve como string. Si hacés cuentas, convertí con `Number()`.
- No tiene `created_at`/`updated_at`; está bien con `timestamps: false`.

#### `database/models/User.js`

- Tabla: `users`.
- Columnas: `id`, `name`, `surname`, `email`, `password`, `phone`, `avatar`, `user_categories_id`.
- `timestamps: false`.
- Asociación: `belongsTo(UserCategory)`.

**Problemas:**

- `foreignKey: "userCategories_id"` (debería ser `user_categories_id`).
- No tiene `bio`.
- No tiene `deleted_at` (soft delete).
- No hay `paranoid`.
- `email` no es único a nivel SQL.

#### `database/models/ProductCategory.js`

- Tabla declarada: `tablename` (minúscula) → Sequelize la ignora.
- Columna JS: `name`; columna SQL: `type`.
- Resultado: busca `product_categories` y la columna `name`.

**Solución:**

```js
let cols = {
  id: { /* ... */ },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'type',
  },
};

let config = {
  tableName: 'productscategories',
  timestamps: false,
  underscored: true,
};
```

#### `database/models/UserCategory.js`

- No tiene `tableName`.
- No tiene `timestamps: false`.
- Columna JS: `name`; columna SQL: `type`.
- Resultado: busca `user_categories`, con `createdAt` y `updatedAt`, que no existen.

**Solución:**

```js
let cols = {
  id: { /* ... */ },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'type',
  },
};

let config = {
  tableName: 'usercategories',
  timestamps: false,
  underscored: true,
};
```

### 2.5 Middlewares

| Archivo | Qué hace | Problema |
|---|---|---|
| `userLoggedMdlw.js` | Setea `res.locals.isLogged` y `userLogged` desde la sesión | Lee `req.cookies.userLogged`, pero el login guarda `userCookie`. |
| `adminLoggedMiddleware.js` | Setea `res.locals.adminLogged` | Primero lo pone en `true` y después lo reemplaza por el objeto; confuso. |
| `authMdlw.js` | Si hay `userLogged`, redirige a `/profile` | No contempla `admin`; se usa en `GET/POST /login`. |
| `guestMdlw.js` | Si no hay login, redirige a `/login` | Se importa pero no se usa. |
| `adminMiddleware.js` | Si no hay `req.session.admin`, redirige a `/` | Bien, pero solo se usa en `/users/listado`. |
| `multer.js` | Guarda archivos en `public/Images` con nombre `product-<timestamp>` | Usa el prefijo `product-` también para avatares. No valida extensión ni tamaño. |
| `validationsRegister.js` | Valida email, nombre, apellido, contraseña y celular | La validación de avatar está comentada. |
| `validationsProducts.js` | Valida nombre, descripción, precio, cantidad e imagen | `isCurrency()` puede ser muy estricto; el mensaje de descripción dice 300 pero pide 10. |

**Cómo se usa un middleware:**

```js
router.post(
  '/register',
  upload.single('avatar'),   // primero procesa el archivo
  validateRegister,          // después valida los campos
  userController.createUser  // al final, el controlador
);
```

El orden importa: si `validateRegister` va antes de `upload`, `req.file` todavía no existe.

### 2.6 Vistas EJS

#### `src/views/partials/head.ejs`

- Meta tags, CSS global, fuentes, Font Awesome.
- Se incluye con `<%- include('../partials/head.ejs') %>`.
- `<%-` inserta HTML sin escapar; `<%=` escapa.

#### `src/views/partials/header.ejs`

- Barra de navegación.
- Usa `locals.isLogged` y `locals.adminLogged`.
- Muestra avatar y nombre.
- Incluye el carrito y la navegación inferior.

**Problemas:**

- Usa `locals.userLogged.usuario` y `locals.adminLogged.usuario`; el modelo tiene `name`.
- El `<ul>` y el `<div>` están mal cerrados.
- Los links relativos (`../users/register`, `list`, `cart`) pueden romperse según la URL actual.
- El buscador es un `<div>` con `action`, no un `<form>`.
- El input es `readonly`.

#### `src/views/partials/footer.ejs`

- Footer simple.
- Sin problemas relevantes.

#### `src/views/users/index.ejs`

- Home.
- Tiene su propio header (no usa el partial).
- Categorías con links a `/products/category/1..4`.
- "Más vendidos" y "Catálogo" están **hardcodeados** con cuatro productos.
- Incluye `carrito.js`.

**Problema:** si agregás un producto en la BD, no aparece en la home hasta que edites el HTML.

#### `src/views/auth/login.ejs`

- Formulario de login.
- `action="./login"` (relativo).
- Campos `email` y `contrasena`.
- Checkbox `name="remember"`.
- Muestra `errors.email.msg` y `errors.contrasena.msg`.
- Incluye `loginValidation.js`.

**Problemas:**

- El controlador pasa `error`, no `errors`.
- El checkbox se llama `remember`, el controlador busca `rememberme`.
- `action="./login"` funciona desde `/login`, pero no desde `/users/login`.
- El botón tiene un `<a>` adentro, lo cual es HTML inválido.

#### `src/views/users/register.ejs`

- Formulario de registro.
- `action="./register"`, `method="post"`, `enctype="multipart/form-data"`.
- Campos: `email`, `nombre`, `apellido`, `contrasena`, `cel`, `avatar`.
- Muestra errores con `mensajeDeError.<campo>`.
- Incluye `index.js`.

**Problemas:**

- Para el nombre, la vista busca `mensajeDeError.usuario`, pero el validador usa `nombre`.
- No hay confirmación de contraseña (está comentada).
- Si no se sube avatar, el controlador explota.
- El header está duplicado en vez de usar el partial.

#### `src/views/users/userProfile.ejs`

- Muestra avatar, nombre, email, teléfono y BIO.
- Links a logout, editar y eliminar.
- Si es admin, muestra funciones extra.

**Problemas:**

- "Eliminar perfil" tiene `href=""`.
- La BIO es Lorem ipsum.
- Los links del bottom nav apuntan a `/index`, `/register`, `/ProductCart`, que no son las rutas reales.
- Usa `user.name + ' ' + user.surname`, correcto.

#### `src/views/users/formularioEditUser.ejs`

- Formulario de edición.
- `action="/users/edit?_method=PUT"`.
- Campos: `name`, `surname`, `email`, `password`, `phone`, `image`, `categoria`.

**Problemas:**

- No tiene `enctype="multipart/form-data"`.
- Muestra `user.password` en un input; después del login se borra de la sesión, así que aparece vacío (o peor, si no se borra, expone el hash).
- El input de imagen no tiene el atributo `value` correcto.
- Los radios usan `selected` (inválido) y comparan el id con textos.
- No hay `bio`.
- No hay validación.

#### `src/views/users/userList.ejs`

- Lista usuarios.
- Links a `/<id>` para editar/eliminar.

**Problemas:**

- Incluye el header fuera de `<html>`/`<head>`.
- Los links no apuntan a rutas reales.
- No muestra email ni categoría.
- No hay botón de eliminar funcional.

#### `src/views/users/adminProfile.ejs`

- Perfil de admin.
- **No se renderiza desde ningún controlador.**
- Usa `user.usuario`.

#### `src/views/products/productList.ejs`

- Listado de productos.
- Recorre `plantasList`.
- Si es admin, muestra "Crear", "Editar" y "Eliminar".
- Botón "Agregar" con `id="prueba"`.

**Problemas:**

- El botón "Agregar" no tiene lógica real.
- Los links del bottom nav son relativos y algunos no existen.
- El `id="prueba"` se repite en cada producto; los IDs deben ser únicos.

#### `src/views/products/productDetail.ejs`

- Detalle de producto.
- Muestra imagen, nombre, precio, cantidad, descripción.
- Botones de editar, borrar y agregar al carrito.
- Productos relacionados hardcodeados.

**Problemas:**

- Editar/borrar se muestran a cualquier usuario, no solo al admin.
- "Agregar a favoritos" no tiene lógica.
- Los relacionados están hardcodeados.
- El bottom nav apunta a `/index`, `/register`, `/ProductCart`, que no existen.
- El `<select>` tiene el texto "Cantidad" suelto.

#### `src/views/products/vistaCategory.ejs`

- Listado por categoría.
- Recorre `category`.
- Similar a `productList`.

**Problemas:**

- Mismos links relativos.
- El botón "Agregar" no tiene lógica.
- `id="prueba"` repetido.

#### `src/views/products/formLoad.ejs`

- Formulario de creación.
- `action="./create"`, `method="post"`, `enctype="multipart/form-data"`.
- Campos: `name`, `categoria`, `descripcion`, `precio`, `cantidad`, `image`.
- Muestra errores por campo.
- Incluye `createProValidation.js`.

**Problemas:**

- `action="./create"` es relativo; funciona desde `/products/create`, pero es frágil.
- El `<textarea>` usa `value`, que no es válido; el contenido debe ir entre las etiquetas.
- Los radios no tienen `checked` ni validación.
- El input de imagen es `required`, pero el backend no valida extensión.
- El `<label>` de categoría envuelve radios, pero el `for` no corresponde.

#### `src/views/products/formularioEdit.ejs`

- Formulario de edición.
- `action="/products/edit/<id>?_method=PUT"`.
- Campos: `name`, `categoria`, `descripcion`, `precio`, `cantidad`, `image`.

**Problemas:**

- No tiene `enctype="multipart/form-data"`.
- Los radios usan `selected` y comparan con textos.
- El input de imagen tiene `product.image` como atributo, lo cual no es válido.
- `type="price"` no existe; debe ser `number` con `step`.
- No muestra errores de validación.
- No permite quitar la imagen.

#### `src/views/products/delete.ejs`

- Confirmación de borrado.
- Muestra imagen, nombre y descripción.
- `action="/products/delete/<id>?_method=DELETE"`.

**Problema:**

- Usa `planta.descripcion`, pero el campo es `description`.

#### `src/views/products/productCart.ejs`

- Carrito.
- Tiene dos productos hardcodeados (Begonia y Syngonium).
- Total hardcodeado.
- Botones sin lógica.

**Problema:** no refleja ningún carrito real.

#### `src/views/404.ejs`

- Página 404.
- Duplica el header en vez de incluirlo.
- Usa `locals.userLogged.usuario`.

### 2.7 API

#### `src/api/routes/apiProductRoutes.js`

- `GET /` → `findAll`.
- `GET /:id` → `show`.
- `POST`, `DELETE` y `search` están comentados.

#### `src/api/controller/apiProductController.js`

- `findAll`: `DB.Product.findAll()` y responde JSON con `status`, `total` y `data`.
- `show`: `findByPk` y responde JSON con `id`, `name`, `price`, `description`, `image`.

**Problemas:**

- `atributes` está mal escrito (debería ser `attributes`); no rompe porque el `map` elige los campos, pero no filtra la consulta.
- `show` no valida si el producto es `null`.
- No hay `try/catch`.
- Las URLs de detalle e imagen están hardcodeadas a `http://localhost:3006`.
- No hay paginación.

#### `src/api/routes/apiUsersRoutes.js`

- `GET /` → `list`.
- `GET /:id` → `detail`.

#### `src/api/controller/apiUsersController.js`

- `list`: `User.findAll` con `id`, `name`, `email`; responde `status`, `count`, `users`.
- `detail`: `findByPk` y responde datos del usuario.

**Problemas:**

- No hay `try/catch`.
- `detail` no valida `null`.
- URL hardcodeada.
- No hay paginación.
- No hay endpoints de escritura.

### 2.8 JavaScript del front

#### `public/js/index.js`

- Validación del formulario de registro.
- Verifica email, nombre, apellido, contraseña, teléfono e imagen.
- Agrega mensajes a `.errores .ulErrores`.

**Problemas:**

- En la rama de imagen válida hace `document.getElementById` sin argumento; no rompe, pero está mal.
- Si el formulario no existe en la página, `form` es `null` y falla; solo se incluye en registro, así que hoy no pasa.
- La validación de imagen solo mira la extensión.

#### `public/js/loginValidation.js`

- Validación del formulario de login.
- Verifica email y contraseña.
- Agrega mensajes a `.errorLogin .errorList`.

**Problemas:**

- Si el formulario no existe, falla; solo se incluye en login.
- No valida longitud de contraseña.

#### `public/js/createProValidation.js`

- Validación del formulario de creación de producto.
- Verifica nombre, descripción, precio y cantidad.
- La validación de categoría está comentada.
- No valida imagen.

#### `public/js/carrito.js`

- **Es un stub.**
- Escucha clicks en `#prueba`, pero no hace nada.
- Todo el código de agregar al carrito está comentado.

### 2.9 SQL y base de datos

#### `BaseProyecto/Terra.sql`

- Crea las tablas `products`, `productscategories`, `usercategories` y `users`.
- Agrega claves primarias, índices y foreign keys.
- **No incluye `CREATE DATABASE` ni `USE terra`**: hay que crear la base y seleccionarla antes.
- `users` no tiene `UNIQUE` en `email`.
- `users` no tiene `bio` ni `deleted_at`.
- `products` no tiene `available`.
- `products.price` es `DECIMAL(10,0)`.
- `users.avatar` es `VARCHAR(255) NOT NULL`.

#### `BaseProyecto/BaseTerra.sql`

- Inserta categorías, usuarios y productos.
- **Las contraseñas están en texto plano (`'10'`)**.
- Hay usuarios duplicados por email:
  - `ro@general.com` (ids 1 y 4)
  - `mai@admin.com` (ids 2 y 5)
  - `mai@gen.com` (ids 3 y 6)
- Los avatares son literales hexadecimales (`0x...`) que representan nombres de archivo; varios no existen en `public/Images`.
- Inserta 22 productos.

#### `BaseProyecto/instrucciones.md`

- Dice crear el usuario `eterra` con clave null.
- Crear la base `terra`.
- Correr `Terra.sql` y después `BaseTerra.sql`.

#### `.sequelizerc`

- Apunta a `database/config/config.js`, `database/models`, `database/migrations` y `database/seeders`.
- **Las carpetas `migrations` y `seeders` no existen.**
- Si corrés `npx sequelize-cli db:migrate`, probablemente falle o no haga nada.

### 2.10 Configuración y scripts

#### `package.json`

- Dependencias: `bcryptjs`, `cookie-parser`, `cors`, `dotenv`, `ejs`, `express`, `express-session`, `express-validator`, `method-override`, `multer`, `mysql2`, `sequelize`.
- Dev: `nodemon`, `sequelize-cli`.
- `start`: `node src/app.js -e, ejs,json,js,njs` (los argumentos extra no se usan).
- `dev`: `nodemon src/app.js`.
- `test`: `echo "Error: no test specified" && exit 1`.

**Problemas:**

- `main` dice `app.js`, pero el entry real es `src/app.js`.
- No hay scripts para crear la base, seed o admin.
- No hay tests.

#### `.gitignore`

- Ignora `node_modules/`, `.DS_Store/` y `wireframes/`.
- **No ignora `.env`**.
- `# BaseProyecto/` está comentado, así que la carpeta se commitea.

#### `README.md`

- Describe el proyecto y los wireframes.
- Dice `node app.js` desde la terminal, pero el archivo real es `src/app.js`.
- No explica cómo crear la base, el `.env` ni los usuarios de prueba.
- El link del repositorio no coincide con el remoto actual.

#### `daily.md`, `retro.md`, `dudas.md`

- `daily.md`: bitácora de sprints.
- `retro.md`: retrospectivas; la sección "sprint FINAL" define prioridades.
- `dudas.md`: preguntas abiertas sobre Sequelize, la BD y los condicionales en partials.

---

## 3. Inventario de bugs

| # | Severidad | Archivo | Línea aprox. | Bug | Fase |
|---|---|---|---|---|---|
| 1 | Alta | `database/models/ProductCategory.js` | 20 | `tablename` en minúscula; tabla y columna mal mapeadas | 2 |
| 2 | Alta | `database/models/UserCategory.js` | 18-22 | Sin `tableName` ni `timestamps: false`; columna `name` vs `type` | 2 |
| 3 | Alta | `database/models/User.js` | 54 | FK `userCategories_id` en vez de `user_categories_id` | 2 |
| 4 | Alta | `BaseProyecto/BaseTerra.sql` | 28-34 | Contraseñas en texto plano; usuarios duplicados | 1-2 |
| 5 | Alta | `src/controllers/userController.js` | 230 | `where: { email: req.params.email }` | 5 |
| 6 | Alta | `src/controllers/userController.js` | 65 | `req.file.filename` sin comprobar `req.file` | 3 |
| 7 | Alta | `src/api/controller/*.js` | — | Sin `try/catch`; un error de BD tumba el proceso | 4 |
| 8 | Alta | `src/app.js` | 36-42 | `secret` hardcodeado; `saveUninitialized: true` | 3 |
| 9 | Media | `src/controllers/productController.js` | 129 | `req.file.filename` sin comprobar | 2 |
| 10 | Media | `src/controllers/productController.js` | 134, 189 | `create`/`destroy` sin `await` | 2 |
| 11 | Media | `src/controllers/productController.js` | 131, 162 | `disonible` no existe en el modelo | 2 |
| 12 | Media | `src/controllers/userController.js` | 172-174 | Cookie `userCookie` vs `userLogged`; `maxage` | 3 |
| 13 | Media | `src/controllers/userController.js` | 193 | `res.render('error')` sin vista | 4 |
| 14 | Media | `src/controllers/controller.js` | 31-32 | `clearCookie` con dos nombres | 3 |
| 15 | Media | `src/views/partials/header.ejs` | 35, 42 | `usuario` en vez de `name` | 3 |
| 16 | Media | `src/views/auth/login.ejs` | 76-84 | `errors` vs `error` | 3 |
| 17 | Media | `src/views/users/register.ejs` | 96 | `mensajeDeError.usuario` vs `nombre` | 3 |
| 18 | Media | `src/views/products/formularioEdit.ejs` | 20-44 | Sin `enctype`; radios con `selected`; `type="price"` | 2 |
| 19 | Media | `src/views/products/delete.ejs` | 27 | `planta.descripcion` vs `description` | 2 |
| 20 | Media | `src/routes/productRoutes.js` | 13 | Renderiza `listaMysql` inexistente | 4 |
| 21 | Media | `src/routes/productRoutes.js` | 43, 45 | Ruta `/cart` duplicada | 8 |
| 22 | Media | `src/views/products/productCart.ejs` | 32-81 | Carrito hardcodeado | 6 |
| 23 | Media | `public/js/carrito.js` | 1-62 | Stub sin lógica | 6 |
| 24 | Baja | `src/app.js` | 47-48 | `express.static('views')` expone vistas | 8 |
| 25 | Baja | `src/app.js` | 4-8 | Imports sin usar | 8 |
| 26 | Baja | `src/api/controller/apiProductController.js` | 9 | `atributes` mal escrito | 4 |
| 27 | Baja | `src/api/controller/*.js` | 20, 34 | URLs hardcodeadas | 4 |
| 28 | Baja | `src/views/users/userList.ejs` | 16-23 | Links a `/<id>` inexistentes | 5 |
| 29 | Baja | `src/views/products/productDetail.ejs` | 61-62 | Editar/borrar visibles para todos | 5 |
| 30 | Baja | `README.md` | 16 | `node app.js` en vez de `node src/app.js` | 1 |
| 31 | Baja | `package.json` | 8 | `start` con argumentos inútiles | 8 |
| 32 | Baja | `.gitignore` | — | No ignora `.env` | 1 |
| 33 | Baja | `.sequelizerc` | — | Apunta a carpetas inexistentes | 8 |

---

## 4. Plan de cambios por fases

### Mapa de dependencias

```
Fase 0: ordenar el terreno
   │
Fase 1: entorno + MySQL + .env
   │
Fase 2: modelos + esquema SQL
   │
   ├── Fase 3: auth + sesiones
   │      ├── Fase 5: CRUD usuarios + soft delete
   │      └── Fase 6: carrito
   │
   ├── Fase 4: errores + robustez (puede ir en paralelo)
   │
   └── Fase 7: home dinámica + búsqueda
          │
Fase 8: limpieza, tests, documentación
```

| Fase | Objetivo | Tiempo estimado | Depende de |
|---|---|---|---|
| 0 | Ordenar Git y entender el estado | 30 min | — |
| 1 | Que la app corra con MySQL real | 2-3 h | 0 |
| 2 | Que los modelos coincidan con la BD | 3-4 h | 1 |
| 3 | Login/registro/perfil/admin estables | 4-5 h | 1, 2 |
| 4 | Que ningún error tumbe el servidor | 2 h | 1 |
| 5 | Editar/eliminar usuarios + soft delete | 4-5 h | 2, 3 |
| 6 | Carrito funcional | 6-8 h | 2, 3 |
| 7 | Home dinámica y buscador | 3 h | 2 |
| 8 | Limpieza, tests, README | 3-4 h | Todas |

---

### Fase 0 — Ordenar el terreno (30 min)

**Objetivo:** empezar con un estado limpio y una rama de trabajo.

**Pasos:**

1. Revisar el cambio pendiente:
   ```bash
   git status
   git diff src/app.js
   ```
   Es solo un comentario. Decidí si lo commiteás o lo descartás.

2. Crear una rama:
   ```bash
   git switch -c retomar/entorno-modelos
   ```

3. Verificar versiones:
   ```bash
   node -v
   npm -v
   ```
   El proyecto es de 2023. Si Node 24 da problemas con dependencias viejas, instalá Node 20 LTS. Más adelante conviene un `.nvmrc`.

4. Leer `README.md`, `BaseProyecto/instrucciones.md` y `retro.md` (la sección "sprint FINAL" ya define prioridades: carrito, edición, soft delete, BIO).

**Criterio de éxito:** rama creada, `git status` limpio y sabés cuál es el alcance del sprint.

---

### Fase 1 — Entorno reproducible (2-3 h)

**Objetivo:** que la app funcione contra MySQL real, sin credenciales hardcodeadas.

**Archivos a tocar:**

- `.env` (nuevo, no se commitea)
- `.env.example` (nuevo, sí se commitea)
- `.gitignore`
- `database/config/config.js`
- `README.md`
- Opcional: `scripts/create-admin.js`

#### Paso 1.1 — Crear la base y el usuario

En MySQL:

```sql
CREATE DATABASE terra CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
CREATE USER 'eterra'@'localhost' IDENTIFIED BY 'eterra123';
GRANT ALL PRIVILEGES ON terra.* TO 'eterra'@'localhost';
FLUSH PRIVILEGES;
```

Después ejecutar los scripts **indicando la base**, porque `Terra.sql` no incluye `USE terra`:

```bash
mysql -u eterra -p terra < BaseProyecto/Terra.sql
mysql -u eterra -p terra < BaseProyecto/BaseTerra.sql
```

#### Paso 1.2 — Crear `.env`

```env
PORT=3006
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=terra
DB_USER=eterra
DB_PASSWORD=eterra123
SESSION_SECRET=cambia-esto-por-algo-largo-y-random
```

`.env.example` va con los mismos nombres pero valores vacíos.

#### Paso 1.3 — Hacer que `config.js` lea el entorno

```js
// database/config/config.js
require('dotenv').config();

const base = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD || null,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 3306,
  dialect: 'mysql',
};

module.exports = {
  development: base,
  test: { ...base, database: process.env.DB_NAME_TEST || base.database },
  production: base,
};
```

**Por qué:** hoy las credenciales están escritas en el archivo. Eso impide que otra persona levante el proyecto sin editar código, y hace fácil commitear datos sensibles.

#### Paso 1.4 — Verificar la conexión

```bash
node -e "const {sequelize}=require('./database/models'); sequelize.authenticate().then(()=>{console.log('DB OK');process.exit(0)}).catch(e=>{console.error('DB ERROR:',e.message);process.exit(1)})"
```

Si dice `DB OK`, ya tenés la base conectada.

#### Paso 1.5 — Crear un admin real

El problema: `BaseTerra.sql` guarda las contraseñas como `'10'` en texto plano, pero el login usa `bcrypt.compareSync`. Un hash bcrypt se ve así:

```
$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
```

`'10'` no es un hash, así que `compareSync` siempre devuelve `false`. Por eso los usuarios seed no pueden entrar.

Opción A: generar el hash y actualizar el SQL.

```bash
node -e "console.log(require('bcryptjs').hashSync('Admin1234', 10))"
```

Copiás el resultado en `BaseTerra.sql` y volvés a correr el seed.

Opción B (más mantenible): crear un script `scripts/create-admin.js`:

```js
require('dotenv').config();
const bcrypt = require('bcryptjs');
const { User, sequelize } = require('../database/models');

(async () => {
  try {
    const [admin, created] = await User.findOrCreate({
      where: { email: 'admin@eterra.com' },
      defaults: {
        name: 'Admin',
        surname: 'E-Terra',
        password: bcrypt.hashSync('Admin1234', 10),
        phone: '3000000000',
        avatar: 'defaultUser.png',
        user_categories_id: 1,
      },
    });

    console.log(created ? 'Admin creado' : 'Admin ya existía');
    await sequelize.close();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
```

Y agregar a `package.json`:

```json
"db:admin": "node scripts/create-admin.js"
```

#### Paso 1.6 — Actualizar el README

Debe explicar:

- Requisitos (Node, MySQL).
- Crear base y usuario.
- Correr `Terra.sql` y `BaseTerra.sql`.
- Crear `.env`.
- `npm install`, `npm run dev`.
- Usuario admin de prueba.
- Rutas principales.

**Criterio de éxito:**

- `sequelize.authenticate()` responde OK.
- `/products/list` muestra productos reales.
- Podés loguearte con el admin creado.

---

### Fase 2 — Modelos y esquema (3-4 h)

**Objetivo:** que los modelos de Sequelize apunten exactamente a las tablas y columnas del SQL.

**Archivos:**

- `database/models/ProductCategory.js`
- `database/models/UserCategory.js`
- `database/models/User.js`
- `database/models/Product.js`
- `database/models/index.js` (solo si hace falta)
- `BaseProyecto/Terra.sql`
- `BaseProyecto/BaseTerra.sql`
- `src/controllers/productController.js` (campo `disonible`)

#### Cambio 2.1 — `ProductCategory`

```js
let cols = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'type', // en SQL la columna se llama "type"
  },
};

let config = {
  tableName: 'productscategories',
  timestamps: false,
  underscored: true,
};
```

#### Cambio 2.2 — `UserCategory`

```js
let cols = {
  id: { /* ... */ },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'type',
  },
};

let config = {
  tableName: 'usercategories',
  timestamps: false,
  underscored: true,
};
```

Hoy le faltan `tableName` y `timestamps: false`, y usa `name` contra una columna `type`. Por eso Sequelize busca `user_categories` con `createdAt`/`updatedAt`, que no existen.

#### Cambio 2.3 — Foreign key de `User`

```js
User.belongsTo(models.UserCategory, {
  as: 'userCategories',
  foreignKey: 'user_categories_id', // antes decía userCategories_id
});
```

#### Cambio 2.4 — Agregar campos que el proyecto necesita

En `Product`:

```js
available: {
  type: DataTypes.BOOLEAN,
  allowNull: false,
  defaultValue: true,
},
```

En `User`:

```js
bio: {
  type: DataTypes.TEXT,
  allowNull: true,
},
```

Y para soft delete, en la config del `User`:

```js
let config = {
  tableName: 'users',
  timestamps: false,
  underscored: true,
  paranoid: true, // agrega deletedAt; con underscored queda deleted_at
};
```

Verificá que quede bien:

```js
const db = require('./database/models');
console.log(db.User.rawAttributes.deletedAt);
```

Si no toma `deleted_at`, definilo explícitamente o hacé el soft delete a mano con `deleted_at` + `where: { deleted_at: null }`.

#### Cambio 2.5 — SQL

```sql
ALTER TABLE products
  ADD COLUMN available TINYINT(1) NOT NULL DEFAULT 1;

ALTER TABLE users
  ADD COLUMN bio TEXT NULL,
  ADD COLUMN deleted_at DATETIME NULL;
```

Para `email` único, **primero limpiá los duplicados** del seed. `BaseTerra.sql` tiene tres pares repetidos:

- `ro@general.com` (ids 1 y 4)
- `mai@admin.com` (ids 2 y 5)
- `mai@gen.com` (ids 3 y 6)

Después:

```sql
ALTER TABLE users
  ADD UNIQUE KEY uniq_users_email (email);
```

#### Cambio 2.6 — Corregir `disonible`

En `productController.js`, donde dice `"disonible": req.body.disponible`, debe decir `"available"`. El modelo ignora silenciosamente los atributos que no conoce, así que hoy ese dato se pierde.

#### Verificación

```js
const db = require('./database/models');

(async () => {
  console.log('Categorías de producto:', await db.ProductCategory.findAll());
  console.log('Categorías de usuario:', await db.UserCategory.findAll());
  console.log('Productos con categoría:', await db.Product.findAll({
    include: [{ model: db.ProductCategory, as: 'productsCategories' }],
  }));
  process.exit(0);
})();
```

**Criterio de éxito:** no aparece ningún error de "table doesn't exist" ni "unknown column".

**Nota sobre migraciones:** este proyecto no tiene carpeta `database/migrations` (aunque `.sequelizerc` la menciona). Para un proyecto de aprendizaje, lo más simple es mantener el SQL como fuente de verdad y actualizar los scripts. Si querés hacerlo "bien", la fase 8 puede incluir migraciones con `sequelize-cli`. No lo haría ahora: agrega complejidad antes de que el core funcione.

---

### Fase 3 — Auth, sesiones y roles (4-5 h)

**Objetivo:** que registro, login, perfil, logout y admin funcionen de punta a punta.

**Archivos:**

- `src/controllers/userController.js`
- `src/routes/mainRoutes.js`
- `src/routes/userRoutes.js`
- `src/middlewares/userLoggedMdlw.js`
- `src/middlewares/adminLoggedMiddleware.js`
- `src/middlewares/authMdlw.js`
- `src/middlewares/guestMdlw.js`
- `src/views/auth/login.ejs`
- `src/views/users/register.ejs`
- `src/views/partials/header.ejs`
- `src/controllers/controller.js` (logout)
- `src/app.js` (sesión)

#### Cambio 3.1 — Unificar rutas

Hoy hay duplicados:

- `/login` y `/users/login`
- `/profile` y `/users/profile`

Elegí uno canónico. Recomiendo:

- `GET/POST /login` en `mainRoutes`.
- `GET /profile` en `mainRoutes`.
- En `userRoutes`, dejar solo `/users/register` y las rutas de administración.

Si querés conservar las otras, que redirijan:

```js
router.get('/users/login', (req, res) => res.redirect('/login'));
```

**Por qué:** dos rutas para lo mismo generan comportamientos distintos y confunden el debug.

#### Cambio 3.2 — Arreglar "recordarme"

Hoy el formulario manda `remember`:

```ejs
<input type="checkbox" name="remember" id="remember">
```

Pero el controlador busca `rememberme`. Además guarda una cookie llamada `userCookie` y el middleware lee `userLogged`. Todo tiene que usar el mismo nombre.

Opción simple:

```js
if (req.body.remember) {
  res.cookie('userLogged', userToLogin.dataValues, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: 'lax',
  });
}
```

Y en el middleware:

```js
if (req.cookies && req.cookies.userLogged) {
  res.locals.userLogged = req.cookies.userLogged;
  res.locals.isLogged = true;
}
```

**Nota de seguridad:** guardar el objeto completo del usuario en una cookie es manipulable por el cliente. Para el proyecto final alcanza, pero lo correcto es guardar solo el `id` en una cookie firmada (`signed: true`) y volver a buscar el usuario en la BD. Si querés, lo hacemos así directamente.

#### Cambio 3.3 — Logout

```js
logout: (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('userLogged');
    res.clearCookie('adminLogged');
    res.redirect('/');
  });
},
```

Hoy se limpian nombres que no coinciden con las cookies reales.

#### Cambio 3.4 — Header

En `header.ejs` y `index.ejs` dice:

```ejs
<%= locals.userLogged.usuario %>
```

Pero el modelo tiene `name`. Debe ser:

```ejs
<%= locals.userLogged.name %>
```

#### Cambio 3.5 — Errores de validación

Unificá el nombre del objeto de errores. Hoy el login pasa `error` y la vista lee `errors`; el registro valida `nombre` pero la vista busca `mensajeDeError.usuario`.

Regla: **el nombre del campo en el formulario, en el validador y en la vista tiene que ser el mismo**.

- Formulario: `name="nombre"`.
- Validador: `body('nombre')`.
- Vista: `mensajeDeError.nombre`.

#### Cambio 3.6 — Registro sin avatar

Hoy hace:

```js
let avatar = req.file.filename;
```

Si el usuario no sube imagen, `req.file` es `undefined` y explota. Solución:

```js
let avatar = req.file ? req.file.filename : 'defaultUser.png';
```

Y en el validador, si querés que la imagen sea obligatoria, descomentá la validación de `avatar`. Si no, dejá el default.

#### Cambio 3.7 — Sesión

En `app.js`:

```js
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
```

`saveUninitialized: false` evita crear sesiones vacías. El secreto va al `.env`.

#### Cambio 3.8 — Middlewares de protección

Usá `guestMdlw` para rutas que requieren login:

```js
router.get('/profile', guestMdlw, userController.profile);
router.get('/users/edit', guestMdlw, userController.edit);
```

Y `adminMiddleware` para las de admin:

```js
router.get('/users/listado', adminMiddleware, userController.indice);
```

Hoy `guestMdlw` se importa pero no se usa, y `/users/edit` está abierta.

#### Flujo completo para probar

```
1. GET /users/register → formulario
2. POST /users/register → crea usuario con hash
3. GET /login → formulario
4. POST /login → busca, compara bcrypt, guarda sesión
5. GET /profile → muestra nombre, email, teléfono, avatar
6. GET /users/edit → formulario con datos
7. PUT /users/edit → actualiza
8. GET /logout → destruye sesión
```

**Criterio de éxito:** podés hacer ese recorrido sin errores y el header muestra tu nombre.

---

### Fase 4 — Errores y robustez (2 h)

**Objetivo:** que un error de BD no tumbe el servidor y que las respuestas sean coherentes.

**Archivos:**

- `src/app.js`
- `src/api/controller/apiProductController.js`
- `src/api/controller/apiUsersController.js`
- `src/utils/asyncHandler.js` (nuevo)
- `src/views/error.ejs` (nuevo)
- `src/routes/productRoutes.js` (ruta `mysqlProducts`)

#### Cambio 4.1 — Wrapper para async

```js
// src/utils/asyncHandler.js
module.exports = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
```

Uso:

```js
const asyncHandler = require('../../utils/asyncHandler');

const apiProductController = {
  findAll: asyncHandler(async (req, res) => {
    // ...
  }),
};
```

#### Cambio 4.2 — Middleware de errores

Al final de `app.js`, después del 404:

```js
app.use((req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ error: 'Ruta no encontrada' });
  }
  res.status(404).render('404', { title: '404' });
});

app.use((err, req, res, next) => {
  console.error(err);

  const status = err.status || 500;

  if (req.originalUrl.startsWith('/api')) {
    return res.status(status).json({
      error: err.message || 'Error interno',
    });
  }

  res.status(status).render('error', {
    title: 'Error',
    message: err.message || 'Algo salió mal',
  });
});
```

**Por qué:** Express reconoce un middleware de errores porque tiene **cuatro argumentos** (`err, req, res, next`). Si le ponés tres, lo trata como un middleware normal.

#### Cambio 4.3 — 404 en APIs

```js
const product = await DB.Product.findByPk(req.params.id);

if (!product) {
  return res.status(404).json({ error: 'Producto no encontrado' });
}
```

Lo mismo para usuarios.

#### Cambio 4.4 — La vista `listaMysql`

`productController.listaProductos` renderiza `../views/products/listaMysql`, que no existe. Tenés dos opciones:

- Crear la vista.
- Eliminar la ruta `/products/mysqlProducts` y el método, porque `/products/list` ya lista productos desde MySQL.

Recomiendo lo segundo: menos código duplicado.

#### Cambio 4.5 — URLs de la API

Hoy las respuestas hardcodean `http://localhost:3006`. Movelo a una variable:

```js
const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3006}`;
```

#### Verificación

1. Con MySQL apagado, pedir `/api/product` → debe devolver JSON 500 y **el servidor debe seguir vivo**.
2. Pedir `/api/product/9999` → 404 JSON.
3. Pedir `/products/9999` → página 404, no stack trace.

---

### Fase 5 — CRUD de usuarios + soft delete (4-5 h)

**Objetivo:** que un usuario pueda editar su perfil y que un admin pueda gestionar usuarios sin borrar filas de verdad.

**Archivos:**

- `database/models/User.js`
- `src/controllers/userController.js`
- `src/routes/userRoutes.js`
- `src/views/users/formularioEditUser.ejs`
- `src/views/users/userList.ejs`
- `src/views/users/userProfile.ejs`
- `src/views/users/adminProfile.ejs`
- `BaseProyecto/Terra.sql`

#### Cambio 5.1 — Editar perfil

El bug actual:

```js
where: { email: req.params.email }
```

`req.params.email` no existe, porque la ruta es `/users/edit` sin parámetro. Hay que usar el usuario de la sesión:

```js
const sessionUser = req.session.userLogged || req.session.admin;
if (!sessionUser) return res.redirect('/login');

const data = {
  name: req.body.name,
  surname: req.body.surname,
  email: req.body.email,
  phone: req.body.phone,
};

if (req.body.password) {
  data.password = bcrypt.hashSync(req.body.password, 10);
}

if (req.file) {
  data.avatar = req.file.filename;
}

await User.update(data, { where: { id: sessionUser.id } });

const updated = await User.findByPk(sessionUser.id);
delete updated.dataValues.password;
req.session.userLogged = updated.dataValues;

res.redirect('/profile');
```

#### Cambio 5.2 — Formulario de edición

- Agregar `enctype="multipart/form-data"`.
- No mostrar la contraseña actual.
- Campo de contraseña vacío con placeholder "Dejar en blanco para no cambiar".
- Agregar `bio`.
- Agregar avatar.
- Si es admin, permitir cambiar categoría.

```ejs
<form method="post" action="/users/edit?_method=PUT" enctype="multipart/form-data">
```

Y en la ruta:

```js
router.put('/edit', guestMdlw, upload.single('avatar'), userController.update);
```

#### Cambio 5.3 — Listado de usuarios

Hoy `userList.ejs` genera links a `/<id>`, que no llevan a nada. Debe tener:

```ejs
<a href="/users/edit/<%= user.id %>">Editar</a>
<a href="/users/delete/<%= user.id %>">Eliminar</a>
```

Y el controlador debe tener `editById` y `destroy`.

#### Cambio 5.4 — Soft delete

En vez de `DELETE FROM users`, se marca `deleted_at`:

```js
await User.destroy({ where: { id: req.params.id } });
```

Con `paranoid: true`, Sequelize hace el `UPDATE` solo. Las consultas normales (`findAll`, `findOne`) excluyen a los borrados. Para verlos:

```js
await User.findAll({ paranoid: false });
```

Para restaurar:

```js
await User.restore({ where: { id } });
```

**Cuidado:** no permitas que un admin se borre a sí mismo, y no permitas borrar al último admin.

#### Cambio 5.5 — BIO y perfil de admin

- Agregar `bio` al modelo y a la vista.
- Hoy `adminProfile.ejs` existe pero nunca se renderiza. Decidí si unificás todo en `userProfile.ejs` o si el admin tiene una vista propia.
- Para el proyecto final, lo más simple es una sola vista de perfil que muestre funciones extra si `locals.adminLogged` es verdadero.

#### Verificación

- Editar nombre, teléfono y avatar.
- Dejar la contraseña vacía y confirmar que no cambia.
- Cambiar la contraseña y volver a loguearse.
- Como admin, editar otro usuario.
- Eliminar un usuario: desaparece del listado, pero sigue en la BD con `deleted_at`.
- Ese usuario ya no puede loguearse.

---

### Fase 6 — Carrito funcional (6-8 h)

**Objetivo:** agregar productos, cambiar cantidades, quitar, vaciar y ver el total.

Hay dos caminos. Recomiendo empezar por el A y migrar al B si el tiempo alcanza.

#### Opción A — Carrito en sesión (más rápido)

Se guarda en `req.session.cart`:

```js
{
  items: [
    { productId: 3, quantity: 2 },
    { productId: 7, quantity: 1 }
  ]
}
```

Ventajas: no requiere tablas nuevas, se entiende en una tarde.
Desventajas: se pierde si se reinicia el servidor y no se comparte entre dispositivos.

Controlador mínimo:

```js
add: async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).render('404', { title: '404' });

  if (!req.session.cart) req.session.cart = { items: [] };

  const item = req.session.cart.items.find(
    (i) => i.productId === product.id
  );

  if (item) item.quantity += 1;
  else req.session.cart.items.push({ productId: product.id, quantity: 1 });

  res.redirect('/products/cart');
},
```

Para mostrar el carrito, buscás los productos por id y armás la lista con cantidades y total en el controlador (no en la vista).

#### Opción B — Carrito en MySQL (más "real")

Tablas:

```sql
CREATE TABLE carts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  session_id VARCHAR(255) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_carts_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cart_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  CONSTRAINT fk_items_cart FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
  CONSTRAINT fk_items_product FOREIGN KEY (product_id) REFERENCES products(id),
  UNIQUE KEY uniq_cart_product (cart_id, product_id)
);
```

Conceptos importantes:

- `unit_price` guarda el precio **al momento de agregar**. Si mañana cambia el precio del producto, el carrito no se altera.
- `user_id` es para logueados; `session_id` para invitados.
- `UNIQUE (cart_id, product_id)` evita tener dos filas del mismo producto.
- `quantity` se incrementa, no se duplica la fila.

Modelos nuevos (el `index.js` los carga solo):

```js
// database/models/Cart.js
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: true },
    session_id: { type: DataTypes.STRING, allowNull: true },
  }, {
    tableName: 'carts',
    timestamps: true,
    underscored: true,
  });

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
    Cart.hasMany(models.CartItem, { as: 'items', foreignKey: 'cart_id' });
  };

  return Cart;
};
```

Y `CartItem.js` similar, con `belongsTo(Product)`.

Flujo:

```
POST /cart/add/:id
  → buscar producto
  → obtener o crear carrito (por user_id o session_id)
  → buscar CartItem
  → si existe: quantity++
  → si no: create con quantity=1 y unit_price=product.price
  → redirect /products/cart
```

Rutas sugeridas:

```js
router.get('/cart', cartController.show);
router.post('/cart/add/:id', cartController.add);
router.put('/cart/update/:id', cartController.update);
router.delete('/cart/remove/:id', cartController.remove);
router.delete('/cart/clear', cartController.clear);
```

**Recomendación:** empezá con formularios POST + `method-override`. Es más fácil de debuggear que `fetch` y no necesitás escribir tanto JS. Cuando el flujo funcione, si querés, lo pasás a AJAX.

#### Verificación

- Agregar el mismo producto dos veces → una sola línea con cantidad 2.
- Cambiar cantidad → total se recalcula.
- Eliminar línea → desaparece.
- Vaciar carrito → total 0.
- Recargar la página → el carrito sigue.
- (Si es en BD) cerrar sesión y volver a entrar → el carrito del usuario sigue.

---

### Fase 7 — Home dinámica y buscador (3 h, opcional)

**Objetivo:** dejar de tener productos hardcodeados en el HTML.

#### Home

```js
index: async (req, res) => {
  const products = await Product.findAll({
    limit: 8,
    order: [['id', 'DESC']],
  });

  res.render('./users/index', {
    title: 'e-Terra Home',
    products,
  });
},
```

En `index.ejs`, reemplazá los `<article>` fijos por un `forEach`:

```ejs
<% products.forEach(product => { %>
  <article class="product-item">
    <a href="/products/<%= product.id %>">
      <img class="product-img" src="/Images/<%= product.image %>" alt="">
    </a>
    <div class="product-info">
      <h2 class="product-description"><%= product.name %></h2>
      <p class="price"><%= product.price %> USD</p>
      <button class="add">Agregar</button>
    </div>
  </article>
<% }) %>
```

#### Buscador

```js
const { Op } = require('sequelize');

search: async (req, res) => {
  const q = (req.query.q || '').trim();

  const products = q
    ? await Product.findAll({
        where: { name: { [Op.like]: `%${q}%` } },
      })
    : [];

  res.render('products/productList', {
    title: `Resultados para "${q}"`,
    plantasList: products,
  });
},
```

Ruta:

```js
router.get('/search', productController.search);
```

Y en el header, el input deja de ser `readonly`:

```ejs
<form action="/products/search" method="get">
  <input name="q" type="text" placeholder="Buscar plantas y productos">
</form>
```

**Verificación:** buscar "monstera" devuelve la Monstera; buscar algo inexistente muestra lista vacía sin romper.

---

### Fase 8 — Limpieza, tests y documentación (3-4 h)

**Objetivo:** dejar el proyecto presentable y mantenible.

#### Limpieza

- Borrar `src/Data/users.json` y `products.json`.
- Quitar imports sin usar: `clearScreenDown`, `Product`, `sequelize`, `guestMdlw`, `adminMiddleware`, `name` de ejs, `stringify`.
- Borrar bloques de código comentado.
- Eliminar rutas duplicadas (`/cart` aparece dos veces, `/login` y `/users/login`, etc.).
- Quitar `app.use(express.static('views'))`: expone el código de las vistas.
- Usar rutas absolutas para estáticos:
  ```js
  app.use(express.static(path.join(__dirname, '..', 'public')));
  ```
- Mover `app.set('views', path.join(__dirname, 'views'))`.

#### Scripts de `package.json`

```json
"start": "node src/app.js",
"dev": "nodemon src/app.js",
"db:admin": "node scripts/create-admin.js"
```

#### Node

- Agregar `.nvmrc` con `20` (o la versión que elijas).
- Probar `npm install` desde cero en otra carpeta para confirmar que el proyecto es reproducible.

#### Tests (opcional pero recomendado)

Para poder testear, separá el arranque del servidor:

```js
// src/app.js
module.exports = app;

// src/server.js
const app = require('./app');
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
```

Así los tests pueden importar `app` sin abrir un puerto. Después:

```bash
npm install --save-dev supertest
```

Y usar el runner nativo de Node:

```js
// test/products.test.js
const test = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const app = require('../src/app');

test('GET / responde 200', async () => {
  const response = await request(app).get('/');
  assert.strictEqual(response.status, 200);
});
```

No hace falta una suite enorme. Con 5-10 tests de humo ya demostrás que la app no se rompe.

#### README final

- Qué es el proyecto.
- Tecnologías.
- Requisitos.
- Instalación paso a paso.
- Variables de entorno.
- Scripts.
- Usuarios de prueba.
- Rutas web principales.
- Endpoints de API.
- Capturas o link al deploy.

#### Definition of Done

Un clon nuevo del repo puede hacer:

```bash
npm install
# crear BD y correr SQL
# crear .env
npm run dev
```

Y puede: registrarse, loguearse, ver productos, filtrar por categoría, agregar al carrito, editar su perfil y (como admin) gestionar productos y usuarios. Sin errores 500 en el camino feliz.

---

## 5. Ruta de re-aprendizaje en 4 sesiones

Si hace mucho que no tocás esto, no arranques por el carrito. Arrancá por entender el recorrido. Propongo 4 sesiones de 2 horas.

### Sesión 1 — HTTP, Express y rutas

**Objetivo:** entender `req`, `res` y `next`.

**Leer:** `src/app.js`, `src/routes/mainRoutes.js`, `src/controllers/controller.js`.

**Ejercicio:**

1. Agregar una ruta `GET /health` que responda `{ status: 'ok' }`.
2. Agregar un middleware global que haga `console.log(req.method, req.originalUrl)`.
3. Moverlo antes y después de las rutas y observar qué pasa.

**Para responder:** ¿por qué `/health` no necesita controlador? ¿Qué pasa si no llamás a `next()`?

### Sesión 2 — MVC, EJS y Sequelize

**Objetivo:** seguir una petición de punta a punta.

**Leer:** `productRoutes.js`, `productController.js`, `Product.js`, `productDetail.ejs`.

**Ejercicio:**

1. Agregar `stock` a la vista de detalle.
2. Correr un script que haga `Product.findAll({ where: { products_categories_id: 2 } })`.
3. Dibujar en papel el recorrido de `GET /products/7`.

**Para responder:** ¿quién arma el SQL, el controlador o Sequelize? ¿Dónde se decide qué vista se renderiza?

### Sesión 3 — Auth, sesión y middlewares

**Objetivo:** entender cómo se "acuerda" la app de quién sos.

**Leer:** `userRoutes.js`, `userController.js` (login/registro), `userLoggedMdlw.js`, `header.ejs`.

**Ejercicio:**

1. Después de un login exitoso, imprimir `req.session` y `req.cookies`.
2. Arreglar el nombre del header (`usuario` → `name`).
3. Explicar en tus palabras por qué el usuario seed no puede loguearse.

**Para responder:** ¿cuál es la diferencia entre `req.session.userLogged` y `res.locals.userLogged`? ¿Quién setea cada uno?

### Sesión 4 — API, errores y Git

**Objetivo:** entender la capa JSON y no romper el servidor.

**Leer:** `src/api/routes`, `src/api/controller`, el 404 de `app.js`.

**Ejercicio:**

1. Envolver `apiProductController.findAll` en `try/catch`.
2. Agregar un 404 para producto inexistente.
3. Probar con `curl` o Postman.
4. Crear una rama y hacer un commit chico.

**Para responder:** ¿por qué un error en una función `async` puede tumbar el proceso? ¿Qué diferencia hay entre un 404 y un 500?

---

## 6. Checklist de arranque

```bash
# 1. Estado actual
git status
git diff src/app.js

# 2. Rama de trabajo
git switch -c retomar/entorno-modelos

# 3. Dependencias
node -v
npm install

# 4. Base de datos
# (en MySQL)
# CREATE DATABASE terra ...
# CREATE USER 'eterra'@'localhost' ...
# GRANT ALL PRIVILEGES ON terra.* ...

mysql -u eterra -p terra < BaseProyecto/Terra.sql
mysql -u eterra -p terra < BaseProyecto/BaseTerra.sql

# 5. Variables de entorno
# crear .env con DB_* y SESSION_SECRET

# 6. Verificar conexión
node -e "const {sequelize}=require('./database/models'); sequelize.authenticate().then(()=>{console.log('DB OK');process.exit(0)}).catch(e=>{console.error(e.message);process.exit(1)})"

# 7. Crear admin
npm run db:admin

# 8. Levantar
npm run dev

# 9. Probar
# http://localhost:3006/
# http://localhost:3006/products/list
# http://localhost:3006/login
# http://localhost:3006/api/product
```

---

## 7. Qué NO hacer

- **No reescribas todo desde cero.** El proyecto ya tiene una base funcional; el problema es de consistencia, no de arquitectura.
- **No uses `sequelize.sync({ force: true })`** sobre una base con datos. Te va a borrar todo. Si querés recrear, hacelo desde los scripts SQL.
- **No commitees `.env`** ni `node_modules`.
- **No guardes contraseñas en texto plano.** Ni en seeds ni en la BD.
- **No confíes en `req.body`/`req.params`** sin validar.
- **No dejes funciones `async` sin `try/catch`** en la API.
- **No dupliques rutas.** Un recurso, una ruta canónica.
- **No hardcodees `localhost`** en las respuestas de la API.
- **No cambies el SQL y los modelos por separado.** Siempre en el mismo commit.
- **No trabajes directo en `main`.** Una rama por fase.

---

## 8. Apéndices

### 8.1 Mapa de rutas

#### Web

| Método | Ruta | Controlador | Protección |
|---|---|---|---|
| GET | `/` | `mainController.index` | — |
| GET | `/login` | `userController.login` | `authMdlw` |
| POST | `/login` | `userController.processLogin` | `authMdlw` |
| GET | `/profile` | `userController.profile` | — (debería ser `guestMdlw`) |
| GET | `/logout` | `mainController.logout` | — |
| GET | `/users/register` | `userController.register` | — |
| POST | `/users/register` | `userController.createUser` | `upload` + validación |
| GET | `/users/login` | `userController.login` | — (duplicada) |
| POST | `/users/login` | `userController.processLogin` | — (duplicada) |
| GET | `/users/profile` | `userController.profile` | — (duplicada) |
| GET | `/users/edit` | `userController.edit` | — (debería ser `guestMdlw`) |
| PUT | `/users/edit` | `userController.update` | — |
| GET | `/users/listado` | `userController.indice` | `adminMiddleware` |
| GET | `/products/list` | `productController.index` | — |
| GET | `/products/index` | `productController.productCatalogue` | — |
| GET | `/products/category/:id` | `productController.category` | — |
| GET | `/products/:id` | `productController.productDetail` | — |
| GET | `/products/create` | `productController.create` | — (debería ser admin) |
| POST | `/products/create` | `productController.store` | `upload` + validación |
| GET | `/products/edit/:id` | `productController.edit` | — (debería ser admin) |
| PUT | `/products/edit/:id` | `productController.update` | `upload` + validación |
| GET | `/products/delete/:id` | `productController.delete` | — (debería ser admin) |
| DELETE | `/products/delete/:id` | `productController.destroy` | — (debería ser admin) |
| GET | `/products/cart` | `productController.productCart` | — |
| GET | `/products/mysqlProducts` | `productController.listaProductos` | — (vista inexistente) |

#### API

| Método | Ruta | Controlador |
|---|---|---|
| GET | `/api/product` | `apiProductController.findAll` |
| GET | `/api/product/:id` | `apiProductController.show` |
| GET | `/api/users` | `apiUsersController.list` |
| GET | `/api/users/:id` | `apiUsersController.detail` |

### 8.2 Esquema de la base de datos

```
productscategories
├── id (PK)
└── type

products
├── id (PK)
├── name
├── image
├── price
├── description
├── stock
└── products_categories_id (FK → productscategories.id)

usercategories
├── id (PK)
└── type

users
├── id (PK)
├── name
├── surname
├── avatar
├── email
├── password
├── phone
└── user_categories_id (FK → usercategories.id)
```

**Columnas que faltan según el código:**

- `products.available` (o `disponible`).
- `users.bio`.
- `users.deleted_at`.
- `users.email` único.
- Tablas de carrito (`carts`, `cart_items`).

### 8.3 Comandos útiles

```bash
# Instalar
npm install

# Desarrollo
npm run dev

# Producción local
npm start

# Verificar conexión a la BD
node -e "const {sequelize}=require('./database/models'); sequelize.authenticate().then(()=>{console.log('DB OK');process.exit(0)}).catch(e=>{console.error(e.message);process.exit(1)})"

# Generar hash bcrypt
node -e "console.log(require('bcryptjs').hashSync('Admin1234', 10))"

# Crear admin (después de crear el script)
npm run db:admin

# Ver el estado de Git
git status
git log --oneline -10

# Crear rama
git switch -c retomar/entorno-modelos
```

### 8.4 Glosario ampliado

- **Express:** framework minimalista de Node para crear servidores HTTP.
- **Middleware:** función que recibe `(req, res, next)` y puede modificar la petición, responder o pasar al siguiente.
- **Router:** objeto de Express que agrupa rutas.
- **Controlador:** función que contiene la lógica de una ruta.
- **Modelo:** representación de una tabla y sus operaciones.
- **ORM:** capa que traduce objetos a SQL y viceversa.
- **Sequelize:** ORM usado en este proyecto.
- **Migración:** archivo versionado que cambia el esquema de la BD.
- **Seed:** archivo que inserta datos iniciales.
- **EJS:** motor de plantillas que permite escribir JavaScript dentro de HTML.
- **Partial:** fragmento de EJS reutilizable (header, footer, head).
- **Sesión:** almacenamiento del lado del servidor asociado a una cookie.
- **Cookie:** pequeño dato que el navegador guarda y envía en cada request.
- **Hash:** resultado irreversible de una función criptográfica; se usa para contraseñas.
- **bcrypt:** algoritmo de hashing lento, diseñado para contraseñas.
- **Multer:** middleware para procesar `multipart/form-data` y guardar archivos.
- **CORS:** mecanismo que permite o bloquea peticiones entre distintos orígenes.
- **REST:** estilo de API basado en recursos y verbos HTTP.
- **JSON:** formato de texto para intercambiar datos.
- **Status code:** código numérico de respuesta HTTP (200, 404, 500, etc.).
- **Soft delete:** marcar un registro como borrado sin eliminarlo físicamente.
- **Paranoid:** opción de Sequelize que implementa soft delete.

---

## Historial de este documento

| Fecha | Cambio |
|---|---|
| 2026-10-27 | Creación del documento: mapa mental, tour guiado, inventario de bugs y plan por fases. |
