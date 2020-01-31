'use strict'

const TaskHook = exports = module.exports = {}
const Kue = use('Kue')
const Job = use('App/Jobs/NewTaskMail')
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

  /**
   * Key do Job, parametros, configurações (opcional)
   * attempts é um parametro de configuração que tenta realizar o disparo
   * deste job até 3 vezes
   */
  Kue.dispatch(Job.key, { email, username, file, title }, { attempts: 3 })
}
