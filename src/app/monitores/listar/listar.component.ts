import { monitorModel } from './../painel-administrativo-model';
import { MonitoresService } from './../monitores.service';
import { AlertModalService } from '../../shared/alert-modal.service';
import { AlertModalComponent } from '../../shared/alert-modal/alert-modal.component';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('deleteModal') deleteModal;

  monitores$!: Observable<monitorModel[]>;
  error$ = new Subject<boolean>();

  monitorSelecionado!: monitorModel;

  constructor(
    private service: MonitoresService,
    private modalService: BsModalService,
    private servicoDeAlerta: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.service.listarMonitoresAtivos()
    // .subscribe(dados => this.painel = dados)
    this.atualizar();
  }

  atualizar() {
    this.monitores$ = this.service.listarMonitoresAtivos().pipe(
      catchError((error) => {
        // console.error(error);
        // this.error$.next(true);
        this.tratarError();
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

  tratarError() {
    this.servicoDeAlerta.mostrarAlertaDanger(
      'Erro ao carregar monitores. Tente novamente mais tarde.'
    );
  }

  editar(id) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  excluir(painel){
    this.monitorSelecionado = painel
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

  confirmarExclusao(){
    this.service.excluirMonitor(this.monitorSelecionado.id)
    .subscribe(
      success => {
        this.atualizar();
        this.deleteModalRef.hide();
      },
      error => {
        this.servicoDeAlerta.mostrarAlertaDanger('Erro ao remover monitor. Tente novamente mais tarde.')
        this.deleteModalRef.hide();
      }
    );
  }

  negarExclusao(){
    this.deleteModalRef.hide();
  }
}
