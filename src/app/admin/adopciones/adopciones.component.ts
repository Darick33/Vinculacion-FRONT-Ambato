import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PokemonService } from 'src/app/services/pokemmon.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Mascotas } from 'src/app/interfaces/mascotas.interface';
import { AdopcionesFormComponent } from 'src/app/public/adopciones/adopciones.component';
import { AdopcionesService } from 'src/app/services/adopciones.service';
import { Adopcion } from 'src/app/interfaces/adopciones.interface';
import { MascotasService } from 'src/app/services/mascotas.service';
import { TramitesService } from 'src/app/services/tramites.service';
import { Tramite } from 'src/app/interfaces/tramites.interface';
import { forkJoin } from 'rxjs';
import { AdopcionesInformationComponent } from './adopciones-information/adopciones-information.component';

@Component({
  selector: 'app-adopciones',
  templateUrl: './adopciones.component.html',
  styleUrl: './adopciones.component.scss'
})
export class AdopcionesComponent {
 displayedColumns: string[] = ['nombre',  'edad', 'adoptante', 'actions'];
  dataSource = new MatTableDataSource<any>();
  totalMascotas: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  filterValue: string = ''; 
  adopciones: Adopcion[] | undefined;
  tramites: Tramite[]   = [];
  mascotas: Mascotas[] = [];
  adocionesInfo: { mascota: Mascotas, tramite: Tramite }[] = [];

  private subscriptions: Subscription = new Subscription(); 
  
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private pokemonService: PokemonService,
  public dialog: MatDialog, private adopcionesService: AdopcionesService, private mascotasService: MascotasService, private tramitesService: TramitesService,
  

  ) {}
  /**
   * Método de inicialización del componente.
   * Se encarga de cargar la lista inicial de Pokémon.
   */
  
  ngOnInit(): void {
    // this.loadPokemons();
    this.loadMascotas();

    if (this.paginator) {
      this.subscriptions.add(
        this.paginator.page.subscribe(() => this.onPageChange({ pageIndex: this.paginator!.pageIndex, pageSize: this.pageSize, length: this.totalMascotas }))
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
  infoMascotas(){

  }
  
   /**
   * Se ejecuta cuando el componente se destruye para evitar memory leaks.
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); 
  }
  ViewWillEnter() {
    this.adocionesInfo = []
    this.loadMascotas();

    if (this.paginator) {
      this.subscriptions.add(
        this.paginator.page.subscribe(() => this.onPageChange({ pageIndex: this.paginator!.pageIndex, pageSize: this.pageSize, length: this.totalMascotas }))
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
  // loadPokemons(page: number = 1, filter: string = ''): void {
  //   const subscription = this.pokemonService.getPokemons(page, this.pageSize).subscribe(response => {
  //     this.totalMascotas = response.count;
  //     this.allPokemons = response.results; 
  //     this.applyClientFilter(); 
  //   });

  //   this.subscriptions.add(subscription); 
  // }
  loadMascotas(page: number = 1, filter: string = ''): void {
    const subscription = this.adopcionesService.getAdopciones(page, this.pageSize).subscribe(response => {
      this.totalMascotas = response.totalCount;
      this.adopciones = response.items;
      this.adocionesInfo = []; // limpiar
      const observables = this.adopciones.map(adopcion => {
        return forkJoin({
          mascota: this.mascotasService.getMascotaById(adopcion.idmascota),
          tramite: this.tramitesService.getTramiteById(adopcion.idtramite)
        });
      });
  
      forkJoin(observables).subscribe(resultados => {
        this.adocionesInfo = resultados;
        this.dataSource.data = this.adocionesInfo;
        console.log(this.adocionesInfo);
      });
  
    });
  
    this.subscriptions.add(subscription);
  }
  resetear(){
    this.pageIndex = 0;
    if (this.paginator) {
      this.paginator.firstPage(); // Reset visualmente el paginador
    }
}
  OpenInfromation(idmascota: string, idtramite: string) {
      const dialogRef = this.dialog.open(AdopcionesInformationComponent, {
        data: { idmascota: idmascota, idtramite: idtramite } // Pasamos el ID
  
      });
      dialogRef.afterClosed().subscribe(() => {
        this.loadMascotas();
        this.resetear();
      });
    }
  

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.loadMascotas(this.pageIndex + 1, this.filterValue);  
  }

  // applyFilter(event: Event): void {
  //   this.filterValue = (event.target as HTMLInputElement).value;
  //   this.applyClientFilter();
  // }

  // applyClientFilter(): void {
  //   const filterValue = this.filterValue.trim().toLowerCase();
  //   const filteredPokemons = this.adopciones 
  //     ? this.adopciones.filter(pokemon =>
  //         pokemon.nombre.toLowerCase().includes(filterValue)
  //       )
  //     : [];

  //   this.dataSource.data = filteredPokemons;
  //   if (this.paginator) {
  //     this.paginator.pageIndex = this.pageIndex; 
  //   }
  // }
  OpenAdopciones() {
    const dialogRef = this.dialog.open(AdopcionesFormComponent, {
      data: { id:'' } // Pasamos el ID

    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadMascotas();
    });
  }
  OpenAdopcionesEdit(id: number) {
    const dialogRef = this.dialog.open(AdopcionesFormComponent, {
      data: { id: id } // Pasamos el ID
    });
  
    dialogRef.afterClosed().subscribe(() => {
      console.log("Modal cerrado");
      this.loadMascotas();
    });
  }
  delete(id: string){
    this.subscriptions.add(
      this.adopcionesService.deleteAdopcion(id).subscribe({
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
