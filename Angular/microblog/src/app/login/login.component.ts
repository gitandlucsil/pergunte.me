import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/model';
import { Md5 } from "ts-md5";
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

const WS_LOGIN = 'http://localhost:3000/usuario/login'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = new Usuario()

  constructor(private http : HttpClient, private auth : AuthService, private router : Router) {
    
  }

  ngOnInit() {
  }
  entrar(){
    if(this.usuario.nome == null){
      alert('Informar nome do usuário!')
    }
    if(this.usuario.senha == null){
      alert('Informar a senha!')
    }
    this.usuario.senha = Md5.hashStr(this.usuario.senha) as string
    this.http.post(WS_LOGIN, this.usuario).subscribe((ret) => {
      if (ret != null){
        this.auth.login(ret as Usuario)
        this.router.navigateByUrl('/home')
      }else{
        alert('Login inválido!')
      }
    })
  }

}
