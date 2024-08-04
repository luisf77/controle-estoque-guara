class Botina{
    constructor(codigo,categoria,tipoSolado,tipoCouro,tamanho,quantidadeDePares,user,indexDado){
        this._codigo = codigo;
        this._categoria = categoria;
        this._tipoSolado = tipoSolado;
        this._tipoCouro = tipoCouro;
        this._tamanho = tamanho;
        this._quantidadeDePares = quantidadeDePares;
        this.user = {
            uid: user
        };
        this.uid = indexDado;
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

export default Botina;