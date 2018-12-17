import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { AuthService } from "src/app/service/auth.service";

@Injectable()
export class HttpService {

    constructor(private http: HttpClient, private auth : AuthService){

    }

    get(url : string, cb : (ret : any) => void){
        let aux = ''
        if(this.auth.usuario){
            aux = this.auth.usuario._id
        }
        this.http.get(url,{
            headers : new HttpHeaders({'Authentication' : aux})
        }).subscribe(cb, this.tratarErro)
    }

    post(url : string, obj, cb : (ret : any) => void){
        let aux = ''
        if(this.auth.usuario){
            aux = this.auth.usuario._id
        }
        this.http.post(url, obj, {
            headers : new HttpHeaders({'Authentication' : aux})
        }).subscribe(cb, this.tratarErro)
    }

    tratarErro(e){
        alert("Erro ao acessar o servidor: " + e.message)
    }
}