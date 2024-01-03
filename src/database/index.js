const Sequelize = require('sequelize')
const User = require('../app/models/User')
const configDatabase = require('../config/database.cjs')
const Product = require('../app/models/Product')
const Category = require('../app/models/Category')

const models = [User, Product, Category]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(configDatabase)
    models.map((model) => model.init(this.connection))
  }
}

module.exports = new Database()
