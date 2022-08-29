import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { UsuarioService } from './usuario.service';
import { MatTable } from '@angular/material/table';
import { Cargo } from "../cargo/cargo.component";
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-usuario',
    templateUrl: 'usuario.component.html'

})

export class UsuarioComponent implements OnInit{

    cargoSelect: Cargo = new Cargo("","",0);

    title: string = 'Administracion de Usuarios'

    columnas: string[] = ['id', 'nombre', 'edad', 'cargo', 'fechaIngreso', 'acciones'];

    date = new FormControl(new Date());

    id: number = 0;

    nombre: string = '';

    edad: number = 0;

    cargo: Cargo = new Cargo("","",0);

    usuarioSelect: Usuario = new Usuario("",0);

    datos:any;

    flagEditar: boolean = false;

    @ViewChild(MatTable) tabla1!: MatTable<Usuario>;

    constructor(public usuarioService: UsuarioService, private _snackBar: MatSnackBar) {}

    ngOnInit() {
        this.usuarioService.listarUsuarios().subscribe(data => { this.datos = data.listaUsuarios;
            console.log(this.datos);
                  },
                 err => console.error(err), 
                 () => console.log('getUsuarios completed') 
            );
    }

    receiveMessage($event: Cargo) {
        console.log("cargo:"+$event);
        this.cargo = $event;
        console.log("cargo:"+this.cargo);
      }

    borrarFila(cod: number) {
        this.usuarioService.eliminarUsuario(this.datos[cod].id).subscribe(data => { data.estado;
            console.log(data);
            this.actualizarDatos();
                    },
                    err => console.error(err), 
                    () => console.log('eliminar Usuario completed')
            );
    }

    editarFila(cod: number) {
        this.usuarioSelect = this.datos[cod];
        console.log(this.usuarioSelect);
        this.flagEditar = true;
    }

    nuevo(){
        this.usuarioSelect = new Usuario("",0, new Date());
        this.flagEditar = false;
    }
    
    agregar() {
        if(this.cargo.nombre == ''){
            this._snackBar.open("Debe seleccionar el Cargo!", "X");
        }else{
            let usuarioJson =
            {
                "nombre": this.usuarioSelect.nombre,
                "edad": this.usuarioSelect.edad,
                "cargo": this.cargo,
                "fechaIngreso": this.date.value
            };
            this.usuarioService.crearUsuario(usuarioJson).subscribe(data => { data.usuario;
                console.log(data);
                this.actualizarDatos();
                        },
                        err => console.error(err), 
                        () => console.log('crear Usuario completed')
                );
            this.usuarioSelect = new Usuario("", 0);
        }
    }

    editar() {
        let usuarioJson =
        {
            "id": this.usuarioSelect.id,
            "nombre": this.usuarioSelect.nombre,
            "edad": this.usuarioSelect.edad,
            "fechaIngreso": this.usuarioSelect.fechaIngreso
        };
        this.usuarioService.modificarUsuario(usuarioJson).subscribe(data => { data.usuario;
            console.log(data);
            this.actualizarDatos();
                    },
                    err => console.error(err), 
                    () => console.log('modificacion Usuario completed')
            );
        this.usuarioSelect = new Usuario("", 0);
    }

    actualizarDatos(){
        this.usuarioService.listarUsuarios().subscribe(data => { this.datos = data.listaUsuarios;
            console.log(this.datos);
                  },
                 err => console.error(err), 
                 () => console.log('getUsuarios completed') 
            );
    }
}

export class Usuario {
    constructor(public nombre: string, public edad: number, public fechaIngreso?: Date, public cargo?: Cargo, public id?: number) {
    }
}