import { Component,OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
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
    this.http.get('assets/colectivos.json').subscribe((data: any) => {
      console.log(data); // Aquí tienes acceso a los datos del archivo JSON
      this.colectivos=data;
    });
  }

  borrarColectivo(id:string): void {
    /*
    this.http.delete('assets/colectivos.json' + this.colectivo.id).subscribe(
      (response: any) => {
        console.log('El colectivo se eliminó exitosamente.');
        alert('El colectivo se eliminó exitosamente.');
        this.router.navigate(['/colectivos']);
      },
      (error: any) => {
        console.log('Ocurrió un error al eliminar el colectivo.');
      }
    );*/
  }
}