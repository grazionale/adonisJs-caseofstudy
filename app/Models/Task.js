'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {
  static boot () { // Static boot comporta-se como um construtor.
    super.boot()
    /**
     * Antes de salvar ou atualizar, chama a TaskHook no método sendNewTaskMail
     */
    this.addHook('afterCreate', 'TaskHook.sendNewTaskMail')
    this.addHook('beforeUpdate', 'TaskHook.sendNewTaskMail')
  }

  project () {
    return this.belongsTo('App/Models/Project') // Tarefa percente a um projeto
  }

  user () {
    return this.belongsTo('App/Models/User') // Tarefa percente a um usuário
  }

  file () {
    return this.belongsTo('App/Models/File') // Tarefa percente a um arquivo
  }
}

module.exports = Task
