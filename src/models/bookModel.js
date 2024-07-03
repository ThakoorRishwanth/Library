const {Schema, model} = require('mongoose')

const bookSchema = new Schema({
    title:{type:String, required:true},
    price:{type:Number, required:true},
    genre:{type:String, required:true},
    author:{type:String, required:true},
    
})

const bookModel = model('books', bookSchema);

module.exports = bookModel