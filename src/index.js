require('./db/mongoose')

const express = require('express');
const app = express()
const port = process.env.port

const userRouter = require('./routers/user')


app.use(express.json())

app.use(userRouter)

app.listen(port, () => {
    console.log('Server is up on ' + port)
})