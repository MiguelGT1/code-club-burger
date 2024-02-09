const { Sequelize, Model } = require('sequelize')

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.INTEGER,
        path: Sequelize.STRING,
        offer: Sequelize.BOOLEAN,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `https://code-club-burger-production-ba1f.up.railway.app/product-file/${this.path}`
          },
        },
      },
      {
        sequelize,
        timestamps: true,
        tableName: 'Products',
      },
    )
    return this
  }

  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
    })
  }
}

module.exports = Product
