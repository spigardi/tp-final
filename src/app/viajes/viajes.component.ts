import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Viaje } from 'src/interfaces/viaje.interface';
import { Persona } from 'src/interfaces/persona.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css']
})
export class ViajesComponent {
  viajes: BehaviorSubject<Viaje[]> = new BehaviorSubject<Viaje[]>([]);
  pasajeros: Persona[] = [];
  showPopup: boolean = false;
  selectedViaje : Viaje ={
    id: 0,
    origen: "",
    destino: "",
    fecha: "",
    hora: "",
    lugarSalida: "",
    lugarDestino: "",
    horaSalidaEstimada: "",
    horaLlegadaEstimada: "",
    colectivo: "",
    pasajeros: this.pasajeros
  };
  selectedIndex : number = 0;

  dataSource: MatTableDataSource<Viaje>;
  //dataSourcePasajeros: MatTableDataSource<Persona>;

  displayedColumns: string[] = ['id', 'origen', 'destino', 'fecha','hora','lugarSalida','lugarDestino','horaSalidaEstimada','horaLlegadaEstimada','colectivo'];

  constructor(private http: HttpClient) {
    this.dataSource = new MatTableDataSource<Viaje>([]);
    this.viajes.subscribe(data => {
      this.dataSource.data = data;
    });
    /*
    this.dataSourcePasajeros = new MatTableDataSource<Persona>([]);
    this.pasajeros.subscribe(data => {
      this.dataSourcePasajeros.data = data;
    });*/
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
      let viajesList = data;
      viajesList = data.map((viaje: any) => {
        return {
          ...viaje,
          fecha: new Date(viaje.fecha).toISOString().substring(0, 10)
        };
      });

      this.selectedViaje = data[this.selectedIndex];
      //this.pasajeros = this.selectedViaje.pasajeros;
      this.viajes.next(viajesList);
    });
  }

  verPasajeros(id: string): void {
    const viajesActuales = this.viajes.value;
    const viajeActual = viajesActuales.find((viaje:any)=>viaje.id == parseInt(id));
    const viajeActualIndex = viajesActuales.findIndex((viaje:any)=>viaje.id == parseInt(id));
    console.log(viajeActual);
    if(viajeActual){
      this.selectedViaje = viajeActual;
      this.selectedIndex = viajeActualIndex;
      //this.pasajeros = viajeActual.pasajeros;
      console.log(viajeActual);
    }
    this.showPopup = true;
  }
  cerrarPopup():void {
    this.showPopup = false;
  }
  
}
