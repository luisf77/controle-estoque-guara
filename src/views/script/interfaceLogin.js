import Connection from "/src/controller/login.js"

const openModal = () => document.getElementById('modal')
    .classList.add('active');

const closeModal = () => document.getElementById('modal')
    .classList.remove('active');

const abrirCadastro = document.getElementById('registerForm');
abrirCadastro.addEventListener('click', openModal);

const fecharCadastro = document.getElementById('modalClose');
fecharCadastro.addEventListener('click',function(e){
    document.getElementById('formularioCadastro').reset();
    closeModal();
});
function displayFeedback(message, isError = false) {
    // Obtém o elemento de feedback na página HTML
    const feedbackContainer = document.getElementById('feedback');
    // Define a cor do texto com base no tipo de mensagem (sucesso ou erro)
    feedbackContainer.style.color = isError ? 'red' : 'green';
    // Define o texto da mensagem no elemento de feedback
    feedbackContainer.innerText = message;
  }

document.getElementById('loginButton').addEventListener('click',function(){
    const email = document.getElementById('emailLog').value;
    const senha = document.getElementById('passwordLog').value;
    const connection = new Connection();
    connection.login(email,senha).then(function(loginResult){
        console.log(loginResult);
        if(loginResult!=null){
            displayFeedback(loginResult,true)
        }

    });

});
//document.getElementById('registerButton').addEventListener('click',register);
