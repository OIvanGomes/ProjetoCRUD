const controller = require('express').Router()
const employeeService = require('../services/employeeService.js')

// controller.get('/employee', (req, res) => {
//     res.send(JSON.stringify({nome: "Ivan", cargo: "backend", salario: 999999}));
// });

controller.post('/employee', (req, res) => {
    if(Object.keys(req.body).length === 0)
        return res.status(400).send("Body inválido")
    if(isNaN(req.body.salario))
        return res.status(400).send("Salário deve ser numérico")
    const response = employeeService.create(req.body)
    return res.send(response)
})

controller.put('/employee', (req, res) =>{
    if(Object.keys(req.body).length === 0)
        return res.status(400).send("Body inválido")

    if(isNaN(req.body.salario))
        return res.status(400).send("Salário deve ser numérico")
    const response = employeeService.update(req.body)
    return res.send(response)
})

controller.get('/employee', (req, res) =>{
    const response = employeeService.findAll()
    return res.send(response)
})

controller.delete('/employee', (req, res) => {
    const response = employeeService.delete(req.body)
    return res.send(response)
})

controller.get('/employee/find', (req, res) =>{
    if(!req.query.name)
        return res.status(400).send("Nome não consta")
    const nameParam = req.query.name
    const response = employeeService.findByName(nameParam)
    return res.send(response)
})

module.exports = controller