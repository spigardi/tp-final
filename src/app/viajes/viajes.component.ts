import { Component } from '@angular/core';

interface Viaje {
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
  viajes: Viaje[] = [];
  nuevoViaje: Viaje = {
    origen: '',
    destino: '',
    fecha: '',
    hora: '',
    lugarSalida: '',
    lugarDestino: '',
    horaSalidaEstimada: '',
    horaLlegadaEstimada: ''
  };

  agregarViaje() {  // Cambio de nombre: crearViaje() -> agregarViaje()
    const viaje: Viaje = {
      origen: this.nuevoViaje.origen,
      destino: this.nuevoViaje.destino,
      fecha: this.nuevoViaje.fecha,
      hora: this.nuevoViaje.hora,
      lugarSalida: this.nuevoViaje.lugarSalida,
      lugarDestino: this.nuevoViaje.lugarDestino,
      horaSalidaEstimada: this.nuevoViaje.horaSalidaEstimada,
      horaLlegadaEstimada: this.nuevoViaje.horaLlegadaEstimada
    };

    this.viajes.push(viaje);
    this.nuevoViaje.origen = '';
    this.nuevoViaje.destino = '';
    this.nuevoViaje.fecha = '';
    this.nuevoViaje.hora = '';
    this.nuevoViaje.lugarSalida = '';
    this.nuevoViaje.lugarDestino = '';
    this.nuevoViaje.horaSalidaEstimada = '';
    this.nuevoViaje.horaLlegadaEstimada = '';
  }
}