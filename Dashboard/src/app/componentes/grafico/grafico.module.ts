import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficoComponent } from './grafico.component';
import { GraficoService } from './grafico.service';



@NgModule({
  declarations: [
    GraficoComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    GraficoComponent
  ],
  providers:[GraficoService]
})
export class GraficoModule { }
