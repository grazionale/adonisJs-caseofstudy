'use strict'

const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password']) // only busca os campos definidos no array dentro da req

    const user = await User.create(data)

    return user
  }
}

module.exports = UserController
