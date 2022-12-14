import { AutenticacaoService } from './../../autenticacao/autenticacao.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {

  usuario='';
  senha='';

  constructor(
    private authService:AutenticacaoService,
    private router:Router) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.autenticar(this.usuario,this.senha).subscribe(()=>{
      this.router.navigate(['home'])
    },
    (error)=>{
      alert("Usuario ou Senha invalida");
      console.log(error);
    })
  }


}
