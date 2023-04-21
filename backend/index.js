const express = require('express')
const cors = require('cors')

const employeeController = require('./src/modules/funcionarios/controller/employeeController.js')
const app = express()

app.use(cors())
app.use(express.json())
app.use(employeeController)

const PORT = 8000

app.listen(PORT, () => {
	console.log(`Servidor rodando em http://localhost:${8000}`)
})