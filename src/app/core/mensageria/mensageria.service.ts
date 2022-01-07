import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensageriaService {

  constructor(private toastrService: ToastrService) { }

  mensagemSucesso(mensagem: string): void{
    this.toastrService.success(mensagem, 'Sucesso!')
  }

  mensagemAlerta(mensagem: string): void{
    this.toastrService.warning(mensagem, 'Alerta!')
  }

  mensagemError(mensagem: string): void{
    this.toastrService.error(mensagem, 'Error!')
  }
}
