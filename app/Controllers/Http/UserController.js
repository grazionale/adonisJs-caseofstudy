'use strict'

const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password']) // only busca os campos definidos no array dentro da req
    const addresses = request.input('addresses')

    const user = await User.create(data)

    /**
     * Após criar o usuário, cria-se os endereços dele.
     */
    await user.addresses().createMany(addresses)

    return user
  }
}

module.exports = UserController
