import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { Pergunta } from '../model/model';
import { ResponderService } from '../service/responder.service';

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
    alert(this.pergunta.descricao)
  }

  //Funcao utilizada para cancelar a resposta e retornar para a tela anterior
  cancelar(){
    this.router.navigateByUrl('/home/inbox')
  }

  //Funcao utilizada para enviar uma resposta para uma determinada pergunta
  responder(){

  }
}
