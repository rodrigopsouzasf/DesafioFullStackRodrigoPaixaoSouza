import { environment } from './../../environments/environment';
import { UsuarioService } from './usuario/usuario.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse} from '@angular/common/http'
import { Observable, tap } from 'rxjs';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(
    private httpClient:HttpClient,
    private usuarioService:UsuarioService) { }

  autenticar(usuario:string,senha:string):Observable<any>{
    return this.httpClient.post(`${API}/user/login`,{
      userName: usuario,
      password: senha
    },
      {observe:'response'}
    ).pipe(
      tap((res)=>{
        const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvcmV0b3JuIjp7ImlkIjoyLCJuYW1lIjoicm9kcmlnbyIsImVtYWlsIjoicm9kcmlnb0B0ZXN0ZS5jb20ifSwiZXhwaXJlc0luIjo4NjQwMCwiaWF0IjoxNjYxMTc1MjM2fQ.EOo6HFinoco3wqKg3Si9MIUA92ccDM1sWkOKHF44r6E';
        this.usuarioService.salvaToken(authToken)
      })
    );
  }
}
