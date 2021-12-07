import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';
import { PainelAdministrativoService } from './../painel-administrativo.service';
import { Component, OnInit } from '@angular/core';
import { PainelAdministrativo } from '../painel-administrativo';
import { empty, Observable, pipe, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-monitores',
  templateUrl: './monitores.component.html',
  styleUrls: ['./monitores.component.css'],
  preserveWhitespaces: true
})
export class MonitoresComponent implements OnInit {

  // painel!: PainelAdministrativo[];

  bsModalRef?: BsModalRef;

  painel$!: Observable<PainelAdministrativo[]>
  error$ = new Subject<boolean>()

  constructor(
    private service: PainelAdministrativoService,
    private modalService: BsModalService
    ) { }

  ngOnInit() {
    // this.service.listarMonitoresAtivos()
    // .subscribe(dados => this.painel = dados)
    this.onRefresh();
  }

  onRefresh(){
    this.painel$ = this.service.listarMonitoresAtivos()
    .pipe(
      catchError(error => {
        console.error(error)
        // this.error$.next(true);
        this.handleError();
        return empty();
      })
    );

    this.service.listarMonitoresAtivos()
    .pipe(
      catchError(error => empty())
    )
    .subscribe(
      dados => {
        console.log(dados);
      }
      // ,
      // error => console.error(error),
      // () => console.log('Observable completo!')
    )
  }

  handleError(){
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.tipoAlertaErro = 'danger';
    this.bsModalRef.content.alertaErro = 'Erro ao carregar monitores. Tente novamente mais tarde.';

  }

}
