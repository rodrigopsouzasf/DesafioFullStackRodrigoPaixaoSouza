import { environment } from './../../../environments/environment';
import { Observable, map, switchMap, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Veiculo, Veiculos, VeiculosAPI } from './veiculos';

const API= environment.apiURL

@Injectable({
  providedIn: 'root'
})
export class VeiculosService {

  constructor(
    private http:HttpClient,
  ) { }


  listaDoVeiculo(){
    return this.http
    .get<VeiculosAPI>(`${API}/vehicle`)
    .pipe(
      map((api)=>api.vehicles),
      map((veiculos)=>
      veiculos.sort((veiculoA: Veiculo,veiculoB: Veiculo)=>this.ordenaPorCodigo(veiculoA,veiculoB))
        )
      )
    }

  private ordenaPorCodigo(veiculoA:Veiculo,veiculoB:Veiculo){
    if(veiculoA.id > veiculoB.id){
      return 1;
    }
    if(veiculoA.id<veiculoB.id){
      return -1
    }
    return 0
  }

  selectVeiculo(id:number):Observable<Veiculos>{
    return this.http
    .get<Veiculos>(`${API}/vehicle/${id}`)
    }


  }



