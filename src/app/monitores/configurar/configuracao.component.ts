import { MonitoresService } from './../monitores.service';
import { AlertModalService } from './../../shared/alert-modal.service';
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
    private modal: AlertModalService,
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

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');

      let msgSuccess = 'Monitor adicionado com sucesso!';
      let msgError = 'Erro ao adicionar monitor, tente novamente!';
      if(this.form.value.id){
        msgSuccess = 'Monitor atualizado com sucesso!';
        msgError = 'Erro ao atualizar monitor, tente novamente!';
      }

      this.service.salvar(this.form.value).subscribe(
        success => {
          this.modal.mostrarAlertaSuccess(msgSuccess);
            this.location.back();
        },
        error => {
          this.modal.mostrarAlertaDanger(msgError)
        }
      );

    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }
}
