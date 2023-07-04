import { Persona } from "./persona.interface";

export interface Viaje {
    id: number;
    origen: string;
    destino: string;
    fecha: string;
    hora: string;
    lugarSalida: string;
    lugarDestino: string;
    horaSalidaEstimada: string;
    horaLlegadaEstimada: string;
    colectivo: string;
    pasajeros:Persona[];
  }