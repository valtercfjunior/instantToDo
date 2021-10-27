
let banco = []

const getBanco = () => JSON.parse(localStorage.getItem('toDoList')) ?? [] 
//pega o array do localstorage
const setBanco = (banco) => localStorage.setItem('toDoList', JSON.stringify(banco)) 
//abastece o localstorage com string


const abastecerBanco = (event) => {
//após precionar ENTER e verificar se não está vazio, abastece o banco 
    let keyEnter = "Enter"
    const txt = event.target.value;

    if (event.key === keyEnter && event.target.value !==''){
        const banco = getBanco()
        banco.push({'tarefa': txt, 'status':''})
        setBanco(banco)
        renderizar()
        event.target.value = ''
    }
}

const $html = document.querySelector('html')
const $checkbox = document.getElementById('checkDarkMode')


function changeToDarkMode(){
$html.classList.toggle('dark-mode')
}
 

function criarTarefa(tarefa, status, indice){
//adiciona no HTML a nova tarefa
    const novaDiv = document.createElement('div')
    novaDiv.innerHTML = `
    <label class="toDos">
                <input class="tarefa_checkbox" type="checkbox" ${status} data-indice=${indice} >
                <div class="tarefa_div"> ${tarefa} </div>
                <input type="button" value="X" data-indice=${indice}>               
            </label>    
    `
    document.getElementById('toDos').appendChild(novaDiv);
}
const limparTarefas = () =>{ 
//evita duplicar renderizar()
    const lista = document.getElementById('toDos')
    lista.innerHTML = ''
}

const renderizar = () =>{
//manda pra função criarTarefa() cada item do array do banco
    limparTarefas()
    const banco = getBanco()
    banco.forEach ((item, indice) =>criarTarefa(item.tarefa, item.status, indice))
    
}

const removerItem = (indice) =>{
//remove a tarefa do banco
    const banco = getBanco()
    banco.splice(indice,1);
    setBanco(banco)
    renderizar()
}

 const atualizarStatus = (indice) =>{
//atualiza o objeto 'status' do banco
    const banco = getBanco() 
    banco[indice].status = banco[indice].status === '' ? 'checked' : ''
    //se status for '' muda pra 'checked' e vice-versa
    if (banco[indice].status == 'checked'){
        const salvarTarefa = banco[indice]
        banco.splice(indice,1)
        banco.push(salvarTarefa)
    }else if(banco[indice].status == ''){
        const salvarTarefa = banco[indice]
        banco.splice(indice,1)
        banco.unshift(salvarTarefa)

    }

    setBanco(banco)
    renderizar()
} 

const clickItem = (event) => {
//função condicional pra verificar se dispara a função de remover a tarefa ou atualizar o status no banco
    const elemento = event.target
    if (elemento.type === 'button'){
        //joga a tarefa checked pra baixo
        const indice = elemento.dataset.indice
        removerItem(indice)
     }else if (elemento.type === 'checkbox'){
        const indice = elemento.dataset.indice
        atualizarStatus(indice)
        //joga a tarefa unchecked pra cima
         
    }
    
}

document.getElementById('toDos').addEventListener('click', clickItem)
//dispara a função clickItem caso ocorra o evento click

renderizar()
//atualiza sempre que alterar o banco


