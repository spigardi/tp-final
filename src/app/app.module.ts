import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonasComponent } from './personas/personas.component';
import { ColectivosComponent } from './colectivos/colectivos.component';
import { ViajesComponent } from './viajes/viajes.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { ColectivosDetailComponent } from './colectivos-detail/colectivos-detail.component';
import { ViajesDetailComponent } from './viajes-detail/viajes-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { PasajerosComponent } from './pasajeros/pasajeros.component';
@NgModule({
  declarations: [
    AppComponent,
    PersonasComponent,
    ColectivosComponent,
    ViajesComponent,
    PersonDetailComponent,
    ColectivosDetailComponent,
    ViajesDetailComponent,
    PasajerosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    HttpClientModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }