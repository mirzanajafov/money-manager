require('./db/mongoose')

const express = require('express');
const app = express()
const port = process.env.port
const path = require('path')
    // const bodyParser = require('body-parser')
const hbs = require('hbs')
const session = require('express-session');


const init = require('./init')

// Define paths for Express config
const publicDP = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/views/partials')


// Setup hbs engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

hbs.registerHelper('ifCond', function(v1, v2, options) {
    if (v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});

app.use(express.static(publicDP))

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'some-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // This will only work if you have https enabled!
        maxAge: 3600000 // 1 hour
    }
}));


const userRouter = require('./routers/user')
const catRouter = require('./routers/category')
const expRouter = require('./routers/income')
const incRouter = require('./routers/expense')
const mainRouter = require('./routers/index')


app.use(express.json())

// init()

app.use(userRouter)
app.use(catRouter)
app.use(expRouter)
app.use(incRouter)
app.use(mainRouter)

app.listen(port, () => {
    console.log('Server is up on ' + port)
})