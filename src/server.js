const express = require('express');
const connectToDb = require('./configs/db');
const userRouter = require('./routes/userRoutes');
const bookRouter = require('./routes/bookRoutes');
const auth = require('./middlewares/auth');
const MongoStore = require('connect-mongo');
const session = require('express-session');
require('dotenv').config()

const port = process.env.PORT||9090

const db_url = process.env.DB_URL;

const app = express()

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized: true,
   store: MongoStore.create({mongoUrl: db_url}),
   cookie:{
    secure:true,
    httpOnly: true,
   }
}))

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