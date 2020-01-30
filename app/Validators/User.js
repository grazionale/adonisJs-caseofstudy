'use strict'

class User {
  /**
   * Por padrão, o Adonis retorna apenas o primeiro erro, sendo assim, fazemos
   * o método validateAll para retornar todos os erros que tiveram na request
   */
  get validateAll () {
    return true
  }

  get rules () {
    return {
      username: 'required|unique:users', // único na tabela de users
      email: 'required|email|unique:users',
      password: 'required|confirmed' // confirmed: força que seja enviado a
      // confirmação de senha "password_confirmation" mesmo que ela não exista
      // no model nem na migration
    }
  }
}

module.exports = User
