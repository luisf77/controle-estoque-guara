import Botina from "/src/models/Botina.js";

class GestorBancoBotas {
    constructor() {
        this.db_botas = [];
    }
    carregarDados(user) {
        /**esta funcão está pegando os dados do firebase, montando os objetos como os gets e sets
         e retornando de forma assincrona o array de objetos
        */
        return firebase.firestore()
            .collection('botas')
            .where('user.uid', '==', user.uid)
            .get()
            .then(snapshot => {
                this.db_botas.length=0;
                const botasDoFirestore = snapshot.docs.map(doc => ({
                    ...doc.data(),
                    uid: doc.id
                }));
                //console.log('array de objetos simples do firestore',botasDoFirestore)
                botasDoFirestore.forEach(dadosBota => {
                    const bota = new Botina(
                        dadosBota._codigo,
                        dadosBota._categoria,
                        dadosBota._tipoSolado,
                        dadosBota._tipoCouro,
                        dadosBota._tamanho,
                        dadosBota._quantidadeDePares,
                        dadosBota.user,
                        dadosBota.uid
                    );
                    this.db_botas.push(bota);
                });
                //console.log('db_botas',this.db_botas);
                return this.db_botas;
            }).catch(error => {
                throw new Error(error.message);
            });

    }

    adicionarBota(codigo, categoria, tipoSolado, tipoCouro, tamanho, quantidadeDePares, user) {
        const botina = new Botina(codigo, categoria, tipoSolado, tipoCouro, tamanho, quantidadeDePares, user);

        return firebase.firestore()
            .collection('botas')
            .add(this.simplificaObjeto(botina)) //tira os gets e set para simplificar o objeto e mandar para o firestore
            .then(() => {
                return 'Dados salvos com sucesso!';
            }).catch((error) => {
                throw new Error(error.message);
            });
    }

    editarBota(uid, codigo, categoria, tipoSolado, tipoCouro, tamanho, quantidadeDePares,user) {
        const botina = new Botina(codigo, categoria, tipoSolado, tipoCouro, tamanho, quantidadeDePares, user);

        return firebase.firestore()
            .collection('botas')
            .doc(uid)
            .update(this.simplificaObjeto(botina)) //tira os gets e set para simplificar o objeto e mandar para o firestore
            .then(() => {
                return 'Dados Editados com sucesso!';
            }).catch((error) => {
                throw new Error(error.message);
            });
    }
    deletarBota(id) {
        return firebase.firestore()
        .collection('botas')
        .doc(id)
        .delete()
        .then(()=>{
            return 'Dados deletados com sucesso!';
        }).catch(error=>{
            throw new Error('Erro ao deletar:',error.message);
        });
        
    }
    obterBotaPeloUid(uid){
        return firebase.firestore()
        .collection('botas')
        .doc(uid)
        .get()
        .then(doc=>{
            if(doc.exists){
                return new Botina(
                    doc.data()._codigo,
                    doc.data()._categoria,
                    doc.data()._tipoSolado,
                    doc.data()._tipoCouro,
                    doc.data()._tamanho,
                    doc.data()._quantidadeDePares,
                    doc.data().user
                );
            }else{
                throw new Error('Dados não encontrados');
            }
        }).catch((error)=>{
            throw new Error(error.message)
        });
    }

//retira gets e set de um objetos
    simplificaObjeto(objeto) {
        return JSON.parse(JSON.stringify(objeto));
    }
}
export default GestorBancoBotas;