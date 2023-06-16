import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';

interface Colectivo {
  patente: string;
  cantidadAsientos: number | null;
  modelo: ModeloColectivo;
}

interface ModeloColectivo {
  nombre: string;
  marca: string;
}

@Component({
  selector: 'app-colectivos',
  templateUrl: './colectivos.component.html',
  styleUrls: ['./colectivos.component.css']
})
export class ColectivosComponent {
  colectivos: BehaviorSubject<Colectivo[]> = new BehaviorSubject<Colectivo[]>([]);
  nuevoColectivo: Colectivo = {
    patente: '',
    cantidadAsientos: null,
    modelo: {
      nombre: '',
      marca: ''
    }
  };
  dataSource: MatTableDataSource<Colectivo>;

  displayedColumns: string[] = ['patente', 'cantidadAsientos', 'modeloNombre', 'modeloMarca'];

  constructor() {
    this.dataSource = new MatTableDataSource<Colectivo>([]);
    this.colectivos.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  crearColectivo() {
    const colectivo: Colectivo = {
      patente: this.nuevoColectivo.patente,
      cantidadAsientos: this.nuevoColectivo.cantidadAsientos,
      modelo: {
        nombre: this.nuevoColectivo.modelo.nombre,
        marca: this.nuevoColectivo.modelo.marca
      }
    };
    const colectivosActuales = this.colectivos.getValue();
    colectivosActuales.push(colectivo);
    this.colectivos.next(colectivosActuales);
    this.reiniciarNuevoColectivo();
  }

  reiniciarNuevoColectivo() {
    this.nuevoColectivo = {
      patente: '',
      cantidadAsientos: null,
      modelo: {
        nombre: '',
        marca: ''
      }
    };
  }
}