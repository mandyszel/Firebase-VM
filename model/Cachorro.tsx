export class Cachorro{
    public id: string;
    public nome: string;
    public raca: string;
    public pelo: string;
    public sexo: string;
    public datanasc: string;
    public urlfoto: String;

    constructor(obj?: Partial<Cachorro>) {
        if (obj){
            this.id=obj.id
            this.nome=obj.nome
            this.raca=obj.raca
            this.pelo=obj.pelo
            this.sexo=obj.sexo
            this.datanasc=obj.datanasc
            this.urlfoto=obj.urlfoto
        }
    }

    toString(){
        const objeto=`{
            "id":       "${this.id}",
            "nome":     "${this.nome}",
            "raca":     "${this.raca}",
            "pelo":     "${this.pelo}",
            "sexo":    "${this.sexo}",
            "datanasc": "${this.datanasc}",
            "urlfoto":"${this.urlfoto}
        }`
        return objeto
    }

    toFirestore(){
        const cachorro={
            id: this.id,
            nome: this.nome,
            raca: this.raca,
            pelo: this.pelo,
            sexo: this.sexo,
            datanasc: this.datanasc,
            urlfoto: this.urlfoto
        }
        return cachorro
    }

}