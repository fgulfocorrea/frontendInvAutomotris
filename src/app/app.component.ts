import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  title: string = 'Inventario';
  numero: number = 0;

  sumar(){
    this.numero +=1;
  }

  restar(){
    this.numero -=1;
  }

  acumular(valor:number){
    this.numero += valor;
  }
}
