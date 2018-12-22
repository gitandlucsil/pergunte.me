import { Component, OnInit } from '@angular/core';
import { Usuario, Pergunta } from '../model/model';
import { HttpService } from '../service/http.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

const WS_LISTA = 'http://localhost:3000/pergunta/listar_feitas_usuario'
const WS_GET_DESTINATARIO = 'http://localhost:3000/pergunta/get_destinatario'
const WS_SALVAR = 'http://localhost:3000/pergunta/salvar/'

@Component({
  selector: 'app-pergunta',
  templateUrl: './pergunta.component.html',
  styleUrls: ['./pergunta.component.css']
})

export class PerguntaComponent implements OnInit {

  usuario : Usuario
  destinatarios : Usuario[]
  pergunta_enviar : Pergunta
  perguntas: Pergunta[]


  constructor(private http: HttpService,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.usuario = this.auth.usuario
    this.listar()
  }

  listar() {
    this.http.get(WS_LISTA + "?usuario=" + this.usuario._id, (ret) => {
      this.perguntas = ret
    })
  }


}
