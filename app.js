const express = require('express');
const app = express();
const path = require('path');
const { clearScreenDown } = require('readline');
const PORT = process.env.PORT || 3007;

const mainRoutes=require('./routes/mainRoutes');

app.set('view engine','ejs')


app.use(express.static('public'));
app.use(express.static('views'));

app.use('/',mainRoutes);



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
 
app.listen(PORT, () => {
    console.log(`Server run puerto on ${PORT}`);
})