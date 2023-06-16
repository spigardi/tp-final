import { Component } from '@angular/core';

@Component({
  selector: 'app-colectivos',
  templateUrl: './colectivos.component.html',
  styleUrls: ['./colectivos.component.css']
})
export class ColectivosComponent {
  colectivos: Colectivo[] = [];
  nuevoColectivo: Colectivo = {
    patente: '',
    cantidadAsientos: null,
    modelo: {
      nombre: '',
      marca: ''
    }
  };

  crearColectivo() {
    // Agregar lógica para guardar el nuevo colectivo en la lista de colectivos
    this.colectivos.push(this.nuevoColectivo);

    // Reiniciar el objeto nuevoColectivo para permitir la creación de nuevos colectivos
    this.reiniciarNuevoColectivo();
  }

  reiniciarNuevoColectivo() {
    this.nuevoColectivo = {
      patente: '',
      cantidadAsientos:null,
      modelo: {
        nombre: '',
        marca: ''
      }
    };
  }
}

interface Colectivo {
  patente: string;
  cantidadAsientos: number | null;
  modelo: ModeloColectivo;
}

interface ModeloColectivo {
  nombre: string;
  marca: string;
}