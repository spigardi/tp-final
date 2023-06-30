import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-viajes-detail',
  templateUrl: './viajes-detail.component.html',
  styleUrls: ['./viajes-detail.component.css']
})
export class ViajesDetailComponent implements OnInit {
  viajesForm!: FormGroup;
  viaje: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.viajesForm = this.formBuilder.group({
      origen: ['', Validators.required],
      destino: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      lugarSalida: ['', Validators.required],
      lugarDestino: ['', Validators.required],
      horaSalidaEstimada: ['', Validators.required],
      horaLlegadaEstimada: ['', Validators.required]
    });

    // Obtener el ID del viaje de la URL
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // Si hay un ID en la URL, cargar los datos del viaje
      this.loadViajeData(id);
    }
  }

  onSubmit(): void {
    if (this.viajesForm.valid) {
      // Aquí puedes guardar o actualizar el viaje en la base de datos
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.editarViaje(id);
      } else {
        this.crearViaje();
      }
    }
  }

  loadViajeData(id: string): void {
    this.http.get('assets/viajes.json').subscribe((data: any) => {
      const viaje = data.find((res: any) => res.id == parseInt(id));

      if (viaje) {
        // Establecer los valores de los controles del formulario con los datos del viaje
        this.viajesForm.patchValue({
          origen: viaje.origen,
          destino: viaje.destino,
          fecha: viaje.fecha,
          hora: viaje.hora,
          lugarSalida: viaje.lugarSalida,
          lugarDestino: viaje.lugarDestino,
          horaSalidaEstimada: viaje.horaSalidaEstimada,
          horaLlegadaEstimada: viaje.horaLlegadaEstimada
        });
      } else {
        console.log("No se encontró el viaje");
      }
    });
  }

  reiniciarForm(): void {
    // Reiniciar los valores del formulario a su estado inicial
    this.viajesForm.reset();
  }

  crearViaje(): void {
    this.http.post('http://localhost:3000/api/viajes/agregar', this.viajesForm.value, { observe: 'response' }).subscribe(
      response => {
        if (response.status === 200) {
          console.log('El viaje se guardó exitosamente.');
          alert('El viaje se guardó exitosamente.');
          this.reiniciarForm();
        } else {
          console.log('Ocurrió un error al guardar el viaje.');
        }
      },
      error => {
        console.log('Ocurrió un error en la solicitud HTTP.');
      }
    );
  }

  editarViaje(id: string): void {
    this.http.put('http://localhost:3000/api/viaje/editar/' + id, this.viajesForm.value, { observe: 'response' }).subscribe(
      response => {
        if (response.status === 200) {
          console.log('El viaje se editó exitosamente.');
          alert('El viaje se editó exitosamente.');
        } else {
          console.log('Ocurrió un error al editar el viaje.');
        }
      },
      error => {
        console.log('Ocurrió un error en la solicitud HTTP.');
      }
    );
  }
}