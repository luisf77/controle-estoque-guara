import Connection from "/src/controller/login.js"
//coleção dos itens interativos da página
const form = {
    email: () => document.getElementById('emailLog'),
    senha: () => document.getElementById('passwordLog'),
    botaoAbrirCadastro: () => document.getElementById('registerForm'),
    fecharCadastro: () => document.getElementById('modalClose'),
    botaoLogin: () => document.getElementById('loginButton'),
    botaoCadastrar: () => document.getElementById('registerButton')
}

const openModal = () => document.getElementById('modal')
    .classList.add('active');

const closeModal = () => document.getElementById('modal')
    .classList.remove('active');

form.botaoAbrirCadastro().addEventListener('click', openModal);

form.fecharCadastro().addEventListener('click', function (e) {
    document.getElementById('formularioCadastro').reset();
    closeModal();
});

form.botaoLogin().addEventListener('click', function () {
    const connection = new Connection();
    connection.login(form.email().value,form.senha().value);
});
//document.getElementById('registerButton').addEventListener('click',register);
