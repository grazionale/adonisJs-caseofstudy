'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/**
 * Por padrão, o Adonis não consegue interpretar os relacionamentos que são feitos
 * nas migrations, sendo assim, é necessário declarar esses relacionamentos na
 * model.
 */
class Project extends Model {
  user () {
    return this.belongsTo('App/Models/User') // Um projeto percente a um usuário
  }

  tasks () {
    return this.hasMany('App/Models/Task') // Um projeto pode ter várias tasks
  }
}

module.exports = Project
