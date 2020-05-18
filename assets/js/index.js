let tarefas = [{
        id: 1,
        texto: "Escovar os dentes",
        prioridade: 3,
        feito: true
    },
    {
        id: 2,
        texto: "Rever as aulas",
        prioridade: 2,
        feito: true
    },
    {
        id: 3,
        texto: "Almoçar brócolis",
        prioridade: 2,
        feito: false
    },
    {
        id: 4,
        texto: "Regar as plantas",
        prioridade: 1,
        feito: false
    },
];
// Array de prioridade
let prioridades = ['[Baixa]', '[Média]', '[Alta]'];
//let prioridades = [{0:'baixa'}, {1:'média'}, {2:'Alta'}];

const render = tarefas => {
    // Capturar o elemento que contem a lista de tarefas

    let table = document.getElementById("table");

    // Alternativa para o document.getElementById("table"); esta é mais performático.
    // table = document.querySelector("table");

    // Limpar a lista
    table.innerHTML = "";

    // Criando a lista de tarefas
    for (const tarefa of tarefas) {

        // Criando uma linha de tabela
        let row = document.createElement('tr');
        if(tarefa.feito){
            // row.className = 'done';
            row.classList.add("done");
        }

        //Criar o input checkbox
        let checkbox = document.createElement('input');
        checkbox.setAttribute("type", "checkbox");
        checkbox.checked = tarefa.feito;

        //Criar a célula que vai conter o checkbox
        let tdCheck = document.createElement('td');
        tdCheck.appendChild(checkbox);

        // Adicionar esse tdCkeckbox à row
        row.appendChild(tdCheck); 

        //Criar a td de texto
        let tdTexto = document.createElement('td');
        tdTexto.innerText = tarefa.texto;
        row.appendChild(tdTexto);
        
        //Criar a td de prioridade
        let tdPrioridade = document.createElement('td');
        tdPrioridade.innerText = prioridades[(tarefa.prioridade) -1]; 
        // tdPrioridade.innerText = prioridades[tarefa.prioridade]; 
        row.appendChild(tdPrioridade);

        //Criar a td de ações
        let tdAcoes = document.createElement('td');
        let i = document.createElement('i');
        i.className = "material-icons";
        i.innerText = "delete";
        i.addEventListener('click', onDeleteClick);
        i.id = tarefa.id;
        tdAcoes.appendChild(i);
        row.appendChild(tdAcoes);


        //Adicionar a linha a tabela
        table.appendChild(row);
    }
};

const onDeleteClick = (evt) => {
    //Capturando o id da tarefa a ser removida;
    let id = Number(evt.target.id);

    //Confirmar a exclusão
    if(!window.confirm("Tem certeza que deseja excluir a tarefa?")){
        //Usuario clicou em não. Abortando.
        return;
    }
    //Remover a tarefa do array
    destroy(id);

    //renderizar novamente
    render(tarefas);
}

/**
 * Criar função create(texto,prioridade) que recebe um texto e prioridade como parâmetros
 * Essa função deve retornar um objeto literal com os seguintes campos
 * texto: com o texto passado por parâmetro
 * prioridade: com base na prioridade passada como parâmetro
 * feito: false
 */
const create = (texto, prioridade) => {
    
    //Determinando o id do novo elemento
    let id = (tarefas.length==0 ? 1 : tarefas[tarefas.length -1].id +1 );

    //retornando a nova tarefa
    return {
        id,
        texto,
        prioridade,
        feito: false
    }
}

/*Criar uma função destroy que recebe o id de uma tarefa como
*parametro e remove essa tarefa do array
*/
const destroy = (id) => {
    tarefas = tarefas.filter(t => t.id != id);
}

//Capturar o form
let form = document.getElementById('form');

//forma 1 ==================
// form.onsubmit = (evt) => {
//     console.log("teste");
// };

//FORMA 2 =================

//Crio a função:
const onFormSubmit = (evt) => { 

    //Evitar o comportamento padrão de um form
    evt.preventDefault();

    //Capturar o texto dogitado pelo usuário
    let texto = document.getElementById("tf_2do").value;

    //Testando se o texto é vazio
    if(texto.trim() == '') {
        return;
    }

    //Verificar se existe prioridade settada nesse texto
    let strInicio = texto.substr(0,3);
    let prioridade = 1;
    switch (strInicio){
        case '#1 ':
            prioridade = 1;
            texto = texto.slice(3);
            break;
        case '#2 ':
            prioridade = 2;
            texto = texto.slice(3);
            break;
        case '#3 ':
            prioridade = 3;
            texto = texto.slice(3);
            break;

        default:
            prioridade = 1;
            break;
    }

    //Criar o Objeto de tarefa sabendo o texto e a prioridade
    let tarefa = create(texto, prioridade);

    //Adicionar o objeto tarefa ao array de tarefas
    tarefas.push(tarefa);

    //Renderizar a minha lista novamente
    render(tarefas);

    //Limpar o campo de texto
    document.getElementById("tf_2do").value = "";
}

form.addEventListener('submit', onFormSubmit);

render(tarefas);