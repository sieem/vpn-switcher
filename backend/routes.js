const express = require('express')
const multer = require('multer')
const upload = multer()

const router = express.Router()

const serverController = require('./controllers/serverController')

const authMiddleware = require('./middleware/authMiddleware')

router.get('/get-companies', authMiddleware.verifyToken, serverController.getCompanies)
router.post('/save-company', upload.none(), authMiddleware.verifyToken, serverController.saveCompany)
router.delete('/remove-company/:companyId', authMiddleware.verifyToken, serverController.removeCompany)

module.exports = router;