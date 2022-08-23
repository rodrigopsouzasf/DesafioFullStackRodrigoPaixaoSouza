import { Chart } from 'chart.js';
import { VeiculosService } from './../../pages/dashboard/veiculos.service';
import { Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GraficoService {
  chartexport:any=[]
  chartexport2:any=[]
  constructor(
    private veiculosService:VeiculosService,
  ) { }


  atualizaGrafico(v:any){
    this.chartexport.destroy(),
    this.chartexport2.destroy(),
    this.veiculosService.selectVeiculo(v).subscribe(res =>{
      this.geraGraficoConect(res[0]),
      this.geraGraficoUpdate(res[0])
    })
  }


  geraGraficoConect(res:any){
    let veic_conect = res.connected/res.volumetotal*100;
    let veic_total = 100-veic_conect;

    this.chartexport = new Chart('canvas',{
      type: 'doughnut',
      data:{
        labels: ['Conectados','Não Conectados'],
        datasets: [
          {
            label:'Conectados',
            data: [ veic_conect.toFixed(1),veic_total.toFixed(1)],
            backgroundColor: [
              'rgb(0, 67, 119)',
              'rgb(222, 222, 222)'
            ],
            hoverOffset: 4
          }
        ]
      },
      options:{
        responsive: true,
        plugins:{
          legend:{
            display: false
          },
          title:{
            display: true,
            text: 'Conectados',
            font:{
              size:20,
              weight:'bold'
            },
          color: 'rgb(0,0,0)'
          },
          datalabels:{
            anchor:'center',
            align:'center',
            font:{
              weight: 'bold',
              size:12
            },
            color: 'rgb(255,255,255)',
            formatter: (value) =>{
              return value + '%'
            }
          }

        }
      }

    })
}




geraGraficoUpdate(res:any){
  let veic_update = res.softwareUpdates/res.volumetotal*100;
  let veic_total = 100-veic_update;


  this.chartexport2 = new Chart('canvas2',{
    type: 'doughnut',
    data:{
      labels: ['Atualizados','Não Atualizados'],
      datasets: [
        {
          label:'Update Software',
          data: [ veic_update.toFixed(1),veic_total.toFixed(1)],
          backgroundColor: [
            'rgb(0, 67, 119)',
            'rgb(222, 222, 222)',
          ],
          hoverOffset: 4
        }
      ]
    },
    options:{
      responsive: true,
      plugins:{
        legend:{
          display: false
        },
        title:{
          display: true,
          text: 'Update Software',
          font:{
            size:20,
            weight:'bold'
          },
          color: 'rgb(0,0,0)'
        },
        datalabels:{
          anchor:'center',
          align:'center',
          font:{
            weight: 'bold',
            size:12
          },
          color: 'rgb(255,255,255)',
          formatter: (value)=>{
            return value+'%'
          }
        }

      }
    }

  })
}
}
