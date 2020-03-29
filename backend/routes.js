const express = require('express')
const multer = require('multer')
const upload = multer()

const router = express.Router()

const serverController = require('./controllers/serverController')

const authMiddleware = require('./middleware/authMiddleware')

router.get('/servers', authMiddleware.verifyToken, serverController.getServerlist)
router.post('/server', upload.none(), authMiddleware.verifyToken, serverController.startServer)
router.delete('/server', authMiddleware.verifyToken, serverController.shutdownServer)

module.exports = router;