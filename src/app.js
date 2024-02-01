const express = require('express')
const routes = require('./routes.js')
require('./database')
const { resolve } = require('path')
const cors = require('cors')

class App {
  constructor() {
    this.app = express()
    this.app.use(cors())
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(express.json())
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
