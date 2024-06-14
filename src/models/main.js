class Botina{
    constructor(codigo,categoria,tipoSolado,tipoCouro,tamanho,quantidadeDePares){
        this._codigo = codigo;
        this._categoria = categoria;
        this._tipoSolado = tipoSolado;
        this._tipoCouro = tipoCouro;
        this._tamanho = tamanho;
        this._quantidadeDePares = quantidadeDePares;
    }
    get codigo(){
        return this._codigo;
    }
    set codigo(codigo){
       this._codigo= codigo;
    }
    get categoria(){
        return this._categoria;
    }
    set categoria(categoria){
        this._categoria = categoria;
    }
    get tipoSolado(){
        return this._tipoSolado;
    }
    set tipoSolado(tipoSolado){
        this._tipoSolado = tipoSolado;
    }
    get tipoCouro(){
        return this._tipoCouro;
    }
    set tipoCouro(tipoCouro){
        this._tipoCouro = tipoCouro;
    }
    get tamanho(){
        return this._tamanho;
    }
    set tamanho(tamanho){
        this._tamanho = tamanho;
    }
    get quantidadeDePares(){
        return this._quantidadeDePares;
    }
    set quantidadeDePares(quantidadeDePares){
        this._quantidadeDePares = quantidadeDePares;
    }
}
const db_botas = [] //array que irá armazenar os dados 

const formBotas = document.getElementById('formularioBotas'); // variavel que referencia o formulário
formBotas.addEventListener('submit',cadastrar);

/* função criada para adicionar botões na tabela */
function addBotoes(i){
    let botaoEditar = document.createElement('button');
    let botaoExcluir = document.createElement('button');
    botaoEditar.id = i;
    botaoEditar.className='editar';
    botaoEditar.textContent='Editar';
    botaoEditar.addEventListener('click', function(event){ 
        let botaoId = event.target.id;
        editarCalcado(botaoId);
    })// neste evente se pega o id do botão ao clicar e chama a função editarCalcados


    botaoExcluir.id = i;
    botaoExcluir.className = 'excluir';
    botaoExcluir.textContent = 'Excluir';
    // neste evente se pega o id do botão ao clicar e chama a função deletarCalcados
    botaoExcluir.addEventListener('click', function(event){ 
        let botaoId = event.target.id;
        // console.log('Excluir o item Id:', buttonId);
        deletarCalcado(botaoId);
    });

    let tdBotoes = document.createElement('td');
    tdBotoes.appendChild(botaoEditar);
    tdBotoes.appendChild(botaoExcluir);
    return tdBotoes;
}

function mostrarDados(db_botas){
    /*Dentro dessa função é criado os elementos da tabela, cabeçalhos e linhas da tabela
     e é feita a leitura dos dados do array de objetos e inseridos dentro da taabela*/

    let tabelaCalcados = document.getElementById('tabelaCalcados');

    tabelaCalcados.innerHTML=''; 
    /*essa linha faz a limpeza de toda tabela para ser atualizada e não gerar 
    linhas duplicadas quando a função é chamada para atualizar a tabela*/

    let cabecalhos = ['Código ','Categoria ','Tipo de Solado ','Tipo de Couro ','Tamanho ','Quantidade de Pares '];
    // array com os título, cabeçalhos da tabela

    cabecalhos.forEach((titulo)=>{
        let th = document.createElement('th');
        th.textContent= titulo;
        tabelaCalcados.appendChild(th);
    });//aqui foi usado o forEach para percorrer o array e ir adicionando os Títulos na tabela

    for(let i=0; i<db_botas.length; i++){
        /*Nesse for é percorrido o array de objetos, base de dados, e adicionados os 
        elementos tr e tds na tabela*/
        let tr = document.createElement('tr')
        
        for(let j in db_botas[i]){
            /* Esse for percorre cada objeto dentro do array */
            let td = document.createElement('td')
            td.textContent= db_botas[i][j];
            tr.appendChild(td)
        }
        tr.appendChild(addBotoes(i));
        tabelaCalcados.appendChild(tr);
    }

}
function cadastrar(event){
    event.preventDefault();
    //pega os dados dos campos
    const codigo = document.getElementById('codigo').value;
    const categoria = document.getElementById('categoria').value;
    const tipoSolado = document.getElementById('tipoSolado').value;
    const tipoCouro = document.getElementById('tipoCouro').value;
    const tamanho = document.getElementById('tamanho').value;
    const quantidade = document.getElementById('quantidade').value;
    //pega o atributo data-id do botão Cadastrar/Editar
    const botaoCadEdit = document.getElementById('botaoCadastrarEditar');
    const editId = botaoCadEdit.getAttribute('data-id');
    //se o campo estiver vazio, faz a inserção de um novo objeto no array
    if(editId == null){
        const bota = new Botina(codigo,categoria,tipoSolado,tipoCouro,tamanho,quantidade);
        db_botas.push(bota);
    }
    //Se não faz a edição do objeto que tenha a posição igual ao data-id
    else{

        db_botas[editId].codigo = codigo;
        db_botas[editId].categoria = categoria;
        db_botas[editId].tipoSolado = tipoSolado;
        db_botas[editId].tipoCouro = tipoCouro;
        db_botas[editId].tamanho = tamanho;
        db_botas[editId].quantidadeDePares = quantidade;

        botaoCadEdit.textContent = 'Cadastrar';
        botaoCadEdit.removeAttribute('data-id');
    }
    mostrarDados(db_botas);
    event.target.reset();
}

function editarCalcado(id){
    /*
    essa função vai somente carregar os dados no formulário 
    para a edição e mudar o status do botão cadastrar para editar
        Após esse carregamento ao clicar no novo botão editar vai
    entrar no else da função cadastrar
    */
    let botaoCadEdit = document.getElementById('botaoCadastrarEditar');
    botaoCadEdit.textContent= 'Editar';
    botaoCadEdit.setAttribute('data-id',id);//adicionando o atributo data-id para mudar o status do botão cadastrar

    const codigo = document.getElementById('codigo');
    const categoria = document.getElementById('categoria');
    const tipoSolado = document.getElementById('tipoSolado');
    const tipoCouro = document.getElementById('tipoCouro');
    const tamanho = document.getElementById('tamanho');
    const quantidade = document.getElementById('quantidade');

    codigo.value = db_botas[id].codigo;
    categoria.value = db_botas[id].categoria;
    tipoSolado.value = db_botas[id].tipoSolado;
    tipoCouro.value = db_botas[id].tipoCouro;
    tamanho.value = db_botas[id].tamanho;
    quantidade.value = db_botas[id].quantidadeDePares;
    }

// função que deleta o objeto do array e atualiza a tabela
function deletarCalcado(id){
    db_botas.splice(id,1);
    mostrarDados(db_botas);
}
mostrarDados(db_botas); // monta a tabela vazia na primeira abertura do site