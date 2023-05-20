require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const { clearScreenDown } = require('readline');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3006
    ;

//Para validar la sesión y gurdar las cookies
// const userSessionMdlw = require('./middlewares/userSessionMdlw');
const userLoggedMdlw = require('./middlewares/userLoggedMdlw');
const adminLoggedMiddleware = require('./middlewares/adminLoggedMiddleware');
const cookieParser = require('cookie-parser'); // Proceso de guardar la cookie con la contraseña
const session = require('express-session'); // Proceso de login


const mainRoutes = require('./routes/mainRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const { sequelize } = require('../database/models');
const Product = require('../database/models/Product');
const apiProductRoutes = require('./api/routes/apiProductRoutes');
const apiUsersRoutes = require('./api/routes/apiUsersRoutes');

app.set('views', path.resolve(__dirname, 'views')); /*para que el path resuelva la ruta para la carpeta views, donde esta ejs*/

app.set('view engine', 'ejs') /*para ir donde esta ejs*/
app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'Clave obligatoria',
    resave: false,
    saveUninitialized: true
    //cookie: {masAge: 120000} //Tiempo de 2 minutos guardando la cookie;
}
));

app.use(userLoggedMdlw);
app.use(adminLoggedMiddleware);
// app.use(userSessionMdlw);
app.use(express.static('public'));
app.use(express.static('views'));


app.use('/', mainRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes); //Ver ruteo de productos

// API routes
app.use('/api/product', apiProductRoutes);
app.use('/api/users', apiUsersRoutes);

//---error---
app.use((req, res) => {
    res.status(404).render('404', {
        title: '404'
    });
})

// Esta comentado por que rompe con las imagenes


// sequelize.authenticate()
// .then(()=>{
//      console.log("conect con la base")
//  })
// .catch(error =>{
//      console.log("el error de conexion es:" +error)
//  })

app.listen(PORT, () => {
    console.log(`Server run puerto on http://localhost:${PORT}`);
})

