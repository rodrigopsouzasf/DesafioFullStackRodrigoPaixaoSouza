import { ModalModule } from './../../componentes/modal/modal.module';
import { GraficoModule } from './../../componentes/grafico/grafico.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabelaModule } from './../../componentes/tabela/tabela.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CartaoModule } from 'src/app/componentes/cartao/cartao.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CartaoModule,
    TabelaModule,
    FormsModule,
    ReactiveFormsModule,
    GraficoModule,
    ModalModule
  ]
})
export class DashboardModule { }
