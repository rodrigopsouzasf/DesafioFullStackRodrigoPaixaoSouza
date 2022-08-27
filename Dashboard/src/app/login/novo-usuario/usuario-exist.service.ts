import { NovoUsuarioService } from './novo-usuario.service';
import { Injectable } from '@angular/core';
import { first, map, switchMap } from 'rxjs';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsuarioExistService {

  constructor(private novoUsuarioService:NovoUsuarioService) { }

  usuarioJaExiste(){
    return(control: AbstractControl)=>{
      return control.valueChanges.pipe(
        switchMap((nomeUsuario)=>this.novoUsuarioService.verificaUsuario(nomeUsuario)
        ),
        map((usuarioExiste)=>
        usuarioExiste ? {usuarioExistente: true} : null
          ),
          first()
          )
    }
  }
}
