import { Usuario } from "../model/model";

export class AuthService {
   
    usuario : Usuario

    constructor(){
        let u = sessionStorage.getItem('user-auth')
        if (u != null){
            this.usuario = JSON.parse(u)
        }
    }

    login(u : Usuario){
        this.usuario = u
        sessionStorage.setItem('user-auth', JSON.stringify(this.usuario))
    }

    logout(){
        this.usuario = null
        sessionStorage.removeItem('user-auth')
    }
}