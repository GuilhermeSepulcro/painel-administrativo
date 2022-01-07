import { MensageriaService } from './../../core/mensageria/mensageria.service';
import { MonitorIncluirModel } from './../monitor-model';
// import { AlertaModalService } from './../../shared/alerta-modal.service';
import { MonitorService } from '../monitor.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configurar.component.html',
  styleUrls: [],
})
export class ConfigurarComponent implements OnInit {
  form!: FormGroup;
  formularioFoiEnviado = false;
  estaEnviandoFormulario = false;

  constructor(
    private fb: FormBuilder,
    private service: MonitorService,
    private location: Location,
    private route: ActivatedRoute,
    private mensageService: MensageriaService
  ) {}

  ngOnInit() {
    const monitor = this.route.snapshot.params['monitor']

    this.form = this.fb.group({
      id: this.route.snapshot.params['id'],
      nome: [
        this.route.snapshot.params['nome'],
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
    });
  }

  possuiError(field: string) {
    return this.form.get(field)?.errors;
  }

  incluirMonitor() {
    const monitor = {
      nome: this.form.value.nome
    } as MonitorIncluirModel

      this.service.incluirMonitor(this.form.value).subscribe(
        success => {
          this.mensageService.mensagemSucesso('Monitor adicionado com sucesso!');
            this.location.back();
        },
        error => {
          this.estaEnviandoFormulario = false;
          this.mensageService.mensagemError(`Erro ao adicionar monitor: ${error}`)
        }
      );
    }

    cancelar() {
      this.formularioFoiEnviado = false;
      this.form.reset();
    }
  }

