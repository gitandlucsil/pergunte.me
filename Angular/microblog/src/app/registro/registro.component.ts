import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/model';
import { HttpService } from '../service/http.service';
import { Md5 } from "ts-md5";
import { Router } from '@angular/router';

const WS_REGISTRO = 'http://localhost:3000/usuario/salvar'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario : Usuario = new Usuario()

  constructor(private http : HttpService, private router : Router) { }

  ngOnInit() {
  }

  salvar(){
    this.usuario.senha = Md5.hashStr(this.usuario.senha) as string
    this.http.post(WS_REGISTRO, this.usuario, () => {
      this.router.navigateByUrl('/login')
    })
  }

  cancelar(){
    this.router.navigateByUrl('/login')
  }

}
