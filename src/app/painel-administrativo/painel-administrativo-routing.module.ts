import { ConfiguracaoComponent } from './configuracao/configuracao.component';
import { MonitoresComponent } from './monitores/monitores.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: MonitoresComponent },
  { path: 'novo', component: ConfiguracaoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PainelAdministrativoRoutingModule { }
