import { ModalComponent } from 'src/app/componentes/modal/modal.component';
import { GraficoService } from './../../componentes/grafico/grafico.service';
import { VeiculosDataService } from './veiculos-data.service';
import { Observable, Subscription, tap, switchMap, filter, debounceTime, distinctUntilChanged } from 'rxjs';
import { VeiculosService } from './veiculos.service';
import { Veiculo, Veiculos } from './veiculos';
import { Component, Input, OnDestroy, OnInit, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { VeiculoData } from './veiculos-data';
import Swal from 'sweetalert2';

const ESPERA_DIGITACAO = 2000;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  @ViewChild(ModalComponent)
  modalComponent!:ModalComponent;


  veiculoDataInput = new FormControl();

  veiculos$ = this.veiculoservice.listaDoVeiculo();

  veiculoSelect$:Veiculo | null= null


  TesteFiltro!:VeiculoData | any

  veiculoDataSelect$ = this.veiculoDataInput.valueChanges.pipe(
  debounceTime(ESPERA_DIGITACAO),
  filter((valorDigitado)=> valorDigitado.length >= 3 || !valorDigitado.length),
  distinctUntilChanged(),
  switchMap((valorDigitado)=>this.veiculosDataService.listaDoVeiculoData(valorDigitado)))
  .subscribe((value) => {
    if(value.length<2 )
    this.TesteFiltro= value})




  searchText = '';


  constructor(
    private veiculoservice:VeiculosService,
    private veiculosDataService:VeiculosDataService,
    private graficoService:GraficoService,
  ) { }
//Iniciar o dash com um veiculo selecionado
  ngOnInit(): void {
    this.veiculoservice.selectVeiculo(1).subscribe((value) => {this.veiculoSelect$ = value[0]})

  }


//alterar veiculo
  changeVeic (e:any){
    const carro = e.target.value
    return this.veiculoservice.selectVeiculo(carro).subscribe((value) =>
     {this.veiculoSelect$ = value[0],this.graficoService.atualizaGrafico(carro,)})
  }

//calcular percentual de conectados
  calculateConect(){
    return (Number(this.veiculoSelect$?.connected) / Number(this.veiculoSelect$?.volumetotal)*100).toFixed(2);
  }

//calcular percentual de atualizados
  calculateUpdate(){
    return (Number(this.veiculoSelect$?.softwareUpdates) / Number(this.veiculoSelect$?.volumetotal)*100).toFixed(2);
  }

//Atualizar dados do vehicleData
  updateDataVeic():void{
      this.modalComponent.veiculoData=this.TesteFiltro[0]


  }

  //limpar dados do modal
  clearDataVeic():void{
      var obj:VeiculoData={
        vin: '',
        odometer: '',
        tirePressure: '',
        status: null,
        batteryStatus: '',
        fuelLevel: '',
        lat: '',
        longi: null
          }
      this.modalComponent.veiculoData=obj

  }


//deletar vehicleData
   alertDelete(){
     Swal.fire({
       title:`Confirma a Exclusão do vin ${this.TesteFiltro[0].vin}?`,
       showCancelButton: true,
       confirmButtonText: 'Sim',
       confirmButtonColor: 'rgb(224,2,8)',
       cancelButtonText: 'Não'
     }).then(res => {
       if(res.value){
       this.veiculosDataService.excluir(this.TesteFiltro[0].id).subscribe(res =>{
        this.TesteFiltro[0]=res;})
       console.log(this.TesteFiltro[0])
       Swal.fire({
         title:`O veiculoData vin ${this.TesteFiltro[0].vin} foi excluído`,
         icon:'success',
         confirmButtonColor:'rgb(72,134,225)'}).then(res=>{
          this.load()
         })
     }else{
       console.log('Cancelado')
     }
     })
   }


   load() {
    location.reload()
  }






}
