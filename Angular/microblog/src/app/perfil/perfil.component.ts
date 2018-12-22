import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/model';
import { HttpService } from '../service/http.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Md5 } from "ts-md5";

const WS_ATUALIZAR = 'http://localhost:3000/usuario/atualizar'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario : Usuario

  constructor(public auth : AuthService, private http : HttpService, private router : Router) { }

  ngOnInit() {
    this.usuario = this.auth.usuario
  }

  atualizar(){
    this.usuario.senha = Md5.hashStr(this.usuario.senha) as string
    this.http.post(WS_ATUALIZAR, this.usuario, () => {
      this.router.navigateByUrl('/profile')
    })
  }

  cancelar(){
    this.router.navigateByUrl('/home/inbox')
  }

}
