import { ConfigurarComponent } from './configurar/configurar.component';
import { ListarComponent } from './listar/listar.component';
import { MonitorResolverGuard } from './guards/monitor-resolver.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ListarComponent },
  {
    path: 'configurar',
    component: ConfigurarComponent,
    resolve: {
      monitor: MonitorResolverGuard,
    },
  },
  {
    path: 'editar/:id',
    component: ConfigurarComponent,
    resolve: {
      monitor: MonitorResolverGuard,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitoresRoutingModule {}
