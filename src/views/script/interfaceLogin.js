import Connection from "/src/controller/Connection.js"
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
//coleção de itens do formulário de cadastro
const formCadastro = {
    pJuridicaFisica: () => document.getElementsByName('usuario'),
    nome: () => document.getElementById('nome'),
    sNomeRazaoSocial: () => document.getElementById('sNomeRazaoSocial'),
    cpfCnpj: () => document.getElementById('cpfCnpj'),
    telefone: () => document.getElementById('Teleone'),
    email: () => document.getElementById('emailCad'),
    senha: () => document.getElementById('passwordCad'),
    senhaConfirm: () => document.getElementById('passwordConfirm'),
    formCad: () => document.getElementById('formularioCadastro'),
}

const openModal = () => document.getElementById('modal')
    .classList.add('active');

const closeModal = () => document.getElementById('modal')
    .classList.remove('active');

formLogin.botaoAbrirCadastro().addEventListener('click', openModal);

formLogin.botaoFecharCadastro().addEventListener('click', (e) => {
    formCadastro.formCad().reset();
    closeModal();
});
const connection = new Connection();

//Evento do botão login
formLogin.botaoLogin().addEventListener('click', async () => {

    try {
        // nesta parte a variavel message recebe a resposta assincrona do firebase tratada
        const message = await connection.login(formLogin.email().value, formLogin.senha().value);
        console.log(message);
        window.location.href = "home.html";
    } catch (error) {
        displayFeedback(error.message, true);
    }
});
//Evento do botão Recuperar Senha
formLogin.botaoRecuperarSenha().addEventListener('click', async () => {
    const email = prompt('Digite seu Email de recuperação:', formLogin.email().value);
    if (email != null && email != '') {
        try {
            if (validate_email(email)) {
                // nesta parte a variavel message recebe a resposta assincrona do firebase tratada
                const message = await connection.recoverPassword(email);
                alert(message);
            }
        } catch (error) {
            alert(error.message);
        }
    }
});

//adiciona um evento as opções de tipo de usuario q ao serem clicadas mudam o placeholder
document.addEventListener('DOMContentLoaded', () => {
    const updatePlaceholders = (event) => {
        const tipoUser = event.target.id;
        if (tipoUser === 'pessoaFisica') {
            formCadastro.cpfCnpj().placeholder = 'CPF';
            formCadastro.sNomeRazaoSocial().placeholder = "Sobrenome";
        } else if (tipoUser === 'pessoaJuridica') {
            formCadastro.cpfCnpj().placeholder = 'CNPJ';
            formCadastro.sNomeRazaoSocial().placeholder = "Razão Social";
        }
    };

    // Adiciona o event listener a cada botão de rádio
    Array.from(formCadastro.pJuridicaFisica()).forEach((radio) => {
        radio.addEventListener('click', updatePlaceholders);
    });
});

//Evento do cadastro
formLogin.botaoCadastrar().addEventListener('click', async () => {
    try {
        if (validate_email(formCadastro.email().value) && validate_password(formCadastro.senha().value)) {
            if (formCadastro.senha().value == formCadastro.senhaConfirm().value) {
                const selectedRadio = document.querySelector('input[name="usuario"]:checked');
                const radioId = selectedRadio ? selectedRadio.id : null;
                const message = await connection.register(
                    formCadastro.email().value,
                    formCadastro.senha().value,
                    formCadastro.nome().value,
                    formCadastro.sNomeRazaoSocial().value,
                    formCadastro.cpfCnpj().value,
                    formCadastro.telefone().value,
                    radioId
                );
                formCadastro.formCad().reset();
                closeModal();
                displayFeedback(message);
            }else {
            throw new Error('Senha de confirmação está diferente!');
        }
    }
    }catch (error) {
    alert(error.message);
}
});


function displayFeedback(message, isError = false) {

    // Define a cor do texto com base no tipo de mensagem (sucesso ou erro)
    formLogin.feedbackContainer().style.color = isError ? 'red' : 'green';
    // Define o texto da mensagem no elemento de feedback
    formLogin.feedbackContainer().innerText = message;
}
//validar formato de email
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
    const expression = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;
    if (expression.test(password)) {
        return true
    }
    else {
        throw new Error('Senha deve ter mais de 8 caracteres e ao menos uma letra e um número!');
    }
}
