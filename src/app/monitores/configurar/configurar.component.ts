import { AlertaModalService } from './../../shared/alerta-modal.service';
import { MonitoresService } from '../monitores.service';
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
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private service: MonitoresService,
    private modal: AlertaModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const monitor = this.route.snapshot.data['monitor'];

    this.form = this.fb.group({
      id: [monitor.id],
      nome: [
        monitor.nome,
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

  enviar() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');

      let mensagemSucesso = 'Monitor adicionado com sucesso!';
      let mensagemErro = 'Erro ao adicionar monitor, tente novamente!';
      if(this.form.value.id){
        mensagemSucesso = 'Monitor atualizado com sucesso!';
        mensagemErro = 'Erro ao atualizar monitor, tente novamente!';
      }

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
    this.submitted = false;
    this.form.reset();
  }
}
