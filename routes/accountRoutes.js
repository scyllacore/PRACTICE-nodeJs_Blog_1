const express = require('express')
const accountController = require('../controllers/accountController')

const accountRouter = express.Router()    


accountRouter.post('/register',accountController.user_create_post)
accountRouter.get('/register',accountController.user_register_get)

accountRouter.post('/',accountController.user_login_post)
accountRouter.get('/',accountController.user_login_get)

module.exports = accountRouter