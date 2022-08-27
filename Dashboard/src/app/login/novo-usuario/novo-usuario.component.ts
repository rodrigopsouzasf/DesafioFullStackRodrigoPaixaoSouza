import { UsuarioExistService } from './usuario-exist.service';
import { Router } from '@angular/router';
import { NovoUsuarioService } from './novo-usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NovoUsuario } from './novo-usuario';
import { minusculoValidator, usuarioSenhaIguaisValidator } from './person.validators';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {

  novoUsuarioForm!: FormGroup;


  constructor(
    private formBuilder:FormBuilder,
    private novoUsuarioService:NovoUsuarioService,
    private usuarioExist:UsuarioExistService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.novoUsuarioForm = this.formBuilder.group({
      userName:['',[Validators.required,minusculoValidator]],
      //[this.usuarioExist.usuarioJaExiste()]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
      full_name:['',[Validators.required,Validators.minLength(4)]]
    },{
       validators:[usuarioSenhaIguaisValidator]
     });
  }

  cadastrar(){
    if(this.novoUsuarioForm.valid){
    const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
    this.novoUsuarioService.cadastraNovoUser(novoUsuario).subscribe(()=>{
      this.router.navigate([''])
    },
    (error)=>{console.log(error)})
     }
  }

}
