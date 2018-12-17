import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { AuthService } from 'src/app/service/auth.service';
import { Usuario, Post } from '../model/model';

const WS_LISTA = 'http://localhost:3000/post/listar'
const WS_SALVAR = 'http://localhost:3000/post/salvar'

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  usuario : Usuario
  posts : Post[]
  
  post : Post = new Post()

  constructor(public auth : AuthService, private http : HttpService) { }

  ngOnInit() {
    this.usuario = this.auth.usuario
    this.listar()
  }

  listar(){
    this.http.get(WS_LISTA + "?usuario=" + this.usuario._id, (ret) => {
      this.posts = ret
    })
  }

  salvar(){
    this.post.usuario = this.usuario
    this.http.post(WS_SALVAR, this.post, () =>{
      this.post = new Post()
      this.listar()
    })
  }

}
