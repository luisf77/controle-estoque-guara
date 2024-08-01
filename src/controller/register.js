function register () {
    displayFeedback('');
    // Obtém os valores dos campos de email e senha do formulário
    const email = document .getElementById ('email' ).value;
    const password = document .getElementById ('password' ).value;
    
    try{
      if(validate_email(email) && validate_password(password)){
        // Cria um novo usuário no Firebase com o email e senha fornecidos
        auth.createUserWithEmailAndPassword (email, password )
        . then(function (userCredential ) {
          // Obtém o objeto do usuário recém-criado
         const user = userCredential.user;
         // Cria um objeto com dados do usuário
          const user_data = {
           email: email,
            registration_time: new Date().toString (),
         };
         // Adiciona os dados do usuário ao banco de dados do Firebase
         database .ref('users/' + user.uid).set(user_data );
         // Exibe uma mensagem de sucesso
         displayFeedback ('Usuário Criado!!' );
       })
        .catch(function (error) {
           // Exibe uma mensagem de erro
            displayFeedback (error.message , true);
       });
      }
    }catch(error){
      displayFeedback(error.message,true)
    }
    
  }
  
  // Função para validar um endereço de email usando uma expressão regular
  function validate_email(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    if(expression.test(email)){
    return true;
    }else{
      throw new Error('Email está com formato invalido');
    }
  }
  
  // Função para validar a senha (no mínimo 6 caracteres)
  function validate_password(password) {
    const expression = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,10}$/;
      if (expression.test(password)){
        return true
      }
      else{
        throw new Error('Senha deve ter de 6 a 10 caracteres e ao menos uma letra e um número!');
      }
  }