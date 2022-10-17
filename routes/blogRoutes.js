const express = require('express')
const blogController = require('../controllers/blogController')
const blog_create_auth = require('../controllers/auth/auth')

const blogRoute = express.Router()

blogRoute.get('/',blogController.blog_index)

blogRoute.get('/create',blog_create_auth, blogController.blog_create_get)

blogRoute.get('/:id', blogController.blog_detail)
blogRoute.post('/',blogController.blog_create_post)
blogRoute.delete('/:id', blogController.blog_delete)

module.exports = blogRoute