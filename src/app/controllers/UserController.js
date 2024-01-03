/*
store => Cadastrar / adicionar
index => Listar varios
show => Listar apenas UM
update => atualizar
delete => Deletar
*/

const Yup = require('yup')

const User = require('../models/User')

const { v4 } = require('uuid')

class UserController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      admin: Yup.boolean(),
    })

    // if (!(await schema.isValid(request.body))) {
    // return response
    // .status(400)
    // .json({ error: 'Nake sure your data is correct' })
    // }
    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { name, email, password, admin } = request.body

    const userExists = await User.findOne({
      where: { email },
    })

    if (userExists) {
      return response.status(400).json({ error: 'Usuario ja existente' })
    }
    console.log(userExists)

    const user = await User.create({
      id: v4(),
      name,
      email,
      password,
      admin,
    })

    return response.status(201).json({ id: user.id, name, email, admin })
  }
}

module.exports = new UserController()
