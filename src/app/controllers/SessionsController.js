const Yup = require('yup')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')
const User = require('../models/User')

class SessionController {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    })

    const userEmailOrPasswordIncorrect = () => {
      return response
        .status(400)
        .json({ error: 'Make sure your password or email are correct' })
    }

    if (!(await schema.isValid(request.body))) {
      return userEmailOrPasswordIncorrect() // Adicionado 'return' aqui
    }

    const { email, password } = request.body

    try {
      const user = await User.findOne({
        where: { email },
      })

      if (!user) {
        return userEmailOrPasswordIncorrect() // Adicionado 'return' aqui
      }

      if (!(await user.checkPassword(password))) {
        return userEmailOrPasswordIncorrect() // Adicionado 'return' aqui
      }

      return response.json({
        id: user.id,
        email,
        name: user.name,
        admin: user.admin,
        token: jwt.sign({ id: user.id, name: user.name }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      })
    } catch (error) {
      console.error('Error in SessionController:', error)
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

module.exports = new SessionController()
