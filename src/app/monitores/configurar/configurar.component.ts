import { AlertaModalService } from './../../shared/alerta-modal.service';
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
    private modal: AlertaModalService,
    private location: Location,
    private route: ActivatedRoute
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
    this.formularioFoiEnviado = true;
    if (this.form.valid) {

      this.estaEnviandoFormulario = true;

      let mensagemSucesso = 'Monitor adicionado com sucesso!';
      let mensagemErro = 'Erro ao adicionar monitor, tente novamente!';

      this.service.salvarMonitor(this.form.value).subscribe(
        success => {
          this.modal.mostrarAlertaSucesso(mensagemSucesso);
            this.location.back();
        },
        error => {
          this.estaEnviandoFormulario = false;
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
