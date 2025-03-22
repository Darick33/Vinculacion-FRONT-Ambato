import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Mascotas } from 'src/app/interfaces/mascotas.interface';
import { MascotasService } from 'src/app/services/mascotas.service';
import { MascotasFormComponent } from '../mascotas/mascotas-form/mascotas-form.component';
import { Preguntas } from 'src/app/interfaces/preguntas.interface';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { PreguntasFormComponent } from './preguntas-form/preguntas-form.component';

@Component({
  selector: 'app-preguntas-frecuentes',
  templateUrl: './preguntas-frecuentes.component.html',
  styleUrl: './preguntas-frecuentes.component.scss'
})
export class PreguntasFrecuentesComponent {
displayedColumns: string[] = ['pregunta',  'respuesta', 'actions'];
  dataSource = new MatTableDataSource<any>();
  totalPreguntas: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  filterValue: string = ''; 
  preguntas: Preguntas[] | undefined;

  private subscriptions: Subscription = new Subscription(); 
  
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
  public dialog: MatDialog, private preguntasService: PreguntasService,
  

  ) {}
  /**
   * Método de inicialización del componente.
   * Se encarga de cargar la lista inicial de Pokémon.
   */
  
  ngOnInit(): void {
    // this.loadpreguntas();
    this.loadMascotas();

    if (this.paginator) {
      this.subscriptions.add(
        this.paginator.page.subscribe(() => this.onPageChange({ pageIndex: this.paginator!.pageIndex, pageSize: this.pageSize, length: this.totalPreguntas }))
      );
    }

    if (this.sort) {
      this.subscriptions.add(
        this.sort.sortChange.subscribe(() => {
          this.dataSource.sort = this.sort!;
        })
      );
    }
  }
  
   /**
   * Se ejecuta cuando el componente se destruye para evitar memory leaks.
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); 
  }
  ViewWillEnter() {
    this.loadMascotas();

    if (this.paginator) {
      this.subscriptions.add(
        this.paginator.page.subscribe(() => this.onPageChange({ pageIndex: this.paginator!.pageIndex, pageSize: this.pageSize, length: this.totalPreguntas }))
      );
    }

    if (this.sort) {
      this.subscriptions.add(
        this.sort.sortChange.subscribe(() => {
          this.dataSource.sort = this.sort!;
        })
      );
    }
  }


   /**
   * Carga los Pokémon desde la API.
   * @param page Número de página
   */
  // loadpreguntas(page: number = 1, filter: string = ''): void {
  //   const subscription = this.preguntaService.getpreguntas(page, this.pageSize).subscribe(response => {
  //     this.totalPreguntas = response.count;
  //     this.allpreguntas = response.results; 
  //     this.applyClientFilter(); 
  //   });

  //   this.subscriptions.add(subscription); 
  // }
  loadMascotas(page: number = 1, filter: string = ''): void {
    const subscription = this.preguntasService.getPreguntas(page, this.pageSize).subscribe(response => {
      this.totalPreguntas = response.totalCount;
      this.preguntas = response.items;
      this.applyClientFilter();
      console.log(this.preguntas)
    });

    this.subscriptions.add(subscription);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.loadMascotas(this.pageIndex + 1, this.filterValue);  
  }

  applyFilter(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.applyClientFilter();
  }

  applyClientFilter(): void {
    const filterValue = this.filterValue.trim().toLowerCase();
    const filteredpreguntas = this.preguntas 
      ? this.preguntas.filter(pregunta =>
          pregunta.pregunta.toLowerCase().includes(filterValue)
        )
      : [];

    this.dataSource.data = filteredpreguntas;
    if (this.paginator) {
      this.paginator.pageIndex = this.pageIndex; 
    }
  }
  OpenAdopciones() {
    const dialogRef = this.dialog.open(PreguntasFormComponent, {
      data: { id:'' } // Pasamos el ID

    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadMascotas();
    });
  }
  OpenAdopcionesEdit(id: number) {
    const dialogRef = this.dialog.open(PreguntasFormComponent, {
      data: { id: id } // Pasamos el ID
    });
  
    dialogRef.afterClosed().subscribe(() => {
      console.log("Modal cerrado");
      this.loadMascotas();
    });
  }
  delete(id: string){
    this.subscriptions.add(
      this.preguntasService.deletePregunta(id).subscribe({
        next: data => {
          console.log('Datos recibidos:', data);
          this.loadMascotas();
        },
        error: error => {
          console.log('Error en la peticion', 'error');
        },
        complete: () => {
        }
      })
    )
  }
}
