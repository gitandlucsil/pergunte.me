import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { Pergunta } from '../model/model';
import { ResponderService } from '../service/responder.service';

const WS_RESPONDER = 'http://localhost:3000/pergunta/responder'

@Component({
  selector: 'app-responder',
  templateUrl: './responder.component.html',
  styleUrls: ['./responder.component.css']
})
export class ResponderComponent implements OnInit {

  constructor(private http : HttpService,
              private auth : AuthService,
              private router : Router,
              private resp : ResponderService
            ) { }

  pergunta: Pergunta

  ngOnInit() {
    this.pergunta = this.resp.getPergunta()
  }

  //Funcao utilizada para cancelar a resposta e retornar para a tela anterior
  cancelar(){
    this.router.navigateByUrl('/home/inbox')
  }

  //Funcao utilizada para enviar uma resposta para uma determinada pergunta
  responder(){
    this.http.post(WS_RESPONDER, this.pergunta, () => {
      this.router.navigateByUrl('home/inbox')
    })
  }
}
