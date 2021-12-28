import { ConfigurarComponent } from './configurar/configurar.component';
import { ListarComponent } from './listar/listar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoresRoutingModule } from './monitores-routing.module';
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
    MonitoresRoutingModule,
    ReactiveFormsModule
  ]
})
export class MonitoresModule { }
