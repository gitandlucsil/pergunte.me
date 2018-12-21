import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http : HttpClient, private auth : AuthService, private router : Router) { }

  ngOnInit() {
  }

  sair(){
    this.auth.logout()
    this.router.navigateByUrl('/login')
  }

}
