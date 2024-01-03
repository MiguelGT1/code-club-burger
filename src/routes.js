// Arquivo: ./src/routes.js
const { Router } = require('express')
const multer = require('multer')
const multerConfig = require('./config/multer')

const UserController = require('./app/controllers/UserController')
const SessionsController = require('./app/controllers/SessionsController')
const ProductController = require('./app/controllers/ProductController')
const authMiddleware = require('./app/middlewares/auth')
const CategoryController = require('./app/controllers/CategoryController')

const upload = multer(multerConfig)

const routes = Router()

routes.post('/users', UserController.store)

routes.use(authMiddleware) // será chamado para as rotas ABAIXO

routes.post('/sessions', SessionsController.store)

routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)

routes.post('/categories', CategoryController.store)
routes.get('/categories', CategoryController.index)

module.exports = routes
