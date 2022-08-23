import { Observable, tap, map, catchError } from 'rxjs';
import { VeiculosDataAPI, VeiculoData } from './veiculos-data';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API= environment.apiURL

@Injectable({
  providedIn: 'root'
})
export class VeiculosDataService {

  constructor(
    private http:HttpClient
  ) { }


  listaDoVeiculoData(valor?: string){
    const params = valor ? new HttpParams().append('valor',valor) : undefined;
    return this.http
    .get<VeiculosDataAPI>(`${API}/vehicleData`,{params})
    .pipe(
      map((api)=>api.vehiclesData)
        )

    }

  // private ordenaPorCodigoData(veiculoA:VeiculoData,veiculoB:VeiculoData){
  //   if(veiculoA.id > veiculoB.id){
  //     return 1;
  //   }
  //   if(veiculoA.id<veiculoB.id){
  //     return -1
  //   }
  //   return 0
  // }

  cadastrar(veiculoData:VeiculoData):Observable<VeiculoData>{
    // console.log(this.selectVeiculoData(1))
    return this.http
    .post<VeiculoData>(`${API}/vehicledata/`,veiculoData)
  }

  atualizar(veiculoData:VeiculoData):Observable<VeiculoData>{
    console.log(veiculoData)
    return this.http
    .put<VeiculoData>(`${API}/vehicledata/${veiculoData.id}`,veiculoData)
  }

  excluir(id:any):Observable<any>{
    console.log(id,console.log('teste de delete'))
    console.log(`${API}/vehicledata/${id}`)
    return this.http.delete<any>(`${API}/vehicledata/${id}`)
  }




}
