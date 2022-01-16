import { catchError } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MensageriaService } from './../mensageria/mensageria.service';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable()

export class InterceptorService implements HttpInterceptor {

  deleteModalRef!: BsModalRef;

  constructor(private mensageria: MensageriaService) { }

  intercept(request: HttpRequest<any>,next: HttpHandler ): Observable<HttpEvent<any>> {
    console.log('teste inteceptor')
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
        this.mensageria.mensagemError('error')
        this.deleteModalRef.hide();
        return throwError(error.error)
        })
      );
  }

}
