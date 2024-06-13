class Botina{
    constructor(codigo,categoria,tipoSolado,tipoCouro,tamanho,quantidadeDePares){
        this._codigo = codigo;
        this._categoria = categoria;
        this._tipoSolado = tipoSolado;
        this._tipoCouro = tipoCouro;
        this._tamanho = tamanho;
        this._quantidadeDePares = quantidadeDePares;
    }
    get codigo(){
        return this._codigo;
    }
    set codigo(codigo){
       this._codigo= codigo;
    }
    get categoria(){
        return this._categoria;
    }
    set categoria(categoria){
        this._categoria = categoria;
    }
    get tipoSolado(){
        return this._tipoSolado;
    }
    set tipoSolado(tipoSolado){
        this._tipoSolado = tipoSolado;
    }
    get tipoCouro(){
        return this._tipoCouro;
    }
    set tipoCouro(tipoCouro){
        this._tipoCouro = tipoCouro;
    }
    get tamanho(){
        return this._tamanho;
    }
    set tamanho(tamanho){
        this._tamanho = tamanho;
    }
    get quantidadeDePares(){
        return this._quantidadeDePares;
    }
    set quantidadeDePares(quantidadeDePares){
        this._quantidadeDePares = quantidadeDePares;
    }
}
const db_botas = [] //array que irá armazenar os dados 
let formBotas = document.getElementById('formularioBotas');
formBotas.addEventListener('submit', cadastrar);

function cadastrar(event){
    event.preventDefault();
    const codigo = document.getElementById('codigo').value;
    const categoria = document.getElementById('categoria').value;
    const tipoSolado = document.getElementById('tipoSolado').value;
    const tipoCouro = document.getElementById('tipoCouro').value;
    const tamanho = document.getElementById('tamanho').value;
    const quantidade = document.getElementById('quantidade').value;
    const bota = new Botina(codigo,categoria,tipoSolado,tipoCouro,tamanho,quantidade);
    db_botas.push(bota);
    console.log(db_botas);
    event.target.reset();
}