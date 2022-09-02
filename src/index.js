require('./db/mongoose')

const express = require('express');
const app = express()
const port = process.env.port

const init = require('./init')

const userRouter = require('./routers/user')
const catRouter = require('./routers/category')
const expRouter = require('./routers/income')
const incRouter = require('./routers/expense')


app.use(express.json())

init()

app.use(userRouter)
app.use(catRouter)
app.use(expRouter)
app.use(incRouter)

app.listen(port, () => {
    console.log('Server is up on ' + port)
})