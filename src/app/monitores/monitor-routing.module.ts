import { AlterarComponent } from './alterar/alterar.component';
import { ConfigurarComponent } from './configurar/configurar.component';
import { ListarComponent } from './listar/listar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ListarComponent },
  {
    path: 'configurar',
    component: ConfigurarComponent
  },
  {
    path: 'editar/:id',
    component: AlterarComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitorRoutingModule {}
