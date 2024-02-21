const Sequelize = require('sequelize')
const moongose = require('mongoose')
const User = require('../app/models/User')
const Product = require('../app/models/Product')
const Category = require('../app/models/Category')

const models = [User, Product, Category]

class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize(
      'postgresql://postgres:1-2acAG62Fbbb4Df1eD1b4fc*5bcC626@roundhouse.proxy.rlwy.net:47309/railway',
    )
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      )
  }

  mongo() {
    this.mongoConnection = moongose.connect(
      'mongodb://mongo:aCcH5F4f1eh1eEEG6aGA-B353abAg-ca@viaduct.proxy.rlwy.net:38264',
    )
  }
}

module.exports = new Database()
