'use strict'

const User = use('App/Models/User')
const Database = use('Database')

class UserController {
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password']) // only busca os campos definidos no array dentro da req
    const addresses = request.input('addresses')

    const trx = await Database.beginTransaction() // Iniciando uma transação

    const user = await User.create(data, trx) // utilizando a tarnsação

    /**
     * Após criar o usuário, cria-se os endereços dele.
     */
    await user.addresses().createMany(addresses, trx) // utilizando a tarnsação

    await trx.commit() // Comitando transação

    return user
  }
}

module.exports = UserController
