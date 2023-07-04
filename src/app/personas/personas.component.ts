import { Component, ChangeDetectorRef} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Persona } from 'src/interfaces/persona.interface';
import Swal from 'sweetalert2';


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
    this.loadTable()
  }


  borrarPersona(id:number):void{
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar esta persona?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete('http://localhost:3000/api/personas/eliminar/' + id,  { observe: 'response' }).subscribe(
          response => {
            if (response.status === 200) {
              console.log('La persona se eliminó exitosamente.');
              Swal.fire({
                title: '¡Éxito!',
                text: 'La persona se eliminó exitosamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
              this.loadTable();
            } else {
              console.log('Ocurrió un error al eliminar la persona.');
            }
          },
          error => {
            console.log('Ocurrió un error en la solicitud HTTP.');
          }
        );
      } else {
        console.log("cancelado");
      }
    });
  }

  loadTable(){
    this.http.get('assets/personas.json').subscribe((data: any) => {
      console.log(data); // Aquí tienes acceso a los datos del archivo JSON
      this.personas = data;
    });
  }
}