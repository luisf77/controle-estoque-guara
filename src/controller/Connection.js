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
    return this.auth.signInWithEmailAndPassword(email, password).then(userCredential => {
      const user = userCredential.user;
      this.database.ref('Users/' + user.uid).update({ last_login: new Date().toString() });
      return 'Usuario logado com sucesso';

    }).catch(error => {
      throw new Error('Usuario ou senha incorretos!');
    });

  }

  recoverPassword(email) {
    return this.auth.sendPasswordResetEmail(email).then(() => {
      return 'Email de recuperação enviado com sucesso!';
    }).catch(error => {
      throw new Error(error.message);
    });
  }

  register(email,password){
    // Cria um novo usuário no Firebase com o email e senha fornecidos
    return this.auth.createUserWithEmailAndPassword(email, password).then(userCredential => {
      const user = userCredential.user;
      const user_data = {
        email: email,
        registration_time: new Date().toString()
      };
      this.database.ref('users/' + user.uid).set(user_data);
      return 'Usuario Criado';

    }).catch(error => {
      throw new Error(error.message);
    });
  }
}
export default Connection;