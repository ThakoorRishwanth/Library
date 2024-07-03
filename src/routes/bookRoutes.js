const {Router} = require('express')
const bookModel = require('../models/bookModel')

const bookRouter = Router()


bookRouter.get('/', async(req,res)=>{
    try{
       const books = await bookModel.find()
       res.json({books:books})
    }
    catch(err){
        console.log(err)
        res.status(500).send("Internal server error")
    }
})

bookRouter.get('/:id', async(req,res)=>{
    try{

    }
    catch(err){
        console.log(err)
        res.status(500).send("Internal server error")
    }
})


bookRouter.post('/', async(req,res)=>{
    try{

    }
    catch(err){
        console.log(err)
        res.status(500).send("Internal server error")
    }
})


bookRouter.patch('/:id', async(req,res)=>{
    try{

    }
    catch(err){
        console.log(err)
        res.status(500).send("Internal server error")
    }
})


bookRouter.delete('/:id', async(req,res)=>{
    try{

    }
    catch(err){
        console.log(err)
        res.status(500).send("Internal server error")
    }
})

module.exports = bookRouter