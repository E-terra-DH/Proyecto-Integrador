const express = require('express');
const app = express();
const path = require('path');
const { clearScreenDown } = require('readline');
const PORT = process.env.PORT || 3006;

const mainRoutes=require('./routes/mainRoutes');
const productRoutes=require('./routes/productRoutes');
const userDetail=require('./routes/userDetail');

app.set('views', path.resolve(__dirname,'views')); /*para que el path resuelva la ruta para la carpeta views, donde esta ejs*/

app.set('view engine','ejs') /*para ir donde esta ejs*/

app.use(express.static('public'));
app.use(express.static('views'));

app.use('/',mainRoutes);
app.use('/products',productRoutes);
app.use('/users', userDetail);

/* ruteo para cada una de las paginas

app.use('/index',mainRoutes);
app.use('/register',mainRoutes);
app.use('/login',mainRoutes);
app.use('/productDetail',mainRoutes);
app.use('/productCart',mainRoutes);
app.use('/productList',mainRoutes);
app.use('/formLoad',mainRoutes);
---error---
app.use((req, res) => {
    res.status(404).render('error');
});
*/

app.listen(PORT, () => {
    console.log(`Server run puerto on ${PORT}`);
})


/*
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/index.html'))
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/ProductCart.html'))
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/login.html'))
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/product.html'))
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/register.html'))
});
 

*/