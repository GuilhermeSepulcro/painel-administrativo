import { ConfirmarModalComponent } from './confirmar-modal/confirmar-modal.component';
import { AlertaModalComponent } from './alerta-modal/alerta-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AlertaModalComponent,
    ConfirmarModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertaModalComponent
  ],
  entryComponents: [
    AlertaModalComponent,
    ConfirmarModalComponent
  ]
})
export class SharedModule { }
