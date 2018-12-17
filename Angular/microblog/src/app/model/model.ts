import { Data } from "@angular/router";

export class Usuario {
    public _id : string
    public login : string
    public nome : string
    public senha : string
    public bio : string
}

export class Post {
    public _id : string
    public conteudo : string
    public data : Date
    public usuario : Usuario

}