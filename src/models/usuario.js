class Usuario{
    constructor(tipo,user,nome,telefone,email){
        this._tipo = tipo
        this.user ={
            uid: user
        };
        this._nome = nome;
        this._telefone = telefone;
        this._email = email;
    }

    get tipo(){
        return this._tipo;
    }
    set tipo(novoTipo){
        this._tipo = novoTipo;
    }

    get nome(){
        return this._nome;
    }
    set nome(novoNome){
        this._nome = novoNome;
    }

    get telefone(){
        return this._telefone;
    }
    set telefone(novoTelefone){
        this._telefone = novoTelefone;
    }

    get email(){
        return this._email;
    }
    set email(novoEmail){
        this._email = novoEmail;
    }
}
class PessoaFisica extends Usuario{
    constructor(tipo,user,nome,telefone,email,sobrenome,cpf){
        super(tipo,user,nome,telefone,email);
        this._sobrenome = sobrenome;
        this._cpf = cpf;
    }
    get sobrenome(){
        return this._sobrenome;
    }
    set sobrenome(novoSobrenome){
        this._sobrenome = novoSobrenome;
    }
    get cpf(){
        return this._cpf;
    }
    set cpf(novoCpf){
        this._cpf = novoCpf;
    }
}
class PessoaJuridica extends Usuario{
    constructor(tipo,user,nome,telefone,email,razaoSocial,cnpj){
        super(tipo,user,nome,telefone,email);
        this._razaoSocial = razaoSocial;
        this._cnpj = cnpj;
    }
    get razaoSocial(){
        return this._razaoSocial;
    }
    set razaoSocial(novoRazaoSocial){
        this._razaoSocial = novoRazaoSocial;
    }

    get cnpj(){
        return this._cnpj;
    }
    set cnpj(novoCnpj){
        this._cnpj = novoCnpj;
    }
}
export {PessoaFisica,PessoaJuridica};