import { NovoUsuario } from './novo-usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class NovoUsuarioService {

  constructor(
    private htpp:HttpClient
  ) { }

  cadastraNovoUser(novoUsuario:NovoUsuario){
    return this.htpp.post(`${API}/user/register`,novoUsuario)
  }

  verificaUsuario(nomeUsuario:String){
    return this.htpp.get(`${API}/user/exist/${nomeUsuario}`)
  }



}
