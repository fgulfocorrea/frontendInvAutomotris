import { Component, OnInit, ViewChild } from "@angular/core";
import { CargoService } from './cargo.service';
import { MatTable } from '@angular/material/table';

@Component({
    selector: 'app-cargo',
    templateUrl: 'cargo.component.html'

})

export class CargoComponent implements OnInit {

    title: string = 'Administrar Cargos'

    columnas: string[] = ['id', 'nombre', 'descripcion', 'estado', 'acciones'];
    
    id: number = 0;

    nombre: string = '';

    descripcion: string = '';

    estado: number = 0;

    cargoSelect: Cargo = new Cargo("","",0);

    datos:any;

    flagEditar: boolean = false;

    @ViewChild(MatTable) tabla1!: MatTable<Cargo>;

    borrarFila(cod: number) {
        this.cargoService.eliminarCargo(this.datos[cod].id).subscribe(data => { data.estado;
            console.log(data);
            this.actualizarDatos();
                    },
                    err => console.error(err), 
                    () => console.log('eliminar cargo completed')
            );
    }

    editarFila(cod: number) {
        this.cargoSelect = this.datos[cod];
        console.log(this.cargoSelect);
        this.flagEditar = true;
    }

    nuevo(){
        this.cargoSelect = new Cargo("", "", 1);
        this.flagEditar = false;
    }
    
    agregar() {
        let cargoJson =
        {
            "nombre": this.cargoSelect.nombre,
            "descripcion": this.cargoSelect.descripcion,
            "estado": 1
        };
        this.cargoService.crearCargo(cargoJson).subscribe(data => { data.cargo;
            console.log(data);
            this.actualizarDatos();
                    },
                    err => console.error(err), 
                    () => console.log('crear cargo completed')
            );
        this.cargoSelect = new Cargo("", "", 1);
    }

    editar() {
        let cargoJson =
        {
            "id": this.cargoSelect.id,
            "nombre": this.cargoSelect.nombre,
            "descripcion": this.cargoSelect.descripcion,
            "estado": 1
        };
        this.cargoService.modificarCargo(cargoJson).subscribe(data => { data.cargo;
            console.log(data);
            this.actualizarDatos();
                    },
                    err => console.error(err), 
                    () => console.log('modificacion cargo completed')
            );
        this.cargoSelect = new Cargo("", "", 1);
    }

    constructor(public cargoService: CargoService) {}

    ngOnInit() {
        this.cargoService.listarCargos().subscribe(data => { this.datos = data.listaCargos;
            console.log(this.datos);
                  },
                 err => console.error(err), 
                 () => console.log('getCargos completed') 
            );
    }

    actualizarDatos(){
        this.cargoService.listarCargos().subscribe(data => { this.datos = data.listaCargos;
            console.log(this.datos);
                  },
                 err => console.error(err), 
                 () => console.log('getCargos completed') 
            );
    }
}

export class Cargo {
    constructor(public nombre: string, public descripcion: string, public id?: number, public estado?: number) {
    }
}