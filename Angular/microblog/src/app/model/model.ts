import { Data } from "@angular/router";

export class Usuario {
    public _id : string
    public login : string
    public nome : string
    public email : string
    public senha : string
    public bio : string
    public foto : string
}

export class Pergunta {
    public _id : string
    public descricao : string
    public dataPergunta : Date
    public dataResposta : Date
    public remetente : Usuario
    public destinatario : Usuario
    public resposta : string
}