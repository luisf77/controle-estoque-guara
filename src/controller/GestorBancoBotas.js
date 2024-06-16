import Botina from "/src/models/Botina.js";

class GestorBancoBotas{
    constructor(){
        this.db_botas = [];
    }
    carregarDados(){
        if (localStorage.getItem('db_botas')){
            const botasDoStorange = JSON.parse(localStorage.getItem('db_botas'));
            botasDoStorange.forEach(dadosBota =>{
                const bota = new Botina(
                    dadosBota._codigo,
                    dadosBota._categoria,
                    dadosBota._tipoSolado,
                    dadosBota._tipoCouro,
                    dadosBota._tamanho,
                    dadosBota._quantidadeDePares
                );
                this.db_botas.push(bota);
            }); 
        }
    }

    adicionarBota(codigo,categoria,tipoSolado,tipoCouro,tamanho,quantidadeDePares){
        const botina = new Botina(codigo,categoria,tipoSolado,tipoCouro,tamanho,quantidadeDePares);
        this.db_botas.push(botina);
        this.salvarDados();
    }

    editarBota(index,codigo,categoria,tipoSolado,tipoCouro,tamanho,quantidadeDePares){
        if (index >= 0 && index < this.db_botas.length){
            this.db_botas[index].codigo = codigo;
            this.db_botas[index].categoria = categoria;
            this.db_botas[index].tipoSolado = tipoSolado;
            this.db_botas[index].tipoCouro = tipoCouro;
            this.db_botas[index].tamanho = tamanho;
            this.db_botas[index].quantidadeDePares = quantidadeDePares;
            this.salvarDados();
        }
    }
    deletarBota(id){
        if(id >= 0 && id < this.db_botas.length){
            this.db_botas.splice(id,1);
            this.salvarDados();
        }
    }
    obterBotas(){
        return this.db_botas;
    }

    salvarDados(){
        localStorage.setItem('db_botas', JSON.stringify(this.db_botas));
    }
}
export default GestorBancoBotas;