import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'painel-administrativo' },
  {
    path: 'painel-administrativo',
    loadChildren: () => import('./painel-administrativo/painel-administrativo.module').then(m => m.PainelAdministrativoModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
