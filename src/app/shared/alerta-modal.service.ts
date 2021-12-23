import { AlertaModalComponent } from './alerta-modal/alerta-modal.component';
import { ConfirmarModalComponent } from './confirmar-modal/confirmar-modal.component';
import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

export enum TiposAlerta{
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertaModalService {

  constructor(private modalService: BsModalService) { }

  private mostrarAlerta(mensagem: string, tipoAlerta: string, dismissTimeout?:number){
    const bsModalRef: BsModalRef = this.modalService.show(AlertaModalComponent);
    bsModalRef.content.tipoAlerta = tipoAlerta;
    bsModalRef.content.mensagem = mensagem;

    if(dismissTimeout){
      setTimeout(() => bsModalRef.hide(), dismissTimeout);
    }
  }

  mostrarAlertaErro(mensagem: string){
    this.mostrarAlerta(mensagem, TiposAlerta.DANGER)
  }

  mostrarAlertaSucesso(mensagem: string){
    this.mostrarAlerta(mensagem, TiposAlerta.SUCCESS, 3000)
  }

  mostrarConfirmacao(titulo: string, mensagem: string, mensagemAoAceitar?: string, mensagemAoCancelar?: string ){
    const bsModalRef: BsModalRef = this.modalService.show(ConfirmarModalComponent);
    bsModalRef.content.titulo = titulo;
    bsModalRef.content.mensagem = mensagem;

    if(mensagemAoAceitar){
      bsModalRef.content.mensagemAoAceitar = mensagemAoAceitar;
    }
    if(mensagemAoCancelar){
      bsModalRef.content.mensagemAoCancelar = mensagemAoCancelar;
    }
    return (<ConfirmarModalComponent>bsModalRef.content).confirmarResultado;
  }
}
