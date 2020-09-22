const express = require('express');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

// Set template engine

app.use(expressLayout);

app.set('views', path.join(__dirname, 'resources/views'));

app.set('view engine', 'ejs');


// assets

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/cart', (req, res) =>  {
    res.render('customers/cart');
});



// Set template engine

app.use(expressLayout);

app.set('views', path.join(__dirname, 'resources/views'));

app.set('view engine', 'ejs');



app.listen(3000, () => {
    console.log("Listining port "+PORT);
});