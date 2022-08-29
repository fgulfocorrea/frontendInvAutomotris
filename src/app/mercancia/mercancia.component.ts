import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-mercancia',
    templateUrl: 'mercancia.component.html'

})

export class MercanciaComponent implements OnInit{

    title: string = 'Inventario';

    id: number = 0;

    producto: string = '';

    cantidad: number = 0;

    fechaIngreso: Date = new Date();

    fechaModificacion: Date = new Date();


    lista:string[]=["hola","que","tal", "estas"];

    constructor() { }

    ngOnInit() {

    }

}