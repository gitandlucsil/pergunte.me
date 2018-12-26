import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/model';
import { HttpService } from '../service/http.service';
import { Md5 } from "ts-md5";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

const WS_REGISTRO = 'http://localhost:3000/usuario/salvar'
const WS_UPLOAD_64 = 'http://localhost:3000/usuario/upload64'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario : Usuario = new Usuario()
  public conteudoImg

  constructor(private http : HttpService, private router : Router, private httpcli : HttpClient) { }

  ngOnInit() {
  }

  salvar(){
    this.usuario.senha = Md5.hashStr(this.usuario.senha) as string
    let fd = new FormData()
    alert(this.conteudoImg)
    fd.append('imagem',this.conteudoImg)
    alert(fd)
    this.httpcli.post(WS_UPLOAD_64, fd).subscribe(
      () => {
        alert('Upload realizado com sucesso')
      },
      (e) => {
        alert('Erro no upload ' + e.message)
      })
    this.http.post(WS_REGISTRO, this.usuario, () => {
      this.router.navigateByUrl('/login')
    })
  }

  cancelar(){
    this.router.navigateByUrl('/login')
  }

  selecionar($event){
    let f = $event.target.files[0]
    let fr = new FileReader()
    fr.onloadend = (e) => {
      this.conteudoImg = fr.result
    }
    fr.readAsDataURL(f)
  }


}
