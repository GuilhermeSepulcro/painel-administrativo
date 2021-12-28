import { ConfigurarComponent } from './configurar/configurar.component';
import { ListarComponent } from './listar/listar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitorRoutingModule } from './monitor-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AlterarMonitorComponent } from './alterar-monitor/alterar-monitor.component';


@NgModule({
  declarations: [
    ListarComponent,
    ConfigurarComponent,
    AlterarMonitorComponent
  ],
  imports: [
    CommonModule,
    MonitorRoutingModule,
    ReactiveFormsModule
  ]
})
export class MonitorModule { }
