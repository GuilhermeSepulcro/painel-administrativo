import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'painel-administrativo' },
  {
    path: 'painel-administrativo',
    loadChildren: () => import('./monitores/monitor.module').then(m => m.MonitorModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
