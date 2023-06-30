import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonasComponent } from './personas/personas.component';
import { ColectivosComponent } from './colectivos/colectivos.component';
import { ViajesComponent } from './viajes/viajes.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { ColectivosDetailComponent } from './colectivos-detail/colectivos-detail.component';
import { ViajesDetailComponent } from './viajes-detail/viajes-detail.component';
const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'personas', component: PersonasComponent },
  { path: 'colectivos', component: ColectivosComponent },
  { path: 'viajes', component: ViajesComponent },
  { path: 'personas/agregar', component: PersonDetailComponent },
  { path: 'personas/editar/:id', component: PersonDetailComponent },
  { path: 'colectivos/agregar', component: ColectivosDetailComponent },
  { path: 'colectivos/editar/:id', component: ColectivosDetailComponent },
  { path: 'viajes/agregar', component: ViajesDetailComponent },
  { path: 'viajes/editar/:id', component: ViajesDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
