import { monitorModel } from './../painel-administrativo-model';
import { MonitoresService } from './../monitores.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonitorResolverGuard implements Resolve<monitorModel> {

  constructor(private service: MonitoresService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    if(route.params && route.params['id']){
      return this.service.obterMonitorPorId(route.params['id'])
    }

    return of({
      id: null,
      nome: null
    });
  }

}
