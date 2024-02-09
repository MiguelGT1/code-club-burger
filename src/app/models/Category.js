const { Sequelize, Model } = require('sequelize')

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `https://code-club-burger-production-ba1f.up.railway.app/category-file/${this.path}`
          },
        },
      },
      {
        sequelize,
      },
    )
    return this
  }
}

module.exports = Category
