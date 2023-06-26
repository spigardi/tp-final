import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonasComponent } from './personas/personas.component';
import { ColectivosComponent } from './colectivos/colectivos.component';
import { ViajesComponent } from './viajes/viajes.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'personas', component: PersonasComponent },
  { path: 'colectivos', component: ColectivosComponent },
  { path: 'viajes', component: ViajesComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
