import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Viaje } from 'src/interfaces/viaje.interface';
import { Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Persona } from 'src/interfaces/persona.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pasajeros',
  templateUrl: './pasajeros.component.html',
  styleUrls: ['./pasajeros.component.css']
})
export class PasajerosComponent implements OnInit{
  personas: Persona[] = [];
  pasajeros: Persona[] = [];//BehaviorSubject<Persona[]> = new BehaviorSubject<Persona[]>([]);
  nuevoPasajeroForm!: FormGroup;
  @Input() viaje : Viaje ={
    id: 0,
    origen: "",
    destino: "",
    fecha: "",
    hora: "",
    lugarSalida: "",
    lugarDestino: "",
    horaSalidaEstimada: "",
    horaLlegadaEstimada: "",
    colectivo: "",
    pasajeros: this.pasajeros
  };
  @Output() actualizar = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loadPersonas();
    this.nuevoPasajeroForm = this.formBuilder.group({
      pasajero: ['', Validators.required]
    });
  }

  loadPersonas():void {
    //leer total de personas del json
    this.http.get('assets/personas.json').subscribe((data: any) => {
      console.log(data); // Aquí tienes acceso a los datos del archivo JSON
      this.personas = data;
    });
  }

  onSubmit(): void {
    if (this.nuevoPasajeroForm.valid) {
      const personId = this.nuevoPasajeroForm.controls["pasajero"].value;
      console.log(this.viaje.pasajeros.find((p:any)=>p.id == personId))
      //revisar si la persona ya esta en el viaje
      if(!this.viaje.pasajeros.find((p:any)=>p.id == personId)){
        //agrego pasajero 
        this.guardarPasajero();
        
        
      }else{
        Swal.fire({
          title: '¡Advertencia!',
          text: 'La persona ya se encuentra incluida en este viaje.',
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });
      }
      
    }
  }

  guardarPasajero(): void{
    const personId = this.nuevoPasajeroForm.controls["pasajero"].value;
    const viajeId = this.viaje.id;
    this.http.post('http://localhost:3000/api/viajes/pasajeros/agregar/'+viajeId+'/'+personId, this.nuevoPasajeroForm.value, { observe: 'response' }).subscribe(
      response => {
        if (response.status === 200) {
          console.log('El pasajero se guardó exitosamente.');
          console.log(response.body);
          Swal.fire({
            title: '¡Éxito!',
            text: 'El pasajero se guardó exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          //actualizo tabla
          this.actualizar.emit();
          //limpio form
          this.nuevoPasajeroForm.reset();
        } else {
          console.log('Ocurrió un error al guardar al pasajero.');
        }
      },
      error => {
        console.log('Ocurrió un error en la solicitud HTTP.');
    }
    );
  }

  borrarPasajero(id:string):void {
    console.log("borrar persona "+id+"de viaje "+this.viaje.id);
    this.http.delete('http://localhost:3000/api/viajes/pasajeros/eliminar/'+this.viaje.id+'/'+id, { observe: 'response' }).subscribe(
      response => {
        if (response.status === 200) {
          console.log('El pasajero se eliminó exitosamente.');
          Swal.fire({
            title: '¡Éxito!',
            text: 'El pasajero se eliminó exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          //actualizo tabla
          this.actualizar.emit();

          //limpio form
          this.nuevoPasajeroForm.reset();
        } else {
          console.log('Ocurrió un error al eliminar al pasajero.');
        }
      },
      error => {
        console.log('Ocurrió un error en la solicitud HTTP.');
    }
    );
  }

}
