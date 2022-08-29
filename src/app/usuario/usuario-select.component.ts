import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Usuario } from "./usuario.component";
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-usuario-select',
  templateUrl: './usuario-select.component.html'
})
export class UsuarioSelectComponent implements OnInit{

  usuarios: any

  selectedValue: Usuario = new Usuario("",0);

  @Output() messageEvent = new EventEmitter<Usuario>();

  constructor(public usuarioService: UsuarioService){}

  ngOnInit(): void {
    this.usuarioService.listarUsuarios().subscribe(data => { this.usuarios = data.listaUsuarios;
        console.log(this.usuarios);
              },
             err => console.error(err), 
             () => console.log('getUsuarios completed') 
        );
  }

  sendSelectUsuario() {
    console.log(this.selectedValue);
    this.messageEvent.emit(this.selectedValue);
  }
}