import { AlterarComponent } from './alterar/alterar.component';
import { ConfigurarComponent } from './configurar/configurar.component';
import { ListarComponent } from './listar/listar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitorRoutingModule } from './monitor-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListarComponent,
    ConfigurarComponent,
    AlterarComponent
  ],
  imports: [
    CommonModule,
    MonitorRoutingModule,
    ReactiveFormsModule
  ]
})
export class MonitorModule { }
