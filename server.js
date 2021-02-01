require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose')
const app = express();
const session = require('express-session')
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo')(session)
const PORT = process.env.PORT || 3000;

//Database connection
const url = 'mongodb://localhost/pizza';
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("Database connected...")
}).catch(err => {
    console.log('Connection failed');
});



app.use(express.json());



//session store

let mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    collection: 'sessions'
})



// Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))

app.use(flash());

// Global middle ware
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
})

// Set template engine

app.use(expressLayout);

app.set('views', path.join(__dirname, 'resources/views'));

app.set('view engine', 'ejs');

// assets

app.use(express.static('public'));

require('./routes/web')(app)







app.listen(3000, () => {
    console.log("Listining port " + PORT);
});