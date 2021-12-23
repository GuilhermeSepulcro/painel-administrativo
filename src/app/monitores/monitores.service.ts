import { monitorModel } from './monitor-model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MonitoresService {

  private readonly API = `${environment.API}chamadas`

  constructor(
    private http: HttpClient
  ) { }

  listarMonitoresAtivos(){
    return this.http.get<monitorModel[]>(this.API);
  }

  obterMonitorPorId(id){
    return this.http.get<monitorModel>(`${this.API}/${id}`).pipe(take(1));
  }

  incluirMonitor(monitor){
    return this.http.post(this.API, monitor).pipe(take(1));
  }

  atualizarMonitor(monitor){
    return this.http.put(`${this.API}/${monitor.id}`, monitor).pipe(take(1))
  }

  salvarMonitor(monitor){
    if(monitor.id){
      return this.atualizarMonitor(monitor);
    }
    return this.incluirMonitor(monitor)
  }

  excluirMonitor(id){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }

}
