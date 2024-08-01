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
    let result = null;
    this.auth.signInWithEmailAndPassword(email, password).then(function (userCredential) {
      const user = userCredential.user;
      database.ref('Users/' + user.uid).update({ last_login: new Date().toString() });
      // Exibe uma mensagem de sucesso
      Window.location.href = "/src/views/html/index.html";
      return null;
    }).catch(function (error) {
      // Exibe uma mensagem de erro em caso de falha na autenticação
      return result = error.message.toString();
    });
  }
}
export default Connection;