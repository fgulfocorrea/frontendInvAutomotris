import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { MatTable } from '@angular/material/table';
import { Cargo } from "../cargo/cargo.component";
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { MercanciaService } from "./mercancia.service";
import { Usuario } from "../usuario/usuario.component";

@Component({
    selector: 'app-mercancia',
    templateUrl: 'mercancia.component.html'

})

export class MercanciaComponent implements OnInit{

    cargoSelect: Cargo = new Cargo("","",0);

    title: string = 'Administracion de Mercancias'

    columnas: string[] = ['id', 'producto', 'cantidad', 'fechaIngreso', 'fechaModificacion', 'usuario', 'usuarioModificacion', 'acciones'];

    date = new FormControl(new Date());

    id: number = 0;

    nombre: string = '';

    edad: number = 0;

    usuario: Usuario = new Usuario("",0);

    mercanciaSelect: Mercancia = new Mercancia("",0);

    datos:any;

    flagEditar: boolean = false;

    @ViewChild(MatTable) tabla1!: MatTable<Mercancia>;

    constructor(public mercanciaService: MercanciaService, private _snackBar: MatSnackBar) {}

    ngOnInit() {
        this.mercanciaService.listarMercancias().subscribe(data => { this.datos = data.listaMercancias;
            console.log(this.datos);
                  },
                 err => console.error(err), 
                 () => console.log('getMercancia completed') 
            );
    }

    receiveMessage($event: Usuario) {
        console.log("usuario:"+$event);
        this.usuario = $event;
        console.log("usuario:"+this.usuario);
      }

    borrarFila(cod: number) {
        this.mercanciaService.eliminarMercancia(this.datos[cod].id).subscribe(data => { data.estado;
            console.log(data);
            this.actualizarDatos();
                    },
                    err => console.error(err), 
                    () => console.log('eliminar Mercancia completed')
            );
    }

    editarFila(cod: number) {
        this.mercanciaSelect = this.datos[cod];
        console.log(this.mercanciaSelect);
        this.flagEditar = true;
    }

    nuevo(){
        this.mercanciaSelect = new Mercancia("",0);
        this.flagEditar = false;
    }
    
    agregar() {
        if(this.usuario.nombre == ''){
            this._snackBar.open("Debe seleccionar el Usuario!", "X");
        }else{
            let mercanciaJson =
            {
                "producto": this.mercanciaSelect.producto,
                "cantidad": this.mercanciaSelect.cantidad,
                "usuario": this.usuario,
                "fechaIngreso": this.date.value
            };
            this.mercanciaService.crearMercancia(mercanciaJson).subscribe(data => { data.mercancia;
                console.log(data);
                this.actualizarDatos();
                        },
                        err => console.error(err), 
                        () => console.log('crear Mercancia completed')
                );
            this.mercanciaSelect = new Mercancia("", 0);
        }
    }

    editar() {
        let mercanciaJson =
        {
            "id": this.mercanciaSelect.id,
            "producto": this.mercanciaSelect.producto,
            "cantidad": this.mercanciaSelect.cantidad,
            "fechaIngreso": this.mercanciaSelect.fechaIngreso,
            "fechaModificacion": this.mercanciaSelect.fechaModificacion,
            "usuario": this.usuario,
            "usuarioModificacion": this.mercanciaSelect.usuarioModificacion
        };
        this.mercanciaService.modificarMercancia(mercanciaJson).subscribe(data => { data.mercancia;
            console.log(data);
            this.actualizarDatos();
                    },
                    err => console.error(err), 
                    () => console.log('modificacion Mercancia completed')
            );
        this.mercanciaSelect = new Mercancia("", 0);
    }

    actualizarDatos(){
        this.mercanciaService.listarMercancias().subscribe(data => { this.datos = data.listaMercancias;
            console.log(this.datos);
                  },
                 err => console.error(err), 
                 () => console.log('getMercancia completed') 
            );
    }
}

export class Mercancia {
    constructor(public producto: string, public cantidad: number, public fechaIngreso?: Date, public fechaModificacion?: Date, public usuaio?: Usuario, public usuarioModificacion?: Usuario, public id?: number) {
    }
}