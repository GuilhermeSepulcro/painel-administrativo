import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

export enum TiposAlerta{
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private modalService: BsModalService) { }

  private mostrarAlerta(mensagem: string, tipoAlerta: string, dismissTimeout?:number){
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.tipoAlerta = tipoAlerta;
    bsModalRef.content.mensagem = mensagem;

    if(dismissTimeout){
      setTimeout(() => bsModalRef.hide(), dismissTimeout);
    }
  }

  mostrarAlertaDanger(mensagem: string){
    this.mostrarAlerta(mensagem, TiposAlerta.DANGER)
  }

  mostrarAlertaSuccess(mensagem: string){
    this.mostrarAlerta(mensagem, TiposAlerta.SUCCESS, 3000)
  }
}
