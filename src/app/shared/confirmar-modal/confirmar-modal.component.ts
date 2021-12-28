import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmar-modal',
  templateUrl: './confirmar-modal.component.html',
  styleUrls: []
})
export class ConfirmarModalComponent implements OnInit {

  @Input() titulo!: string;
  @Input() mensagem!: string;
  @Input() mensagemAoCancelar = 'Cancelar';
  @Input() mensagemAoAceitar = 'Sim';

  confirmarResultado!: Subject<boolean>;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.confirmarResultado = new Subject();
  }

  aoConfimar(){
    this.confirmarEFechar(true);
  }

  aoFechar(){
    this.confirmarEFechar(false);
  }

  private confirmarEFechar(value: boolean){
    this.confirmarResultado.next(value)
    this.bsModalRef.hide();
  }

}
