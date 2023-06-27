import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {
  personForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private http:HttpClient) { }

  

  ngOnInit(): void {
    this.personForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    console.log("hola")
    if (this.personForm.valid) {
      // Aquí puedes guardar o actualizar la persona en la base de datos
      console.log(this.personForm.value);
      this.http.post('http://localhost:3000/api/personas', this.personForm.value, { observe: 'response' }).subscribe(
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
  }

  reiniciarForm(): void {
    // Reiniciar los valores del formulario a su estado inicial
    this.personForm.reset();
  }
}
