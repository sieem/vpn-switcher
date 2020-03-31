const express = require('express')

const router = express.Router()

const serverController = require('./controllers/serverController')
const authController = require('./controllers/authController')

const authMiddleware = require('./middleware/authMiddleware')

router.post('/login', authController.login)

router.get('/locations', serverController.getServerLocations)

router.get('/servers', authMiddleware.verifyToken, serverController.getServerlist)
router.post('/server',  authMiddleware.verifyToken, serverController.createServer)
router.delete('/server', authMiddleware.verifyToken, serverController.deleteServer)
router.get('/server/connection-file/:SUBID', authMiddleware.verifyToken, serverController.getConnectionFile)


module.exports = router;