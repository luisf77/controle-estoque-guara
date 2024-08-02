import Connection from "/src/controller/login.js"
//coleção dos itens interativos da página
const formLogin = {
    email: () => document.getElementById('emailLog'),
    senha: () => document.getElementById('passwordLog'),
    botaoAbrirCadastro: () => document.getElementById('registerForm'),
    botaoFecharCadastro: () => document.getElementById('modalClose'),
    botaoLogin: () => document.getElementById('loginButton'),
    botaoCadastrar: () => document.getElementById('registerButton'),
    botaoRecuperarSenha: () => document.getElementById('recoverPassword'),
    feedbackContainer: () => document.getElementById('feedback')
}

const openModal = () => document.getElementById('modal')
    .classList.add('active');

const closeModal = () => document.getElementById('modal')
    .classList.remove('active');

formLogin.botaoAbrirCadastro().addEventListener('click', openModal);

formLogin.botaoFecharCadastro().addEventListener('click', (e) => {
    document.getElementById('formularioCadastro').reset();
    closeModal();
});
const connection = new Connection();

formLogin.botaoLogin().addEventListener('click', async () => {

    try {
        const message = await connection.login(formLogin.email().value, formLogin.senha().value);
        console.log(message);
        window.location.href = "home.html";
    } catch (error) {
        displayFeedback(error.message, true);
    }
});

formLogin.botaoRecuperarSenha().addEventListener('click', async () => {
    const email = prompt('Digite seu Email de recuperação:', formLogin.email().value);
    if (email != null) {
        try {
            if (validate_email(email)) {
                const message = await connection.recoverPassword(email);
                alert(message);
            }
        } catch (error) {
            alert(error.message);
        }
    }
});


function displayFeedback(message, isError = false) {

    // Define a cor do texto com base no tipo de mensagem (sucesso ou erro)
    formLogin.feedbackContainer().style.color = isError ? 'red' : 'green';
    // Define o texto da mensagem no elemento de feedback
    formLogin.feedbackContainer().innerText = message;
}
function validate_email(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    if (expression.test(email)) {
        return true;
    } else {
        throw new Error('Email está com formato invalido');
    }
}

// Função para validar a senha (no mínimo 6 caracteres)
function validate_password(password) {
    const expression = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,10}$/;
    if (expression.test(password)) {
        return true
    }
    else {
        throw new Error('Senha deve ter de 6 a 10 caracteres e ao menos uma letra e um número!');
    }
}