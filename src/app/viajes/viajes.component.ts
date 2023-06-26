import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';


interface Viaje {
  id: number;
  origen: string;
  destino: string;
  fecha: string;
  hora: string;
  lugarSalida: string;
  lugarDestino: string;
  horaSalidaEstimada: string;
  horaLlegadaEstimada: string;
}

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css']
})
export class ViajesComponent {
  viajes: BehaviorSubject<Viaje[]> = new BehaviorSubject<Viaje[]>([]);
  nuevoViaje: Viaje = {
    id:0,
    origen: '',
    destino: '',
    fecha: '',
    hora: '',
    lugarSalida: '',
    lugarDestino: '',
    horaSalidaEstimada: '',
    horaLlegadaEstimada: ''
  };

  dataSource: MatTableDataSource<Viaje>;

  displayedColumns: string[] = ['id', 'origen', 'destino', 'fecha','hora','lugarSalida','lugarDestino','horaSalidaEstimada','horaLlegadaEstimada'];

  constructor() {
    this.dataSource = new MatTableDataSource(this.viajes.getValue());
    this.viajes.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  agregarViaje() {  // Cambio de nombre: crearViaje() -> agregarViaje()
    const viaje: Viaje = {
      id:0,
      origen: this.nuevoViaje.origen,
      destino: this.nuevoViaje.destino,
      fecha: this.nuevoViaje.fecha,
      hora: this.nuevoViaje.hora,
      lugarSalida: this.nuevoViaje.lugarSalida,
      lugarDestino: this.nuevoViaje.lugarDestino,
      horaSalidaEstimada: this.nuevoViaje.horaSalidaEstimada,
      horaLlegadaEstimada: this.nuevoViaje.horaLlegadaEstimada
    };

    const viajesActuales = this.viajes.getValue();
    viajesActuales.push(viaje);
    this.viajes.next(viajesActuales);
    this.dataSource.data = this.viajes.getValue();
    this.reiniciarNuevoViaje();

   
  }

  reiniciarNuevoViaje() {
    this.nuevoViaje = {
      id: 0,
      origen: '',
      destino: '',
      fecha:"",
      hora:"",
      lugarSalida:"",
      lugarDestino:"",
      horaSalidaEstimada:"",
      horaLlegadaEstimada:"",
      
    };
  }
}
