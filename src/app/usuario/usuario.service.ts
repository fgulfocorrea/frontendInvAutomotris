import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from '../message.service';
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
  })

export class UsuarioService {

    private api: string = 'http://localhost:8080/';

    constructor(
        private http: HttpClient,
        private messageService: MessageService) {

    }
  
    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`UsuarioService: ${message}`);
    }

    listarUsuarios(): Observable<any>{
        return this.http.get(this.api+'usuario/listar');
    }

    crearUsuario(usuario:any): Observable<any>{
        console.log(usuario);
        return this.http.post(this.api+'usuario/crear',usuario);
    }

    modificarUsuario(usuario:any): Observable<any>{
        return this.http.post(this.api+'usuario/modificar',usuario);
    }

    eliminarUsuario(id:string): Observable<any>{
        return this.http.get(this.api+'Usuario/eliminar/'+id);
    }

  }