'use strict'

const Project = use('App/Models/Project')

class ProjectController {
  /**
   *  .query inicia um query
   *  .with começa a criação de um relacionamento
   *  .fetch para finalizar a query e se for usar paginação, coloca .paginate()
   */
  async index ({ request }) {
    const { page } = request.get() // Captura os parâmetros da URL
    const projects = await Project.query().with('user').paginate(page)

    return projects
  }

  async store ({ request, auth }) {
    const data = request.only(['title', 'description'])

    const project = await Project.create({ ...data, user_id: auth.user.id })

    return project
  }

  /**
  * Quando queremos trazer os relacionamento de um único objeto, e não de
  * uma lista como ocorreu no método index(). Usamos a seguinte instrução
  * nome_do_objeto.load('nome_do_relacionamento')
  */
  async show ({ params }) {
    const project = await Project.findOrFail(params.id)

    await project.load('user') // Nome do relacionamento definido na model Project
    await project.load('tasks')

    return project
  }

  async update ({ params, request }) {
    const project = await Project.findOrFail(params.id)
    const data = request.only(['title', 'description'])

    project.merge(data) // Coloca as informações do Data dentro do project

    await project.save()

    return project
  }

  async destroy ({ params }) {
    const project = await Project.findOrFail(params.id)

    await project.delete()
  }
}

module.exports = ProjectController
