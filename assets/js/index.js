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
        feito: true
    },
    {
        id: 4,
        texto: "Regar as plantas",
        prioridade: 1,
        feito: false
    },
];

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

        //Criar o input checkbox
        let checkbox = document.createElement('input');
        checkbox.setAttribute("type", "checkbox");

        //Criar a célula que vai conter o checkbox
        let tdCheck = document.createElement('td');
        tdCheck.appendChild(checkbox);

        // Adicionar esse tdCkeckbox à row
        row.appendChild(tdCheck); 

        //Criar a td de texto
        let tdTexto = document.createElement('td');
        tdTexto.innerText = tarefa.texto;
        row.appendChild(tdTexto);

        //Criar a td de ações
        let tdAcoes = document.createElement('td');
        let i = document.createElement('i');
        i.className = "material-icons";
        i.innerText = "delete";
        tdAcoes.appendChild(i);
        row.appendChild(tdAcoes);


        //Adicionar a linha a tabela
        table.appendChild(row);
    }
};



/**
 * Criar função create(texto,prioridade) que recebe um texto e prioridade como parâmetros
 * Essa função deve retornar um objeto literal com os seguintes campos
 * texto: com o texto passado por parâmetro
 * prioridade: com base na prioridade passada como parâmetro
 * feito: false
 */
const create = (texto, prioridade) => {
    return {
        texto,
        prioridade,
        feito: false
    }
}

//Capturar o form
let form = document.getElementById('form');

//forma 1 ==================
// form.onsubmit = (evt) => {
//     console.log("teste");
// };

//FORMA 2 =================
form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    console.log("teste");
    console.log(evt);
});

render(tarefas);