const express = require('express')
const routes = require('./routes.js')
require('./database')
const cors = require('cors') // Adicione esta linha para importar o middleware CORS

const { resolve } = require('path')

const corsOptions = {
  origin: 'https://juliacakes.vercel.app',
  credentials: true,
}

class App {
  constructor() {
    this.app = express()

    this.app.use(cors(corsOptions))

    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(express.json())

    // Configuração do CORS
    this.app.use((req, res, next) => {
      res.header(
        'Access-Control-Allow-Origin',
        'https://code-burger-interface-mx6g.vercel.app',
      )
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
      )
      next()
    })

    this.app.use(
      '/product-file',
      express.static(resolve(__dirname, '..', 'uploads')),
    )
    this.app.use(
      '/category-file',
      express.static(resolve(__dirname, '..', 'uploads')),
    )
  }

  routes() {
    this.app.use(routes)
  }
}

module.exports = new App().app
