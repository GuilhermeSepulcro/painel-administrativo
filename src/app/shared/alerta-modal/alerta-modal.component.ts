import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alerta-modal',
  templateUrl: './alerta-modal.component.html',
  styleUrls: []
})
export class AlertaModalComponent implements OnInit {

  @Input() mensagem!: string;
  @Input() tipoAlerta!: 'danger';

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }


  aoFechar(){
    this.bsModalRef.hide();
  }
}
