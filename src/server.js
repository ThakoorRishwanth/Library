const express = require('express');
const connectToDb = require('./configs/db');
const userRouter = require('./routes/userRoutes');
const bookRouter = require('./routes/bookRoutes');
const auth = require('./middlewares/auth');
require('dotenv').config()

const port = process.env.PORT||9090

const db_url = process.env.DB_URL;

const app = express()

app.use(express.json())

app.use('/user', userRouter)

app.use('/books',auth, bookRouter)

app.get('/',(req, res)=>{
    res.send('This is the home Route')
})

app.listen(port,async()=>{
    try{
        await connectToDb(db_url)
        console.log('connect to the database')
        console.log(`Server is Running at port ${port}`)
    }
    catch(err){
        console.log(err)
    }
})