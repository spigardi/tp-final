import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {
  personForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private http:HttpClient,private route: ActivatedRoute,
    private location: Location) { }

  

  ngOnInit(): void {
    this.personForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(0)]]
    });

    // Obtener el ID de la persona de la URL
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // Si hay un ID en la URL, cargar los datos de la persona
      this.loadPersonData(id);
    }
  }

  loadPersonData(id: string): void {
    this.http.get('assets/personas.json').subscribe((data: any) => {
      const person = data.find((res: any) => res.id == parseInt(id));
  
      if (person) {
        // Establecer los valores de los controles del formulario con los datos de la persona
        this.personForm.patchValue({
          id: person.id,
          nombre: person.nombre,
          apellido: person.apellido,
          edad: person.edad
        });
      } else {
        console.log("no lo encuentra")
        // Si no se encuentra la persona, redirigir a la página de inicio o mostrar un mensaje de error
        //this.location.back(); // Volver a la página anterior
      }
    });

  }


  onSubmit(): void {
    if (this.personForm.valid) {
      // Aquí puedes guardar o actualizar la persona en la base de datos
      const id = this.route.snapshot.paramMap.get('id');
      if(id){
        this.editarPersona(id);
      }else{
        this.crearPersona();
      }

    }
  }

  reiniciarForm(): void {
    // Reiniciar los valores del formulario a su estado inicial
    this.personForm.reset();
  }

  crearPersona(): void {
    this.http.post('http://localhost:3000/api/personas/agregar', this.personForm.value, { observe: 'response' }).subscribe(
      response => {
        if (response.status === 200) {
          console.log('La persona se guardó exitosamente.');
          alert('La persona se guardó exitosamente.');
          this.reiniciarForm();
        } else {
          console.log('Ocurrió un error al guardar la persona.');
        }
      },
      error => {
        console.log('Ocurrió un error en la solicitud HTTP.');
    }
    );
  }

  editarPersona(id:string): void {
    this.http.put('http://localhost:3000/api/personas/editar/'+id, this.personForm.value, { observe: 'response' }).subscribe(
      response => {
        if (response.status === 200) {
          console.log('La persona se editó exitosamente.');
          alert('La persona se editó exitosamente.');
        } else {
          console.log('Ocurrió un error al editar la persona.');
        }
      },
      error => {
        console.log('Ocurrió un error en la solicitud HTTP.');
    }
    );
  }
}
