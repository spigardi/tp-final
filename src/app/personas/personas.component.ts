import { Component, ChangeDetectorRef} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';

interface Persona {
  id : number;
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
  personas: BehaviorSubject<Persona[]> = new BehaviorSubject<Persona[]>([]);
  /*personas: Persona[] = [
    { nombre: "Alejandro", apellido: "Spigardi", edad: 32 },
    { nombre: "juan", apellido: "gomez", edad: 75 }
  ];*/
  nuevaPersona:Persona= {
    id : 0,
    nombre: '',
    apellido: '',
    edad: null
  };

  constructor(private changeDetectorRef: ChangeDetectorRef,private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get('assets/personas.json').subscribe((data: any) => {
      console.log(data); // Aquí tienes acceso a los datos del archivo JSON
      this.personas = data;
    });
  }

  
/*
  agregarPersona() {

    const persona: Persona = {
      id :  this.personas.getValue().length + 1,
      nombre: this.nuevaPersona.nombre,
      apellido: this.nuevaPersona.apellido,
      edad: this.nuevaPersona.edad,
      
    };
    const personasActuales = this.personas.getValue();
    personasActuales.push(persona);
    this.personas.next(personasActuales);

    this.changeDetectorRef.detectChanges();
    this.nuevaPersona.nombre = "";
    this.nuevaPersona.apellido ="";     
    this.nuevaPersona.edad =null;

    console.log(this.personas)
  }*/

  borrarPersona(id:number):void{
    console.log("borrar persona"+id)
  }
}