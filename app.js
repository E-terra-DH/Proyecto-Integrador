const express = require('express');
const app= express();
const path = require('path');
const { clearScreenDown } = require('readline');
const PORT =5000;



app.use(express.static('public'));

app.get('/', (req,res)=>{
    res.sendFile(path.resolve(__dirname, './views/home.html'))
    // res.sendFile(path.resolve(__dirname, './views/cart.html'))
    // res.sendFile(path.resolve(__dirname, './views/login.html'))
    // res.sendFile(path.resolve(__dirname, './views/product.html'))
    // res.sendFile(path.resolve(__dirname, './views/register.html'))



});


app.listen(PORT,()=>{
    console.log(`Server run puerto on ${PORT}` );
})