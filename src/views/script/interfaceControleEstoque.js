import GestorBancoBotas from '../../controller/GestorBancoBotas.js';
import Connection from '../../controller/Connection.js';
const openModal = () => document.getElementById('modal')
    .classList.add('active');

const closeModal = () => document.getElementById('modal')
    .classList.remove('active');

const abrirModal = document.getElementById('cadastrarCalcado');
abrirModal.addEventListener('click', openModal);

//evento do botão que fecha o modal e reseta o formulario para o estado original
const fecharModal = document.getElementById('modalClose')
fecharModal.addEventListener('click', function(event){
    const botaoCadEdit = document.getElementById('botaoCadastrarEditar');
    botaoCadEdit.textContent = 'Cadastrar';
    botaoCadEdit.removeAttribute('data-id');
    document.getElementById('formularioBotas').reset();
    closeModal();
});
const connection = new Connection();

//caso não haja usuario logado, redirecionara para a tela de login
connection.auth.onAuthStateChanged(user=>{
    if(!user){
        window.location.href= 'index.html';
    }
});

document.getElementById('logOut').addEventListener('click',async()=>{
    try{
        const result = await connection.logout();
        if(result){
            window.location.href = 'index.html'
        }
    }catch(error){
        alert(error.message)
    }
});

const bancoBotas = new GestorBancoBotas();
bancoBotas.carregarDados();

//chamada dos dados para construir a tabela
window.onload = function() { 
    mostrarDados(bancoBotas.obterBotas());
}
//evento principal do formulário
const formBotas = document.getElementById('formularioBotas');
formBotas.addEventListener('submit',cadastrar);

function addBotoes(i){
    const botaoEditar = document.createElement('button');
    const botaoExcluir = document.createElement('button');
    botaoEditar.id = i;
    botaoEditar.className='button green';
    botaoEditar.textContent='Editar';
    botaoEditar.addEventListener('click', function(event){ 
        const botaoId = event.target.id;
        openModal();
        editarCalcado(botaoId);
    })// neste evente se pega o id do botão ao clicar e chama a função editarCalcados

    botaoExcluir.id = i;
    botaoExcluir.className = 'button red';
    botaoExcluir.textContent = 'Excluir';
    // neste evente se pega o id do botão ao clicar e chama a função deletarCalcados
    botaoExcluir.addEventListener('click', function(event){ 
        const botaoId = event.target.id;
        // console.log('Excluir o item Id:', buttonId);
        deletarCalcado(botaoId);
    });

    const tdBotoes = document.createElement('td');
    tdBotoes.appendChild(botaoEditar);
    tdBotoes.appendChild(botaoExcluir);
    return tdBotoes;
}

function mostrarDados(db_botas){
    /*Dentro dessa função é criado os elementos da tabela, cabeçalhos e linhas da tabela
     e é feita a leitura dos dados do array de objetos e inseridos dentro da taabela*/

    const tabelaCalcados = document.getElementById('tabelaCalcados');
    tabelaCalcados.innerHTML=''; 
    /*essa linha faz a limpeza de toda tabela para ser atualizada e não gerar 
    linhas duplicadas quando a função é chamada para atualizar a tabela*/

    const cabecalhos = ['Código ','Categoria ','Tipo de Solado ','Tipo de Couro ','Tamanho ','Quantidade de Pares ','Ação'];
    const trCabecalho = document.createElement('tr')
    // array com os título, cabeçalhos da tabela

    cabecalhos.forEach((titulo)=>{
        let th = document.createElement('th');
        th.textContent= titulo;
        trCabecalho.appendChild(th)
    });//aqui foi usado o forEach para percorrer o array e ir adicionando os Títulos na tabela
    tabelaCalcados.appendChild(trCabecalho);

    for(let i=0; i<db_botas.length; i++){
        /*Nesse for é percorrido o array de objetos, base de dados, e adicionados os 
        elementos tr e tds na tabela*/
        let tr = document.createElement('tr')
        
        let tdCodigo = document.createElement('td');
        tdCodigo.textContent = db_botas[i].codigo;
        tr.appendChild(tdCodigo);

        let tdCategoria = document.createElement('td');
        tdCategoria.textContent = db_botas[i].categoria;
        tr.appendChild(tdCategoria);

        let tdTipoSolado = document.createElement('td');
        tdTipoSolado.textContent = db_botas[i].tipoSolado;
        tr.appendChild(tdTipoSolado);

        let tdTipoCouro = document.createElement('td');
        tdTipoCouro.textContent = db_botas[i].tipoCouro;
        tr.appendChild(tdTipoCouro);

        let tdTamanho = document.createElement('td');
        tdTamanho.textContent = db_botas[i].tamanho;
        tr.appendChild(tdTamanho);

        let tdQuantidade = document.createElement('td');
        tdQuantidade.textContent = db_botas[i].quantidadeDePares;
        tr.appendChild(tdQuantidade);

        tr.appendChild(addBotoes(i));
        tabelaCalcados.appendChild(tr);
        }
}
function cadastrar(event){
    event.preventDefault();
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

    if(editId === null){
        bancoBotas.adicionarBota(codigo,categoria,tipoSolado,tipoCouro,tamanho,quantidade);
       
    }
    //Se não faz a edição do objeto que tenha a posição igual ao data-id
    else{

        bancoBotas.editarBota(editId, codigo, categoria,tipoSolado,tipoCouro,tamanho,quantidade)
        botaoCadEdit.textContent = 'Cadastrar';
        botaoCadEdit.removeAttribute('data-id');
        closeModal();
    }
    mostrarDados(bancoBotas.obterBotas());
    event.target.reset();
    
}

function editarCalcado(id){
    /*
    essa função vai somente carregar os dados no formulário 
    para a edição e mudar o status do botão cadastrar para editar
        Após esse carregamento ao clicar no novo botão editar vai
    entrar no else da função cadastrar
    */
    const botaoCadEdit = document.getElementById('botaoCadastrarEditar');
    botaoCadEdit.textContent= 'Editar';
    botaoCadEdit.setAttribute('data-id',id);//adicionando o atributo data-id para mudar o status do botão cadastrar
    //pega os campos
    const codigo = document.getElementById('codigo');
    const categoria = document.getElementById('categoria');
    const tipoSolado = document.getElementById('tipoSolado');
    const tipoCouro = document.getElementById('tipoCouro');
    const tamanho = document.getElementById('tamanho');
    const quantidade = document.getElementById('quantidade');
    //pega o array no id e joga nos campos
    const botina = bancoBotas.obterBotas()[id];
    codigo.value = botina.codigo;
    categoria.value = botina.categoria;
    tipoSolado.value = botina.tipoSolado;
    tipoCouro.value = botina.tipoCouro;
    tamanho.value = botina.tamanho;
    quantidade.value = botina.quantidadeDePares;
    }

// função que deleta o objeto do array e atualiza a tabela
function deletarCalcado(id){
    const confirmacao = confirm('Deseja realmente excluir a bota de código '+bancoBotas.obterBotas()[id].codigo+' da base de dados');
    if(confirmacao){
        bancoBotas.deletarBota(id);
        mostrarDados(bancoBotas.obterBotas());
    }
}