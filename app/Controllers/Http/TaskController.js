'use strict'
const Task = use('App/Models/Task')
class TaskController {
  async index ({ params }) {
    const tasks = await Task.query()
      .where('project_id', params.projects_id)
      .with('user').fetch()

    return tasks
  }

  async store ({ params, request, auth }) {
    const data = request.only(['title', 'description', 'due_date', 'file_id', 'user_id'])

    const task = await Task.create({ ...data, project_id: params.projects_id })

    return task
  }

  async show ({ params, request, response, view }) {
    const task = await Task.findOrFail(params.id)

    await task.load('project')
    await task.load('user')
    await task.load('file')

    return task
  }

  async update ({ params, request, response }) {
    const task = await Task.findOrFail(params.id)
    const data = request.only(['title', 'description', 'due_date', 'project_id', 'file_id'])

    task.merge(data)

    await task.save()

    return task
  }

  async destroy ({ params, request, response }) {
    const task = await Task.findOrFail(params.id)

    task.delete()
  }
}

module.exports = TaskController
