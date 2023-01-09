const express = require('express');
const app= express();
const path = require('path');
const { clearScreenDown } = require('readline');
const PORT =5000;



app.use(express.static('public'));

app.get('/', (req,res)=>{
    res.sendFile(path.resolve(__dirname, './views/home.html'))
});


app.listen(PORT,()=>{
    console.log(`Server run puerto on ${PORT}` );
})