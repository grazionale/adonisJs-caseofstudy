'use strict'

class SessionController {
  async store({ request, response, auth }){
    const { email, password } = request.all()

    const token = await auth.attempt(email, password) // Gera um token baseado em um email e senha

    return token
  }
}

module.exports = SessionController
