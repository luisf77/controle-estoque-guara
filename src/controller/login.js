class Connection {
  constructor() {
    this.firebaseConfig = {

      apiKey: "AIzaSyC8_PTivE1_ESe2RnadyhBCjbGsBVkrdiw",

      authDomain: "controledeestoqueguara.firebaseapp.com",

      databaseURL: "https://controledeestoqueguara-default-rtdb.firebaseio.com",

      projectId: "controledeestoqueguara",

      storageBucket: "controledeestoqueguara.appspot.com",

      messagingSenderId: "633037555160",

      appId: "1:633037555160:web:5bf1632c5b4677b07f5ead",

      measurementId: "G-NCQ4KDRQBC"

    };
    if (!firebase.apps.length) {
      firebase.initializeApp(this.firebaseConfig);
    }
    this.auth = firebase.auth();
    this.database = firebase.database();

  }

  login(email, password) {
    this.auth.signInWithEmailAndPassword(email, password).then(userCredential => {
      const user = userCredential.user;
      this.database.ref('Users/'+user.uid).update({ last_login: new Date().toString()});
      window.location.href = "home.html";

    }).catch(error => {
      displayFeedback('Email ou Senha Inválidos!',true);
    });

  }
}

function displayFeedback(message, isError = false) {
  // Obtém o elemento de feedback na página HTML
  const feedbackContainer = document.getElementById('feedback');
  // Define a cor do texto com base no tipo de mensagem (sucesso ou erro)
  feedbackContainer.style.color = isError ? 'red' : 'green';
  // Define o texto da mensagem no elemento de feedback
  feedbackContainer.innerText = message;
}

export default Connection;