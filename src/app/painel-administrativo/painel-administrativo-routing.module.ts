import { MonitorResolverGuard } from './guards/monitor-resolver.guard';
import { ConfiguracaoComponent } from './configuracao/configuracao.component';
import { MonitoresComponent } from './monitores/monitores.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: MonitoresComponent },
  {
    path: 'configuracao',
    component: ConfiguracaoComponent,
    resolve: {
      monitor: MonitorResolverGuard,
    },
  },
  {
    path: 'editar/:id',
    component: ConfiguracaoComponent,
    resolve: {
      monitor: MonitorResolverGuard,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PainelAdministrativoRoutingModule {}
