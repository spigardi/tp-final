import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

interface Persona {
  nombre: string;
  apellido: string;
  edad: number|null;
}

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent {
  personas: Persona[] = [];
  // personaForm: FormGroup;
  nuevaPersona:Persona= {
    nombre: '',
    apellido: '',
    edad: null
  };

  /*constructor(private formBuilder: FormBuilder) {
    this.personaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: [0, [Validators.required, Validators.min(0)]]
    });
  }*/

  agregarPersona() {
    const persona: Persona = {
      nombre: this.nuevaPersona.nombre,
      apellido: this.nuevaPersona.apellido,
      edad: this.nuevaPersona.edad,
      
    };
    this.personas.push(persona);
    this.nuevaPersona.nombre = "";
    this.nuevaPersona.apellido ="";     
    this.nuevaPersona.edad =null;

    
  }
}