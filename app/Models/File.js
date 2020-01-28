'use strict'

const Env = use('Env')

const Model = use('Model')

class File extends Model {
  /**
   * Campo virtual. Não está na migration e não vai para o banco.
   * Este campo url em específico, servirá para fornecer uma URL ao arquivo
   */
  static get computed () {
    return ['url']
  }

  getUrl({ id }) {
    return `${Env.get('APP_URL')}/files/${id}`
  }
}

module.exports = File
