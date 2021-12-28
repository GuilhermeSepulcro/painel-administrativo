import { MonitorService } from './../monitor.service';
import { AlertaModalService } from './../../shared/alerta-modal.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alterar-monitor',
  templateUrl: './alterar-monitor.component.html',
  styleUrls: []
})
export class AlterarMonitorComponent implements OnInit {

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
    this.formularioFoiEnviado = true;
    if (this.form.value.id) {
      let mensagemSucesso = 'Monitor atualizado com sucesso!';
      let mensagemErro = 'Erro ao atualizar monitor, tente novamente!';

      this.service.salvarMonitor(this.form.value).subscribe(
        success => {
          this.modal.mostrarAlertaSucesso(mensagemSucesso);
            this.location.back();
        },
        error => {
          this.modal.mostrarAlertaErro(mensagemErro)
        }
      );
    }
  }

  cancelar() {
    this.formularioFoiEnviado = false;
    this.form.reset();
  }

}

