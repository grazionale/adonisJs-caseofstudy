'use strict'

const Mail = use('Mail')
const Helpers = use('Helpers')

class NewTaskMail {
  /**
   * Concorrência do job. (return 1 significa que será feito um de cada vez)
   */
  static get concurrency () {
    return 1
  }

  /**
   * Chave única para cada job
   */
  static get key () {
    return 'NewTaskMail-job'
  }

  /**
   * Método que faz a lógica do envio de e-mail
   */
  async handle ({ email, username, file, title }) {
    console.log(`Job: ${NewTaskMail.key}`)

    await Mail.send(
      ['emails.new_task'],
      { username, title, hasAttachment: !!file },
      message => {
        message.to(email)
          .from('gabriel@hotmail.com')
          .subject('Nova tarefa para você')

        /**
          * Se tiver um arquivo na tarefa, então anexa ela no e-mail.
          * Helpers irá pegar o arquivo temporário, e em seguida, renomear
          * para o nome original do arquivo, substituindo o nome temporário.
        */
        if (file) {
          message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
            filename: file.name
          })
        }
      })
  }
}

module.exports = NewTaskMail
