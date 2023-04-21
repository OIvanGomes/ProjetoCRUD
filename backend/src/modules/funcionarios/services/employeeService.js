const fs = require("fs")
const path = require("path")
const {v4 : uuidv4} = require('uuid')
module.exports = {
    findAll(){
        const buffer = fs.readFileSync(path.join(__dirname.split('\src')[0] + 'src/database/employee.json'));
        const json = JSON.parse(buffer.toString());

        return json
    },
    findByName(nome){
        const buffer = fs.readFileSync(path.join(__dirname.split('\src')[0] + 'src/database/employee.json'));
        const json = JSON.parse(buffer.toString());

        let employeeIndex = json.employees.findIndex(employee => employee.nome === nome)
        console.log(json.employees[employeeIndex])
        return json.employees[employeeIndex]
    },
    create(body){
        const buffer = fs.readFileSync(path.join(__dirname.split('\src')[0] + 'src/database/employee.json'));
        const json = JSON.parse(buffer.toString());

        const newEmployee = body
        newEmployee.id = uuidv4()
        json.employees.push(newEmployee)

        fs.writeFileSync(path.join(__dirname.split('\src')[0] + 'src/database/employee.json'), JSON.stringify(json, null, 4))
        return newEmployee
    },
    update(body){
        const buffer = fs.readFileSync(path.join(__dirname.split('\src')[0] + 'src/database/employee.json'));
        const json = JSON.parse(buffer.toString());

        let employeeIndex = json.employees.findIndex(employee => employee.nome === body.nome)
        json.employees[employeeIndex] = body

        fs.writeFileSync(path.join(__dirname.split('\src')[0] + 'src/database/employee.json'), JSON.stringify(json, null, 4))
        return json.employees[employeeIndex]
    },
    delete(body){
        const buffer = fs.readFileSync(path.join(__dirname.split('\src')[0] + 'src/database/employee.json'));
        const json = JSON.parse(buffer.toString());
        console.log('hahaha', body.nome)

        let employeeIndex = json.employees.findIndex(employee => employee.nome === body.nome)
        const deletedEmployee = json.employees.splice(employeeIndex, 1)

        fs.writeFileSync(path.join(__dirname.split('\src')[0] + 'src/database/employee.json'), JSON.stringify(json, null, 4))
        return deletedEmployee
    }
}