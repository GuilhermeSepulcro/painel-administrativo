import { MonitorIncluirModel, MonitorAlterarModel } from '../monitor-model';
import { MonitorService } from '../monitor.service';
import { AlertaModalService } from '../../shared/alerta-modal.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alterar-monitor',
  templateUrl: './alterar.component.html',
  styleUrls: []
})
export class AlterarComponent implements OnInit {

  form!: FormGroup;
  formularioFoiEnviado = false;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private modal: AlertaModalService,
    private service: MonitorService
  ) { }

  ngOnInit(): void {
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

  alterarMonitor() {
    const monitor = {
      nome: this.form.value.nome
    } as MonitorAlterarModel

      this.service.atualizarMonitor(this.form.value).subscribe(
        success => {
          this.modal.mostrarAlertaSucesso('Monitor atualizado com sucesso!');
            this.location.back();
        },
        error => {
          this.modal.mostrarAlertaErro(`Erro ao atualizar monitor: ${error}`)
        }
      );
    }

    cancelar() {
      this.formularioFoiEnviado = false;
      this.form.reset();
    }
  }

