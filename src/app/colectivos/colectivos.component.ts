import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
interface Colectivo {
  id: number;
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
    id : 0,
    patente: '',
    cantidadAsientos: null,
    modelo: {
      nombre: '',
      marca: ''
    }
  };
  dataSource: MatTableDataSource<Colectivo>;

  displayedColumns: string[] = ['patente', 'cantidadAsientos', 'modeloNombre', 'modeloMarca'];

  constructor(private http: HttpClient) {
    this.dataSource = new MatTableDataSource<Colectivo>([]);
    this.colectivos.subscribe(data => {
      this.dataSource.data = data;
    });

  }

  ngOnInit() {
    this.http.get('assets/colectivos.json').subscribe((data: any) => {
      console.log(data); // Aquí tienes acceso a los datos del archivo JSON
      this.colectivos=data;
    });
  }

  crearColectivo() {
    const colectivo: Colectivo = {
      id : this.colectivos.getValue().length + 1 ,
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
      id: 0 ,
      patente: '',
      cantidadAsientos: null,
      modelo: {
        nombre: '',
        marca: ''
      }
    };
  }
}