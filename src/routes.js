const { Router } = require('express')
const multer = require('multer')
const cors = require('cors') // Adicione a importação do cors

const multerConfig = require('./config/multer')
const UserController = require('./app/controllers/UserController')
const SessionsController = require('./app/controllers/SessionsController')
const ProductController = require('./app/controllers/ProductController')
const authMiddleware = require('./app/middlewares/auth')
const CategoryController = require('./app/controllers/CategoryController')
const OrderController = require('./app/controllers/OrderController')

const upload = multer(multerConfig)

const routes = new Router()

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello to my firts API' })
})

// Adicione o middleware cors antes das suas rotas
routes.use(cors())

routes.post('/users', UserController.store)

routes.post('/sessions', SessionsController.store)

routes.use(authMiddleware)

routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)
routes.put('/products/:id', upload.single('file'), ProductController.update)

routes.post('/categories', upload.single('file'), CategoryController.store)
routes.get('/categories', CategoryController.index)
routes.put('/categories/:id', upload.single('file'), CategoryController.update)

routes.post('/orders', OrderController.store)
routes.get('/orders', OrderController.index)
routes.put('/orders/:id', OrderController.update)

module.exports = routes
