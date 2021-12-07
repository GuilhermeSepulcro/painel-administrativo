import { AlertModalService } from './../../shared/alert-modal.service';
import { PainelAdministrativoService } from './../painel-administrativo.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.component.html',
  styleUrls: ['./configuracao.component.css'],
})
export class ConfiguracaoComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private service: PainelAdministrativoService,
    private modal: AlertModalService,
    private location: Location
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
    });
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');
      this.service.criar(this.form.value).subscribe(
        success => {
          this.modal.mostrarAlertaSuccess('Monitor adicionado com sucesso!')
          this.location.back();
        },
        error => this.modal.mostrarAlertaDanger('Erro ao adicionar curso, tente novamente!'),
        () => console.log('request completo')
      )
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }
}
