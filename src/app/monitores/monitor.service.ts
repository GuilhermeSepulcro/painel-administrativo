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

  listarMonitoresAtivos(){
    return this.http.get<MonitorLeituraModel[]>(this.API);
  }

  incluirMonitor(monitor: MonitorIncluirModel){
    return this.http.post(this.API, monitor);
  }

  atualizarMonitor(monitor: MonitorAlterarModel){
    return this.http.put(`${this.API}/${monitor.id}`, monitor);
  }

  alterarMonitor(monitor: MonitorAlterarModel){
    if(monitor.id){
      return this.atualizarMonitor(monitor);
    }
    return this.incluirMonitor(monitor)
  }



  excluirMonitor(id: number){
    return this.http.delete(`${this.API}/${id}`);
  }

}
