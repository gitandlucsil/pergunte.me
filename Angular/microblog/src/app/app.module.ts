import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes, NavigationStart, Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http"
import { TimeLineModule, TimelineComponent } from "./timeline/timeline.component";
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { AuthService } from './service/auth.service';
import { HttpService } from './service/http.service';
import { InboxComponent } from './inbox/inbox.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PerguntaComponent } from './pergunta/pergunta.component';

const rotas : Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'home', component: HomeComponent, children : [
      {path: 'inbox', component: InboxComponent},
      {path: '', pathMatch: 'full', redirectTo: 'inbox'}
    ]},
    {path: '', pathMatch: 'full', redirectTo: '/login'},
    {path: 'timeline', component: TimelineComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistroComponent,
    TimelineComponent,
    InboxComponent,
    PerfilComponent,
    PerguntaComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rotas),
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor (private router : Router, private auth : AuthService){
    this.definirNavListener()
  }

  definirNavListener() {
    this.router.events.subscribe( e => {
      if (e instanceof NavigationStart){
        if (e.url.startsWith('/home') && !this.auth.usuario){
          this.router.navigateByUrl('/login')
        }else if ((e.url == '/' || e.url == '/login') && this.auth.usuario){
          this.router.navigateByUrl('/home')
        }
      }
    })
  }
}
