export default class Produto {
    id: number | null;
    nome: string;
    preco: string;
    descricao: string;
    constructor(id: number|null, nome:string, preco:string, descricao:string) {
        this.id=id;
        this.nome=nome;
        this.preco=preco;
        this.descricao=descricao;
    }
    static vazio(): Produto {
        return new Produto(null,"","","")
    }
}


