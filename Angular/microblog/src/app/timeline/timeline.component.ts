import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { AuthService } from 'src/app/service/auth.service';
import { Usuario, Pergunta } from '../model/model';

const WS_LISTA = 'http://localhost:3000/pergunta/listar_respondidas_usuario'
const WS_PEGAR_USUARIO = 'http://localhost:3000/usuario/pegar_logado'
const WS_SALVAR = 'http://localhost:3000/pergunta/salvar'

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  usuario_logado : Usuario
  usuario : Usuario
  perguntas : Pergunta[]
  
  pergunta : Pergunta = new Pergunta()

  constructor(public auth : AuthService, private http : HttpService) { }

  ngOnInit() {
    this.usuario = this.auth.usuario
    this.listar()
  }

  pergarUsuarioLogado(){
    this.http.get(WS_PEGAR_USUARIO + "?usuario=" + this.usuario_logado._id, (ret) => {
      this.usuario = ret
    })
  }

  listar(){
    this.http.get(WS_LISTA + "?usuario=" + this.usuario._id, (ret) => {
      this.perguntas = ret
    })
  }

  salvar(){
    this.pergunta.destinatario = this.usuario
    this.http.post(WS_SALVAR, this.pergunta, () =>{
      this.pergunta = new Pergunta()
      this.listar()
    })
  }
}
