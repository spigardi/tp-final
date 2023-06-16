import { Component } from '@angular/core';

@Component({
  selector: 'app-colectivos',
  templateUrl: './colectivos.component.html',
  styleUrls: ['./colectivos.component.css']
})
export class ColectivosComponent {
  colectivos: any[] = [];
  nuevoColectivo: any = {
    patente: '',
    cantidadAsientos: 0,
    modelo: {
      nombre: '',
      marca: ''
    }
  };

  crearColectivo() {
    // Agregar lógica para guardar el nuevo colectivo en la lista de colectivos
    this.colectivos.push(this.nuevoColectivo);

    // Reiniciar el objeto nuevoColectivo para permitir la creación de nuevos colectivos
    this.nuevoColectivo = {
      patente: '',
      cantidadAsientos: 0,
      modelo: {
        nombre: '',
        marca: ''
      }
    };
  }

  reiniciarNuevoColectivo() {
    this.nuevoColectivo = {
      patente: '',
      cantidadAsientos: 0,
      modelo: {
        nombre: '',
        marca: ''
      }
    };
  }
}