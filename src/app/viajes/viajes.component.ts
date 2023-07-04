import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Viaje } from 'src/interfaces/viaje.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css']
})
export class ViajesComponent {
  viajes: BehaviorSubject<Viaje[]> = new BehaviorSubject<Viaje[]>([]);

  dataSource: MatTableDataSource<Viaje>;

  displayedColumns: string[] = ['id', 'origen', 'destino', 'fecha','hora','lugarSalida','lugarDestino','horaSalidaEstimada','horaLlegadaEstimada','colectivo'];

  constructor(private http: HttpClient) {
    this.dataSource = new MatTableDataSource<Viaje>([]);
    this.viajes.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngOnInit() {
    this.loadTable();
  }

  borrarViaje(id:string): void {

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar este viaje?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete('http://localhost:3000/api/viajes/eliminar/' + id,  { observe: 'response' }).subscribe(
          response => {
            if (response.status === 200) {
              console.log('El viaje se eliminó exitosamente.');
              Swal.fire({
                title: '¡Éxito!',
                text: 'El viaje se eliminó exitosamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
              this.loadTable();
            } else {
              console.log('Ocurrió un error al eliminar el viaje.');
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
    this.http.get('assets/viajes.json').subscribe((data: any) => {
      console.log(data); // Aquí tienes acceso a los datos del archivo JSON
      this.viajes = data;
      this.viajes = data.map((viaje: any) => {
        return {
          ...viaje,
          fecha: new Date(viaje.fecha).toISOString().substring(0, 10)
        };
      });
    });
  }
}
