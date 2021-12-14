import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  @Input() titulo!: string;
  @Input() mensagem!: string;
  @Input() cancelarTxt = 'Cancelar';
  @Input() okTxt = 'Sim';

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  onConfirm(){

  }

  onClose(){
    this.bsModalRef.hide();
  }

}
