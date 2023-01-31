const express = require('express');
const app = express();
const path = require('path');
const { clearScreenDown } = require('readline');
const PORT = process.env.PORT || 3006;

const mainRoutes=require('./routes/mainRoutes');
const ProductDetail=require('./routes/ProductDetail');

app.set('views', path.resolve(__dirname,'views'));

/*preguntar como desde carpeta products ver los ejs de productos. 
app.set('products', path.resolve(__dirname,'./src/views/products'));*/

app.set('view engine','ejs')


app.use(express.static('public'));
app.use(express.static('views'));


app.use('/',mainRoutes);
app.use('/index',mainRoutes);
app.use('/register',mainRoutes);
app.use('/login',mainRoutes);
app.use('/productDetail',mainRoutes);
app.use('/productCart',mainRoutes);
app.use('/productList',mainRoutes);
app.use('/formLoad',mainRoutes);


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