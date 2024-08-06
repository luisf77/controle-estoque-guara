import { PessoaFisica, PessoaJuridica } from "/src/models/Usuario.js";
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

  logout() {
    return this.auth.signOut().then(() => {
      return true;
    }).catch(() => {
      throw new Error('Erro ao fazer logOut');
    });
  }

  recoverPassword(email) {
    return this.auth.sendPasswordResetEmail(email).then(() => {
      return 'Email de recuperação enviado com sucesso!';
    }).catch(error => {
      throw new Error(error.message);
    });
  }

  register(email, password, nome, sNomeRazaoSocial, cpfCnpj, telefone, pJuridicaFisica) {
    // Cria um novo usuário no Firebase com o email e senha fornecidos
    return this.auth.createUserWithEmailAndPassword(email, password).then(userCredential => {
      const user = userCredential.user;
      const user_data = {
        email: email,
        registration_time: new Date().toString()
      };
      this.database.ref('users/' + user.uid).set(user_data);
      return this.registerDataUser(user.uid, nome, sNomeRazaoSocial, cpfCnpj, telefone, email, pJuridicaFisica);

    }).catch(error => {
      throw new Error(error.message);
    });
  }

  registerDataUser(user, nome, sNomeRazaoSocial, cpfCnpj, telefone, email, pJuridicaFisica) {
    if (pJuridicaFisica == 'pessoaFisica') {
      const pessoaFisica = new PessoaFisica(pJuridicaFisica, user, nome, telefone, email, sNomeRazaoSocial, cpfCnpj);
      //console.log('entrou no if')
      return firebase.firestore()
        .collection('users')
        .add(JSON.parse(JSON.stringify(pessoaFisica))) //tira os gets e set para simplificar o objeto e mandar para o firestore
        .then(() => {
          return 'Usuario registrado com sucesso!';
        }).catch((error) => {
          throw new Error(error.message);
        });
    } else {
      //console.log('entrou no else')
      const pessoaJuridica = new PessoaJuridica(pJuridicaFisica, user, nome, telefone, email, sNomeRazaoSocial, cpfCnpj);
      
      return firebase.firestore()
        .collection('users')
        .add(JSON.parse(JSON.stringify(pessoaJuridica))) //tira os gets e set para simplificar o objeto e mandar para o firestore
        .then(() => {
          return 'Usuario registrado com sucesso!';
        }).catch((error) => {
          throw new Error(error.message);
        });
    }
  }
}
export default Connection;