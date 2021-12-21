import { MonitoresService } from './../monitores.service';
import { AlertModalService } from '../../shared/alert-modal.service';
import { AlertModalComponent } from '../../shared/alert-modal/alert-modal.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PainelAdministrativo } from '../painel-administrativo';
import { empty, Observable, pipe, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-monitores',
  templateUrl: './listar.component.html',
  styleUrls: [],
  preserveWhitespaces: true,
})
export class ListarComponent implements OnInit {
  // painel!: PainelAdministrativo[];

  // bsModalRef?: BsModalRef;

  deleteModalRef!: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;

  painel$!: Observable<PainelAdministrativo[]>;
  error$ = new Subject<boolean>();

  monitorSelecionado!: PainelAdministrativo;

  constructor(
    private service: MonitoresService,
    private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.service.listarMonitoresAtivos()
    // .subscribe(dados => this.painel = dados)
    this.onRefresh();
  }

  onRefresh() {
    this.painel$ = this.service.listarMonitoresAtivos().pipe(
      catchError((error) => {
        console.error(error);
        // this.error$.next(true);
        this.handleError();
        return empty();
      })
    );

    // this.service.listarMonitoresAtivos()
    // .pipe(
    //   catchError(error => empty())
    // )
    // .subscribe(
    //   dados => {
    //     console.log(dados);
    //   }
    //   ,
    //   error => console.error(error),
    //   () => console.log('Observable completo!')
    // )
  }

  handleError() {
    this.alertService.mostrarAlertaDanger(
      'Erro ao carregar monitores. Tente novamente mais tarde.'
    );
  }

  onEdit(id: any) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  onDelete(painel: any){
    this.monitorSelecionado = painel
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

  onConfirmDelete(){
    this.service.remover(this.monitorSelecionado.id)
    .subscribe(
      success => {
        this.onRefresh();
        this.deleteModalRef.hide();
      },
      error => {
        this.alertService.mostrarAlertaDanger('Erro ao remover monitor. Tente novamente mais tarde.')
        this.deleteModalRef.hide();
      }
    );
  }

  onDeclineDelete(){
    this.deleteModalRef.hide();
  }
}
