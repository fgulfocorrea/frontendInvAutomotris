import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from '../message.service';
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
  })

export class CargoService {

    private cargosUrl: string = 'http://localhost:8080/';

    constructor(
        private http: HttpClient,
        private messageService: MessageService) {

    }
  
    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`CargoService: ${message}`);
    }

    listarCargos(): Observable<any>{
        return this.http.get(this.cargosUrl+'cargo/listar');
    }

    crearCargo(cargo:any): Observable<any>{
        return this.http.post(this.cargosUrl+'cargo/crear',cargo);
    }

    modificarCargo(cargo:any): Observable<any>{
        return this.http.post(this.cargosUrl+'cargo/modificar',cargo);
    }

    eliminarCargo(id:string): Observable<any>{
        return this.http.get(this.cargosUrl+'cargo/eliminar/'+id);
    }
  }