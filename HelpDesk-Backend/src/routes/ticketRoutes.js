const express = require('express')
const router = express.Router()
const controller = require('../controllers/ticketController')
const auth = require('../middlewares/authMiddleware')

router.use(auth)

router.post('/', controller.create)
router.get('/', controller.list)
router.put('/:id', controller.updateStatus)
router.delete('/:id', controller.delete)

module.exports = router