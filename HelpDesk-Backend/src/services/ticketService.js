const repository = require('../repositories/ticketRepository')

exports.create = async (data) => {
  if (!data.title) throw new Error('Título obrigatório')
  return repository.create(data)
}

exports.list = async (query) => {
  const page = parseInt(query.page) || 1
  const limit = parseInt(query.limit) || 10
  const offset = (page - 1) * limit

  return repository.findAll({
    status: query.status,
    limit,
    offset
  })
}

exports.updateStatus = async (id, status) => {
  return repository.updateStatus(id, status)
}

exports.delete = async (id) => {
  return repository.delete(id)
}