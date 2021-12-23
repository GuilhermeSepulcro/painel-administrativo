import { AlertaModalService } from './../../shared/alerta-modal.service';
import { monitorModel } from '../monitor-model';
import { MonitoresService } from './../monitores.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EMPTY, Observable, pipe, Subject } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-monitores',
  templateUrl: './listar.component.html',
  styleUrls: [],
  preserveWhitespaces: true,
})
export class ListarComponent implements OnInit {

  deleteModalRef!: BsModalRef;
  @ViewChild('deleteModal') deleteModal;

  monitores$!: Observable<monitorModel[]>;
  error$ = new Subject<boolean>();

  monitorSelecionado!: monitorModel;

  constructor(
    private service: MonitoresService,
    private modalService: BsModalService,
    private servicoDeAlerta: AlertaModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.atualizar();
  }

  atualizar() {
    this.monitores$ = this.service.listarMonitoresAtivos().pipe(
      catchError((error) => {
        this.tratarError();
        return EMPTY;
      })
    );
  }

  tratarError() {
    this.servicoDeAlerta.mostrarAlertaErro(
      'Erro ao carregar monitores. Tente novamente mais tarde.'
    );
  }

  irParaEdicao(id) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  irParaExclusao(monitor){
    this.monitorSelecionado = monitor

    const resultado$ = this.servicoDeAlerta.mostrarConfirmacao('Confirmação', 'Tem certeza que deseja remover esse monitor?')
    resultado$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.service.excluirMonitor(monitor.id): EMPTY)
    )
    .subscribe(
      success => {
        this.atualizar();
      },
      error => {
        this.servicoDeAlerta.mostrarAlertaErro('Erro ao remover monitor. Tente novamente mais tarde.')
      }
    )
  }

  confirmarExclusao(){
    this.service.excluirMonitor(this.monitorSelecionado.id)
    .subscribe(
      success => {
        this.atualizar();
        this.deleteModalRef.hide();
      },
      error => {
        this.servicoDeAlerta.mostrarAlertaErro('Erro ao remover monitor. Tente novamente mais tarde.')
        this.deleteModalRef.hide();
      }
    );
  }

  negarExclusao(){
    this.deleteModalRef.hide();
  }
}
