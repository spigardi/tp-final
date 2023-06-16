import { Component } from '@angular/core';

interface Persona {
  nombre: string;
  apellido: string;
  edad: number | null;
}

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent {
  personas: Persona[] = [];
  nuevaPersona: Persona = { nombre: '', apellido: '', edad: null };

  agregarPersona() {
    this.personas.push(this.nuevaPersona);
    this.nuevaPersona = { nombre: '', apellido: '', edad: null };
  }
}