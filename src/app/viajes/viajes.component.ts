import { Component } from '@angular/core';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css']
})
export class ViajesComponent {
  viajes: any[] = [];
  nuevoViaje: any = {
    origen: '',
    destino: '',
    fecha: '',
    hora: ''
  };

  agregarViaje() {
    const viaje = {
      origen: this.nuevoViaje.origen,
      destino: this.nuevoViaje.destino,
      fecha: this.nuevoViaje.fecha,
      hora: this.nuevoViaje.hora
    };

    // Agregar lógica adicional si es necesario, como validaciones de datos

    this.viajes.push(viaje);

    // Reiniciar el objeto nuevoViaje para permitir la creación de nuevos viajes
    this.nuevoViaje.origen = '';
    this.nuevoViaje.destino = '';
    this.nuevoViaje.fecha = '';
    this.nuevoViaje.hora = '';
  }
}