import { VeiculosDataService } from './../../pages/dashboard/veiculos-data.service';
import { VeiculoData } from './../../pages/dashboard/veiculos-data';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {


  veiculoData: VeiculoData={
    vin: '',
    odometer: '',
    tirePressure: '',
    status: null,
    batteryStatus: '',
    fuelLevel: '',
    lat: '',
    longi: null

  }

  constructor(private veiculosDataService:VeiculosDataService) { }

  ngOnInit(): void {

  }

  salvarVeiculoData():void{
    console.log(this.veiculoData)
    this.veiculosDataService.cadastrar(this.veiculoData).subscribe(res =>{
      this.veiculoData=res;
    })
  }

  atualizaVeiculoData():void{
    console.log(this.veiculoData)
    this.veiculosDataService.atualizar(this.veiculoData).subscribe(res =>{
      this.veiculoData=res;
    })
  }

  // deleteVeiculoData():void{
  //   console.log(this.veiculoData)
  //   this.veiculosDataService.excluir(this.veiculoData.id).subscribe(res =>{
  //     this.veiculoData=res;
  //   })
  // }


}
