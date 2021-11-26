import { PainelAdministrativo } from './painel-administrativo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PainelAdministrativoService {

  private readonly API = "http://localhost:3000/chamadas"

  constructor(
    private http: HttpClient
  ) { }

  listarMonitoresAtivos(){
    return this.http.get<PainelAdministrativo[]>(this.API);
  }
}
