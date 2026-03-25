// ABRE O JSON
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// FUNÇÃO PARA SALVAR NO LOCALSTORAGE.
function salvarLocal() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}  

//FUNÇÃO DE LISTAR TAREFA PENDENTES
function listarTarefa() {

    let tabela = document.getElementById("item"); //le o id item para modificarmos depois
    if(!tabela) return; 
    
    tabela.innerHTML = "";
    
    //verifica se possui tarefa cadastrada.
    let tarefasPendentes = tarefas.filter(t => t.status !== "Concluída");
    if(tarefasPendentes.length === 0){
        tabela.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }
    
    //lista as tarefas
    tarefas.forEach((tarefa,index)=>{
        let textoBotao = tarefa.status === "Concluída" ? "Reabrir" : "Concluir"; //verifica se o status está como con concluido
        let classePrioridade = ""; //variavel para pegarmos o value do options
        if(tarefa.status === "Concluída") return;
        
        if(tarefa.prioridade.toLowerCase().includes("baixa")){
            classePrioridade = "baixa";
        } 
        else if(tarefa.prioridade.toLowerCase().includes("media")){
            classePrioridade = "media";
        } 
        else if(tarefa.prioridade.toLowerCase().includes("alta")){
            classePrioridade = "alta";
        }

        // aqui lista as variaveis e faz aparecer no html
        tabela.innerHTML += `
            <div id="item-tarefa" class="${classePrioridade}">
                <h3 class="item-titulo"> ${tarefa.titulo}</h3>
                <p> <strong>Descrição:</strong> ${tarefa.desc}</p>
                <p> <strong>Data:</strong> ${tarefa.data}</p>
                <p> <strong>Prioridade:</strong> ${tarefa.prioridade}</p>
                <p> <strong>Status:</strong> ${tarefa.status}</p>
                <div class="acoes">
                    <button class="botao editar"onclick="editarTarefa(${index})">Editar</button>
                    <button class="botao excluir"onclick="excluirTarefas(${index})">Excluir</button>
                    <button class="botao concluir" onclick="concluirTarefa(${index})">${textoBotao}</button>
                </div>    
            </div> 
        `;
    })
}

//FUNÇÃO DE LISTAR TAREFA CONCLUIDAS
function listarConcluidas() {

    let tabela = document.getElementById("item-c"); //le o id item para modificarmos depois
    if(!tabela) return;

    tabela.innerHTML = "";       
    
    let tarefasConcluidas = tarefas.filter(t => t.status === "Concluída");
    if(tarefasConcluidas.length === 0){
        tabela.innerHTML = "<p>Nenhuma tarefa concluída.</p>";
        return;
    }

    tarefas.forEach((tarefa,index)=>{
        if(tarefa.status !== "Concluída") return; // ignora tarefas concluídas
        let textoBotao = tarefa.status === "Concluída" ? "Reabrir" : "Concluir"; //verifica se o status está como con concluido
        let classePrioridade = "";

        if(tarefa.prioridade.toLowerCase().includes("baixa")){
            classePrioridade = "baixa";
        } 
        else if(tarefa.prioridade.toLowerCase().includes("media")){             //if e else para pegarmos o value do options
            classePrioridade = "media";
        } 
        else if(tarefa.prioridade.toLowerCase().includes("alta")){
            classePrioridade = "alta";
        }

        // aqui lista as variaveis e faz aparecer no html
        tabela.innerHTML += `
            <div id="item-tarefa" class="${classePrioridade}">
                <h3 class="item-titulo"> ${tarefa.titulo}</h3>
                <p> <strong>Descrição:</strong> ${tarefa.desc}</p>
                <p> <strong>Data:</strong> ${tarefa.data}</p>
                <p> <strong>Prioridade:</strong> ${tarefa.prioridade}</p>
                <p> <strong>Status:</strong> ${tarefa.status}</p>
                <div class="acoes">
                    <button class="botao concluir" onclick="concluirTarefa(${index})">${textoBotao}</button>
                </div>    
            </div> 
        `;
    })
}

//FUNÇÃO DE SALVAR TAREFA
let form = document.getElementById("formTarefa");

if(form){
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        let titulo = document.getElementById("titulo").value;
        let desc = document.getElementById("descricao").value;
        let data = document.getElementById("data").value;
        let prioridade = document.getElementById("prioridade").value;
        let status = document.getElementById("status").value;

        let index = document.getElementById("index").value;
        let tarefa = {titulo, desc, data, prioridade, status};

        if (index === "") {
            tarefas.push(tarefa);
        } else {
            tarefas[index] = tarefa;
        }

        salvarLocal();
        listarTarefa();
        this.reset();

        document.getElementById("index").value = "";
    });
}

//FUINÇAO DE EDITAR TAREFA
function editarTarefa(i){  
    let tarefa = tarefas[i] //pega o index de tarefa

    document.getElementById("titulo").value = tarefa.titulo;
    document.getElementById("descricao").value = tarefa.desc;
    document.getElementById("data").value = tarefa.data;
    document.getElementById("prioridade").value = tarefa.prioridade;
    document.getElementById("status").value = tarefa.status;
    document.getElementById("index").value = i;
   
}

function excluirTarefas(i) {
    if(confirm("Deseja excluir? ")) {
        tarefas.splice(i,1);                //splice remove itens do array
        salvarLocal();
        location.reload()
        listarTarefa();
        
    }
}

//FUNÇÃO DE BUSCAR A TAREFA
function buscarTarefa(){
    let input = document.getElementById("busca");               
    let termo = document.getElementById("busca").value.toLowerCase();
    let tabela = document.getElementById("item");
    tabela.innerHTML = "";

    tarefas.forEach((tarefa, index) => {

        let classePrioridade = "";

        if(tarefa.prioridade.toLowerCase().includes("baixa")){
            classePrioridade = "baixa";
        } 
        else if(tarefa.prioridade.toLowerCase().includes("media")){
            classePrioridade = "media";
        } 
        else if(tarefa.prioridade.toLowerCase().includes("alta")){
            classePrioridade = "alta";
        }

        if(
            tarefa.titulo.toLowerCase().includes(termo) &&     //aqui que se tem a verificação do termo buscado
            tarefa.status !== "Concluída"   //verificação de que se o status estiver concluido ele nao entra na busca
        ) {
                tabela.innerHTML += 
                `
                <div id="item-tarefa" class="${classePrioridade}">
                    <h3 class="item-titulo"> ${tarefa.titulo}</h3>
                    <p> <strong>Descrição:</strong> ${tarefa.desc}</p>
                    <p> <strong>Data:</strong> ${tarefa.data}</p>
                    <p> <strong>Prioridade:</strong> ${tarefa.prioridade}</p>
                    <p> <strong>Status:</strong>${tarefa.status}</p>
                    <div class="acoes">
                        <button class="botao editar"onclick="editarTarefa(${index})">Editar</button>
                        <button class="botao excluir"onclick="excluirTarefas(${index})">Excluir</button>
                        <button class="botao concluir" onclick="concluirTarefa(${index})">Concluir</button>
                    </div>    
                </div> 
            `;
            }
        });

    input.value = ""; //deixa o input de busca vazio após buscar
    }


//FUNÇÃO PARA CONCLUIR TAREFA
function concluirTarefa(i){
    if(tarefas[i].status === "Concluída"){
        tarefas[i].status = "Pendente";           //aqui ele faz a troca do status dependendo de qual está
    } else {
        tarefas[i].status = "Concluída";
    }

    salvarLocal();
    if(document.getElementById("item-c")){ //ve qual pagina estou (item-cONCLUIDO) e lista
        listarConcluidas();
    }

    if(document.getElementById("item")){ //ve qual pagina estou (item) e lista
        listarTarefa();
    }
}

listarTarefa();
listarConcluidas();



