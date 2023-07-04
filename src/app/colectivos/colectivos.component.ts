import { Component,OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

interface Colectivo {
  id: number;
  patente: string;
  cantidadAsientos: number | null;
  modelo: string;
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
    modelo: '',
    marca: ''
  };
  dataSource: MatTableDataSource<Colectivo>;

  displayedColumns: string[] = ['patente', 'cantidadAsientos', 'modeloNombre', 'modeloMarca'];

  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router)
     {
    this.dataSource = new MatTableDataSource<Colectivo>([]);
    this.colectivos.subscribe(data => {
      this.dataSource.data = data;
    });

  }

  ngOnInit(): void {
    this.loadTable();
  }

  borrarColectivo(id:string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar este colectivo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete('http://localhost:3000/api/colectivos/eliminar/' + id,  { observe: 'response' }).subscribe(
          response => {
            if (response.status === 200) {
              console.log('El colectivo se eliminó exitosamente.');
              Swal.fire({
                title: '¡Éxito!',
                text: 'El colectivo se eliminó exitosamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
              this.loadTable();
            } else {
              console.log('Ocurrió un error al eliminar el colectivo.');
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
    this.http.get('assets/colectivos.json').subscribe((data: any) => {
      console.log(data); // Aquí tienes acceso a los datos del archivo JSON
      this.colectivos=data;
    });
  }
}