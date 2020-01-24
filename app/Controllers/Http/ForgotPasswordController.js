'use strict'

const crypto = require('crypto')
const User = require('../../Models/User')

class ForgotPasswordController {
  async store({ request, response }) {
    try {
      const email = request.input('email') // input busca apenas 1 campo na req
      const user = await User.findByOrFail('email', email) // Caso ele não encontre um usuário, ele retorna um erro e cai no catch

      user.token = crypto.randomBytes(10).toString('hex') // String em hexadecimal
      user.token_created_at = new Date()

      await user.save()
    } catch (error) {
      return response.status(error.status).send({ error: { message: 'Algo não deu certo, esse e-mail existe?' }})
    }
  }
}


module.exports = ForgotPasswordController
