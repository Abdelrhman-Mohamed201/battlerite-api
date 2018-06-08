const express = require("express")
const router = express.Router()
const multer = require('../config/multer').single('img')
const controller = require('../controllers/news')

router.get('/g', controller.getAll)
router.post('/p', multer, controller.create)
router.get('/g/:newsId',controller.getById)
router.patch('/u/:newsId', controller.update)
router.delete('/d/:newsId', controller.remove)

module.exports = router