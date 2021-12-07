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

  private mostrarAlerta(mensagem: string, tipoAlerta: string){
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.tipoAlerta = 'danger';
    bsModalRef.content.mensagem = mensagem;
  }

  mostrarAlertaDanger(mensagem: string){
    this.mostrarAlerta(mensagem, TiposAlerta.DANGER)
  }

  mostrarAlertaSuccess(mensagem: string){
    this.mostrarAlerta(mensagem, TiposAlerta.SUCCESS)
  }
}
