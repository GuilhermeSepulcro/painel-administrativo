import { environment } from './../../environments/environment';
import { PainelAdministrativo } from './painel-administrativo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PainelAdministrativoService {

  private readonly API = `${environment.API}chamadas`

  constructor(
    private http: HttpClient
  ) { }

  listarMonitoresAtivos(){
    return this.http.get<PainelAdministrativo[]>(this.API);
  }

  loadByID(id: any){
    return this.http.get<PainelAdministrativo>(`${this.API}/${id}`).pipe(take(1));
  }

  criar(monitor: any){
    return this.http.post(this.API, monitor).pipe(take(1));
  }

  update(monitor: any){
    return this.http.put(`${this.API}/${monitor.id}`, monitor).pipe(take(1))
  }

  salvar(monitor: any){
    if(monitor.id){
      return this.update(monitor);
    }
    return this.criar(monitor)

  }

}
