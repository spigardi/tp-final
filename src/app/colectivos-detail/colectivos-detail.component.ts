import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-colectivos-detail',
  templateUrl: './colectivos-detail.component.html',
  styleUrls: ['./colectivos-detail.component.css']
})

export class ColectivosDetailComponent implements OnInit {
  colectivosForm!: FormGroup;
  colectivo: any;

  constructor(private formBuilder: FormBuilder,private http:HttpClient,private route: ActivatedRoute,
    private location: Location) { }

  

  ngOnInit(): void {
    this.colectivosForm = this.formBuilder.group({
      patente: ['', Validators.required],
      cantidadAsientos: ['', Validators.required],
      modelo: ['', Validators.required],
      marca: ['', Validators.required]
    });

    // Obtener el ID de la persona de la URL
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // Si hay un ID en la URL, cargar los datos de la persona
      this.loadColectivosData(id);
    }
    
  }

  onSubmit(): void {
    if (this.colectivosForm.valid) {
      // Aquí puedes guardar o actualizar la persona en la base de datos
      const id = this.route.snapshot.paramMap.get('id');
      if(id){
        this.editarColectivo(id);
      }else{
        this.crearColectivo();
      }

    }
  }
  // ...

  loadColectivosData(id: string): void {
    this.http.get('assets/colectivos.json').subscribe((data: any) => {
      const colectivos = data.find((res: any) => res.id == parseInt(id));
  
      if (colectivos) {
        // Establecer los valores de los controles del formulario con los datos de la persona
        this.colectivosForm.patchValue({
          id: colectivos.id,
          patente: colectivos.patente,
          cantidadAsientos: colectivos.cantidadAsientos,
          modelo: colectivos.modelo,
          marca: colectivos.marca
        });
      } else {
        console.log("no lo encuentra")
        
      }
    });

  }

  reiniciarForm(): void {
    // Reiniciar los valores del formulario a su estado inicial
    this.colectivosForm.reset();
  }

  crearColectivo(): void {
    this.http.post('http://localhost:3000/api/colectivos/agregar', this.colectivosForm.value, { observe: 'response' }).subscribe(
      response => {
        if (response.status === 200) {
          console.log('El colectivo se guardó exitosamente.');
          Swal.fire({
            title: '¡Éxito!',
            text: 'El colectivo se guardó exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.reiniciarForm();
        } else {
          console.log('Ocurrió un error al guardar el colectivo.');
        }
      },
      error => {
        console.log('Ocurrió un error en la solicitud HTTP.');
    }
    );
  }

  editarColectivo(id:string): void {
    this.http.put('http://localhost:3000/api/colectivos/editar/'+id, this.colectivosForm.value, { observe: 'response' }).subscribe(
      response => {
        if (response.status === 200) {
          console.log('El colectivo se editó exitosamente.');
          Swal.fire({
            title: '¡Éxito!',
            text: 'El colectivo se editó exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
        } else {
          console.log('Ocurrió un error al editar el colectivo.');
        }
      },
      error => {
        console.log('Ocurrió un error en la solicitud HTTP.');
    }
    );
  }

}