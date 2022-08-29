import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from '../message.service';
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
  })

export class MercanciaService {

    private api: string = 'http://localhost:8080/';

    constructor(
        private http: HttpClient,
        private messageService: MessageService) {

    }
  
    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`MercanciaService: ${message}`);
    }

    listarMercancias(): Observable<any>{
        return this.http.get(this.api+'mercancia/listar');
    }

    crearMercancia(mercancia:any): Observable<any>{
        console.log(mercancia);
        return this.http.post(this.api+'mercancia/crear',mercancia);
    }

    modificarMercancia(mercancia:any): Observable<any>{
        return this.http.post(this.api+'mercancia/modificar',mercancia);
    }

    eliminarMercancia(id:string): Observable<any>{
        return this.http.get(this.api+'mercancia/eliminar/'+id);
    }

  }