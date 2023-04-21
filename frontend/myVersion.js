const modal = document.querySelector('.modal-container')
const form = document.getElementById('registerForm')
const tbody = document.querySelector('tbody')
const btnSalvar = document.querySelector('#btnSalvar')

let context = {
    employeeList:[]
}

window.onload = doRequest("findAll")
window.onload = updateScreen

function openModal(action, target=null){
    modal.classList.add('active')
    switch(action) {
        case 'create':
            btnSalvar.onclick = (e) => handleCreate(e);
            break;
        case 'update':
            btnSalvar.onclick = (e) => handleUpdate(e, target)
            break;
    }
    modal.onclick = e => {
        if(e.target.className.indexOf('modal-container') !== -1){
            modal.classList.remove('active')
        }
    }
}

function updateScreen(){
    context.employeeList.forEach(employee =>{
        let tr = document.createElement('tr')
    
        tr.id = `tr-${employee.nome}`
    
        tr.innerHTML = `
            <td>${employee.nome}</td>
            <td>${employee.funcao}</td>

            <td>${parseFloat(employee.salario).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
            <td class = "acao">
                <button onclick = "openModal('update', '${tr.id}')"><i class = 'bx bx-edit' ></i></button>
            </td>
            <td class = "acao">
                <button onclick = "handleDelete('delete', '${tr.id}')"><i class = 'bx bx-trash' ></i></button>
        `
        tbody.appendChild(tr)
    })

}

function handleCreate(event) {
    event.preventDefault();
    const item = {}

    item.nome = form.elements.nome.value;
    item.funcao = form.elements.funcao.value;
    item.salario = form.elements.salario.value

    console.log(`Name: ${item.nome}, Funcao: ${item.funcao}, Salario: ${item.salario}`);
    doRequest("create", item)

    modal.classList.remove('active')
}

function handleUpdate(event,target) {
    event.preventDefault();
    const entryList = document.getElementById(target)
    const item = {
        nome : form.elements.nome.value,
        funcao : form.elements.funcao.value,
        salario : form.elements.salario.value

    }
    entryList.children[0].innerHTML = item.nome
    entryList.children[1].innerHTML = item.funcao
    entryList.children[2].innerHTML = item.salario
    doRequest("update", item)
    modal.classList.remove('active')
}

function handleDelete(event,target) {
    const entryList = document.getElementById(target)
    const item = {
        nome : entryList.children[0].innerHTML,
        funcao : entryList.children[1].innerHTML,
        salario : entryList.children[2].innerHTML

    }
    doRequest("delete", item)
    entryList.remove()
}

function doRequest(method, body){
    switch(method){
        case "findAll":
            fetch("http://localhost:8000/employee")
            .then(response => response.json())
            .then(json => {
                context.employeeList = json.employees
            }).then(() => {updateScreen()})
            break
        case "create":
            fetch("http://localhost:8000/employee", {method:"POST", body:JSON.stringify(body), headers : {
                'Content-Type': 'application/json'
              }}).then(() => {updateScreen()})
            break
        case "update":
            fetch("http://localhost:8000/employee", {method:"PUT", body:JSON.stringify(body), headers : {
                'Content-Type': 'application/json'
              }}).then(() => {updateScreen()})
            break
        case "delete":
            fetch("http://localhost:8000/employee", {method:"DELETE", body:JSON.stringify(body), headers : {
                'Content-Type': 'application/json'
              }}).then(() => {updateScreen()})
        default: 
              console.log('Método não encontrado')
    }

}