import { MensageriaService } from './../../core/mensageria/mensageria.service';
// import { AlertaModalService } from './../../shared/alerta-modal.service';
import { MonitorLeituraModel } from '../monitor-model';
import { MonitorService } from '../monitor.service';
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
  @ViewChild('deleteModal') deleteModal: any;

  monitor$!: Observable<MonitorLeituraModel[]>;
  error$ = new Subject<boolean>();

  monitorSelecionado!: MonitorLeituraModel;

  constructor(
    private service: MonitorService,
    private modalService: BsModalService,
    // private servicoDeAlerta: AlertaModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.atualizar();
  }

  atualizar() {
    this.monitor$ = this.service.obterMonitoresAtivos().pipe(
      catchError((error) => {
        return EMPTY;
      })
    );
  }


  irParaEdicao(id: number) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  irParaExclusao(monitor: MonitorLeituraModel){
    this.monitorSelecionado = monitor;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

  aoConfirmarExclusao(){
    this.service.excluirMonitor(this.monitorSelecionado.id)
    .subscribe(
      success => {
        this.atualizar();
        this.deleteModalRef.hide();
      }
    );
  }

  aoRecusarExclusao(){
    this.deleteModalRef.hide();
  }

}
