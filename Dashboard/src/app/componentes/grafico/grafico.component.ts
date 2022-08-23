import { GraficoService } from './grafico.service';
import { VeiculosService } from './../../pages/dashboard/veiculos.service';
import { Component, Input, OnInit } from '@angular/core';
import { Chart,registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(...registerables,ChartDataLabels)


@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {
  @Input()
  chart= this.graficoService.chartexport
  chart2= this.graficoService.chartexport2




  constructor(
    private veiculosService:VeiculosService,
    private graficoService:GraficoService) { }

  ngOnInit(): void {
    this.veiculosService.selectVeiculo(1).subscribe(res => {
      this.graficoService.geraGraficoConect(res[0]),
      this.graficoService.geraGraficoUpdate(res[0])

    })
  }

}
