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
fecharModal.addEventListener('click', function (event) {
    const botaoCadEdit = document.getElementById('botaoCadastrarEditar');
    botaoCadEdit.textContent = 'Cadastrar';
    botaoCadEdit.removeAttribute('data-id');
    document.getElementById('formularioBotas').reset();
    closeModal();
});

const connection = new Connection();
const bancoBotas = new GestorBancoBotas();

//caso não haja usuario logado, redirecionara para a tela de login
connection.auth.onAuthStateChanged(async (user) => {
    if (!user) {
        window.location.href = 'index.html';
    } else {
        //recebe o array de botas assincrono do firestore
        try {
            const nomeUser = await connection.carregarUserData(user.uid);
            //console.log('primeiro',nomeUser.nome)
            document.getElementById('nomeUsertop').textContent= `🔧 ${nomeUser.nome}`;
            const db_botas = await bancoBotas.carregarDados(user);
            //console.log(db_botas)
            if (typeof (db_botas) != 'string') {
                mostrarDados(db_botas);
            }
        } catch (error) {
            //console.log(error);
            alert(error.message);
        }
    }
});

//botão mais informações
const openModalInfo = () => document.getElementById('userInfo')
    .classList.add('active');

const closeModalInfo = () => document.getElementById('userInfo')
    .classList.remove('active');

document.getElementById('maisInfo').addEventListener('click', () => {
    carregarInfoUser(connection.auth.currentUser.uid);
    openModalInfo();
});
document.getElementById('modalCloseInfo').addEventListener('click', () => {
    closeModalInfo();
});



//botão logOut
document.getElementById('logOut').addEventListener('click', async () => {
    try {
        const result = await connection.logout();
        if (result) {
            window.location.href = 'index.html'
        }
    } catch (error) {
        alert(error.message)
    }
});
//evento principal do formulário
const formBotas = document.getElementById('formularioBotas');
formBotas.addEventListener('submit', cadastrar);

function addBotoes(i) {
    const botaoEditar = document.createElement('button');
    const botaoExcluir = document.createElement('button');
    botaoEditar.id = i;
    botaoEditar.className = 'button green';
    botaoEditar.textContent = 'Editar';
    botaoEditar.addEventListener('click', function (event) {
        const botaoId = event.target.id;
        openModal();
        editarCalcado(botaoId);
    })// neste evente se pega o id do botão ao clicar e chama a função editarCalcados

    botaoExcluir.id = i;
    botaoExcluir.className = 'button red';
    botaoExcluir.textContent = 'Excluir';
    // neste evente se pega o id do botão ao clicar e chama a função deletarCalcados
    botaoExcluir.addEventListener('click', function (event) {
        const botaoId = event.target.id;
        // console.log('Excluir o item Id:', buttonId);
        deletarCalcado(botaoId);
    });

    const tdBotoes = document.createElement('td');
    tdBotoes.appendChild(botaoEditar);
    tdBotoes.appendChild(botaoExcluir);
    return tdBotoes;
}

function mostrarDados(db_botas) {
    /*Dentro dessa função é criado os elementos da tabela, cabeçalhos e linhas da tabela
     e é feita a leitura dos dados do array de objetos e inseridos dentro da taabela*/

    const tabelaCalcados = document.getElementById('tabelaCalcados');
    tabelaCalcados.innerHTML = '';
    /*essa linha faz a limpeza de toda tabela para ser atualizada e não gerar 
    linhas duplicadas quando a função é chamada para atualizar a tabela*/

    const cabecalhos = ['Código ', 'Categoria ', 'Tipo de Solado ', 'Tipo de Couro ', 'Tamanho ', 'Quantidade de Pares ', 'Ação'];
    const trCabecalho = document.createElement('tr')
    // array com os título, cabeçalhos da tabela

    cabecalhos.forEach((titulo) => {
        let th = document.createElement('th');
        th.textContent = titulo;
        trCabecalho.appendChild(th)
    });//aqui foi usado o forEach para percorrer o array e ir adicionando os Títulos na tabela
    tabelaCalcados.appendChild(trCabecalho);

    for (let i = 0; i < db_botas.length; i++) {
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

        tr.appendChild(addBotoes(db_botas[i].uid));
        tabelaCalcados.appendChild(tr);
    }
}
async function cadastrar(event) {
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

    if (editId === null) {
        try {
            const user = await connection.auth.currentUser.uid;
            const message = await bancoBotas.adicionarBota(codigo, categoria, tipoSolado, tipoCouro, tamanho, quantidade, user);
            alert(message);
        } catch (error) {
            alert(error.message)
        }
    }
    //Se não faz a edição do objeto que exista no firestor igual ao de uid = data-id
    else {
        try {
            const user = await connection.auth.currentUser.uid;
            const message = await bancoBotas.editarBota(editId, codigo, categoria, tipoSolado, tipoCouro, tamanho, quantidade, user);
            alert(message);
            botaoCadEdit.textContent = 'Cadastrar';
            botaoCadEdit.removeAttribute('data-id');
            closeModal();

        } catch (error) {
            alert(error.message);
            botaoCadEdit.textContent = 'Cadastrar';
            botaoCadEdit.removeAttribute('data-id');
            closeModal();
        }

    }

    try {
        const db_botas = await bancoBotas.carregarDados(connection.auth.currentUser);
        //console.log(db_botas)
        if (typeof (db_botas) != 'string') {
            mostrarDados(db_botas);
        }
    } catch (error) {
        //console.log(error);
        alert(error.message);
    }

    event.target.reset();

}

async function editarCalcado(id) {
    /*
    essa função vai somente carregar os dados no formulário 
    para a edição e mudar o status do botão cadastrar para editar
        Após esse carregamento ao clicar no novo botão editar vai
    entrar no else da função cadastrar
    */
    const botaoCadEdit = document.getElementById('botaoCadastrarEditar');
    botaoCadEdit.textContent = 'Editar';
    botaoCadEdit.setAttribute('data-id', id);//adicionando o atributo data-id para mudar o status do botão cadastrar
    //pega os campos
    const codigo = document.getElementById('codigo');
    const categoria = document.getElementById('categoria');
    const tipoSolado = document.getElementById('tipoSolado');
    const tipoCouro = document.getElementById('tipoCouro');
    const tamanho = document.getElementById('tamanho');
    const quantidade = document.getElementById('quantidade');
    //pega o array no id e joga nos campos
    try {
        const botina = await bancoBotas.obterBotaPeloUid(id);
        //console.log('fuction editar', botina)

        codigo.value = botina.codigo;
        categoria.value = botina.categoria;
        tipoSolado.value = botina.tipoSolado;
        tipoCouro.value = botina.tipoCouro;
        tamanho.value = botina.tamanho;
        quantidade.value = botina.quantidadeDePares;

    } catch (error) {
        alert(error.message)
    }

}

// função que deleta o objeto do array e atualiza a tabela
async function deletarCalcado(id) {
    try {
        const bota = await bancoBotas.obterBotaPeloUid(id);
        const confirmacao = confirm('Deseja realmente excluir a bota de código ' + bota.codigo + ' da base de dados');
        if (confirmacao) {
            const message = await bancoBotas.deletarBota(id);
            alert(message);
        }
    } catch (error){
        alert('erro de deleção:',error.message);
    }

    try {
        const db_botas = await bancoBotas.carregarDados(connection.auth.currentUser);
        //console.log(db_botas)
        if (typeof (db_botas) != 'string') {
            mostrarDados(db_botas);
        }
    } catch (error) {
        //console.log(error);
        alert('carregamento',error.message);
    }
}
// carrega os dados na lista de mais informações
async function carregarInfoUser(uid) {
    const nomeUser = document.getElementById('nomeUser');
    const sNomeRazaoSocialUser = document.getElementById('sNomeRazaoSocialUser');
    const email = document.getElementById('email');
    const telefone = document.getElementById('telefone');
    const cpfCnpj = document.getElementById('cpfCnpj');
    try {
        const dadosUsuario= await connection.carregarUserData(uid);
        if(dadosUsuario.tipo=="pessoaFisica"){

            nomeUser.textContent=''
            const strongNome = document.createElement('strong');
            strongNome.textContent = 'Nome:';
            nomeUser.appendChild(strongNome);
            const strNome = document.createElement('p');
            strNome.textContent = dadosUsuario.nome;
            nomeUser.appendChild(strNome);

            sNomeRazaoSocialUser.textContent=''
            const strongSobrenome = document.createElement('strong');
            strongSobrenome.textContent = 'Sobrenome:';
            sNomeRazaoSocialUser.appendChild(strongSobrenome);
            const strSobrenome = document.createElement('p');
            strSobrenome.textContent = dadosUsuario.sobrenome;
            sNomeRazaoSocialUser.appendChild(strSobrenome);

            email.textContent=''
            const strongEmail = document.createElement('strong');
            strongEmail.textContent = 'Email:';
            email.appendChild(strongEmail);
            const strEmail = document.createElement('p');
            strEmail.textContent = dadosUsuario.email;
            email.appendChild(strEmail);
            
            telefone.textContent=''
            const strongTelefone = document.createElement('strong');
            strongTelefone.textContent = 'Telefone:';
            telefone.appendChild(strongTelefone);
            const strTelefone = document.createElement('p');
            strTelefone.textContent = dadosUsuario.telefone;
            telefone.appendChild(strTelefone);

            cpfCnpj.textContent=''
            const strongCpf = document.createElement('strong');
            strongCpf.textContent = 'Cpf:';
            cpfCnpj.appendChild(strongCpf);
            const strCnpj = document.createElement('p');
            strCnpj.textContent = dadosUsuario.cpf;
            cpfCnpj.appendChild(strCnpj);
        }else{
            nomeUser.textContent=''
            const strongNome = document.createElement('strong');
            strongNome.textContent = 'Nome:';
            nomeUser.appendChild(strongNome);
            const strNome = document.createElement('p');
            strNome.textContent = dadosUsuario.nome;
            nomeUser.appendChild(strNome);

            sNomeRazaoSocialUser.textContent=''
            const strongRazaoSocial = document.createElement('strong');
            strongRazaoSocial.textContent = 'Razão Social:';
            sNomeRazaoSocialUser.appendChild(strongRazaoSocial);
            const strRazaoSocial = document.createElement('p');
            strRazaoSocial.textContent = dadosUsuario.razaoSocial;
            sNomeRazaoSocialUser.appendChild(strRazaoSocial);

            email.textContent=''
            const strongEmail = document.createElement('strong');
            strongEmail.textContent = 'Email:';
            email.appendChild(strongEmail);
            const strEmail = document.createElement('p');
            strEmail.textContent = dadosUsuario.email;
            email.appendChild(strEmail);
            
            telefone.textContent=''
            const strongTelefone = document.createElement('strong');
            strongTelefone.textContent = 'Telefone:';
            telefone.appendChild(strongTelefone);
            const strTelefone = document.createElement('p');
            strTelefone.textContent = dadosUsuario.telefone;
            telefone.appendChild(strTelefone);

            cpfCnpj.textContent=''
            const strongCnpj = document.createElement('strong');
            strongCnpj.textContent = 'Cnpj:';
            cpfCnpj.appendChild(strongCnpj);
            const strCnpj = document.createElement('p');
            strCnpj.textContent = dadosUsuario.cnpj;
            cpfCnpj.appendChild(strCnpj);
        }
    } catch (error) {
        alert(error.message);
    }
}