const mongoose = require('mongoose')

const blogSchema = mongoose.Schema

const blogModel = new blogSchema({
    title :{
        type : String,
        required : true
    },
    body :{
        type : String,
        required : true
    }

},{timestamps:true})

const blog = mongoose.model('bloglist',blogModel)

module.exports = blog

