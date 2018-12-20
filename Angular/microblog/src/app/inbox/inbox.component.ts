import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { AuthService } from 'src/app/service/auth.service';
import { Usuario, Pergunta } from '../model/model';

const WS_LISTA = 'http://localhost:3000/pergunta/listar_pendentes_usuario'

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  usuario : Usuario
  perguntas : Pergunta[]

  constructor(public auth : AuthService, private http : HttpService) { }

  ngOnInit() {
    this.usuario = this.auth.usuario
    this.listar()
  }

  listar(){
    this.http.get(WS_LISTA + "?usuario=" + this.usuario._id, (ret) => {
      this.perguntas = ret
    })
  }

  responder(){

  }

  ignorar(){

  }

}
