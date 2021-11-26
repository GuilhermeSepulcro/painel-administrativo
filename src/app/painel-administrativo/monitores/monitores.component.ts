import { PainelAdministrativoService } from './../painel-administrativo.service';
import { Component, OnInit } from '@angular/core';
import { PainelAdministrativo } from '../painel-administrativo';
import { empty, Observable, pipe, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Component({
  selector: 'app-monitores',
  templateUrl: './monitores.component.html',
  styleUrls: ['./monitores.component.css'],
  preserveWhitespaces: true
})
export class MonitoresComponent implements OnInit {

  // painel!: PainelAdministrativo[];

  painel$!: Observable<PainelAdministrativo[]>
  error$ = new Subject<boolean>()

  constructor(private service: PainelAdministrativoService) { }

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
        this.error$.next(true);
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

}
