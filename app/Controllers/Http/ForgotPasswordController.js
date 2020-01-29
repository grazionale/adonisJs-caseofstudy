'use strict'

const moment = require('moment')
const crypto = require('crypto')
const User = require('../../Models/User')
const Mail = use('Mail')

class ForgotPasswordController {
  async store ({ request, response }) {
    try {
      const email = request.input('email') // input busca apenas 1 campo na req
      const user = await User.findByOrFail('email', email) // Caso ele não encontre um usuário, ele retorna um erro e cai no catch

      user.token = crypto.randomBytes(10).toString('hex') // String em hexadecimal
      user.token_created_at = new Date()

      await user.save()

      await Mail.send(
        ['emails.forgot_password'],
        { email, token: user.token, link: `${request.input('redirect_url')}?token=${user.token}` },
        (message) => {
          message.from('foo@bar.com').to(user.email).subject('Recuperação de senha')
        })
    } catch (error) {
      return response.status(error.status).send({ error: { message: 'Algo não deu certo, esse e-mail existe?' } })
    }
  }

  async update ({ request, response }) {
    try {
      const { token, password } = request.all()
      const user = await User.findByOrFail('token', token)

      /**
       * Verifica se o token já expirou (mais de 2 dias
       */
      const tokenExpired = moment().subtract('2', 'days').isAfter(user.token_created_at)

      if (tokenExpired) {
        return response.status(401).send({ error: { message: 'O token de recuperação está expirado.' } })
      }

      user.token = null
      user.token_created_at = null
      user.password = password

      await user.save()
    } catch (error) {
      return response.status(error.status).send({ error: { message: 'Algo deu errado ao resetar sua senha =(' } })
    }
  }
}

module.exports = ForgotPasswordController
