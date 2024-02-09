const express = require('express')
const routes = require('./routes.js')
require('./database')
const { resolve } = require('path')

class App {
  constructor() {
    this.app = express()
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
