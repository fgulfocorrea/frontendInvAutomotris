import { Component, OnInit, Output, EventEmitter} from "@angular/core";
import { Cargo } from "./cargo.component";
import { CargoService } from './cargo.service';

@Component({
  selector: 'app-cargo-select',
  templateUrl: './cargo-select.component.html'
})
export class CargoSelectComponent implements OnInit{

  cargos: any

  selectedValue: Cargo = new Cargo("","",0);

  @Output() messageEvent = new EventEmitter<Cargo>();

  constructor(public cargoService: CargoService){}

  ngOnInit(): void {
    this.cargoService.listarCargos().subscribe(data => { this.cargos = data.listaCargos;
        console.log(this.cargos);
              },
             err => console.error(err), 
             () => console.log('getCargos completed') 
        );
  }
  sendSelectCargo() {
    console.log(this.selectedValue);
    this.messageEvent.emit(this.selectedValue);
  }
}