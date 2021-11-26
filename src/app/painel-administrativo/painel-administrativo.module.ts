import { ConfiguracaoComponent } from './configuracao/configuracao.component';
import { MonitoresComponent } from './monitores/monitores.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PainelAdministrativoRoutingModule } from './painel-administrativo-routing.module';


@NgModule({
  declarations: [
    MonitoresComponent,
    ConfiguracaoComponent
  ],
  imports: [
    CommonModule,
    PainelAdministrativoRoutingModule
  ]
})
export class PainelAdministrativoModule { }
