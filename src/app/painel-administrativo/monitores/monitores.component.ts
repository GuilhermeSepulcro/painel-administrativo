import { PainelAdministrativoService } from './../painel-administrativo.service';
import { Component, OnInit } from '@angular/core';
import { PainelAdministrativo } from '../painel-administrativo';

@Component({
  selector: 'app-monitores',
  templateUrl: './monitores.component.html',
  styleUrls: ['./monitores.component.css'],
  preserveWhitespaces: true
})
export class MonitoresComponent implements OnInit {

  painel!: PainelAdministrativo[];

  constructor(private service: PainelAdministrativoService) { }

  ngOnInit() {
    this.service.listarMonitoresAtivos()
    .subscribe(dados => this.painel = dados)
  }

}
