import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CargoComponent } from './cargo/cargo.component';
import { MercanciaComponent } from './mercancia/mercancia.component';
import { UsuarioSelectComponent } from './usuario/usuario-select.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { MatTableModule } from '@angular/material/table';
import {FormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { CargoSelectComponent } from './cargo/cargo-select.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const rutas: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cargos', component: CargoComponent },
  { path: 'usuarios', component: UsuarioComponent },
  { path: 'mercancias', component: MercanciaComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CargoComponent,
    MercanciaComponent,
    UsuarioComponent,
    UsuarioSelectComponent,
    CargoSelectComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    RouterModule.forRoot(rutas)
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[

  ]
})
export class AppModule { }
