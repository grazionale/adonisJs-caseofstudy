'use strict'

const TaskHook = exports = module.exports = {}
const Mail = use('Mail')
const Helpers = use('Helpers')
/**
 * Dispara um e-mail para um usuário toda vez que ele for associado a uma tarefa
 */
TaskHook.sendNewTaskMail = async taskInstance => {
  /**
   * Se não houver user_id e se o user_id não estiver no dirty (ou seja, não
   * foi alterado), então, não precisa disparar e-mail
   */
  if (!taskInstance.user_id && !taskInstance.dirty.user_id) return

  const { email, username } = await taskInstance.user().fetch() // Retorna o user relacionado a está task
  const file = await taskInstance.file().fetch()
  const { title } = taskInstance

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
