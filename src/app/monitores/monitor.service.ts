import { take } from 'rxjs/operators';
import { MonitorAlterarModel, MonitorIncluirModel, MonitorLeituraModel } from './monitor-model';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  private readonly API = `${environment.API}chamadas`

  constructor(
    private http: HttpClient
  ) { }

  obterMonitoresAtivos(){
    return this.http.get<MonitorLeituraModel[]>(this.API);
  }

  incluirMonitor(monitor: MonitorIncluirModel){
    return this.http.post(this.API, monitor);
  }

  atualizarMonitor(monitor: MonitorAlterarModel){
    return this.http.put(`${this.API}/${monitor.id}`, monitor);
  }

  excluirMonitor(id: number){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }

}
