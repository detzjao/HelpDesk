const service = require('../services/ticketService')

exports.create = async (req, res, next) => {
  try {
    const result = await service.create({
      ...req.body,
      userId: req.userId
    })
    res.json({ success: true, data: result })
  } catch (err) {
    next(err)
  }
}

exports.list = async (req, res, next) => {
  try {
    const result = await service.list(req.query)
    res.json({ success: true, data: result })
  } catch (err) {
    next(err)
  }
}

exports.updateStatus = async (req, res, next) => {
  try {
    await service.updateStatus(req.params.id, req.body.status)
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
}

exports.delete = async (req, res, next) => {
  try {
    await service.delete(req.params.id)
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
}